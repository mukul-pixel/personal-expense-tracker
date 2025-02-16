import matplotlib
matplotlib.use('Agg')

from flask import jsonify,send_file,Blueprint,request
import pandas as pd
import matplotlib.pyplot as plt
import io
# import os
from connection.db import get_db_connection
from routes.add_ledger.ledger_business_logic import get_user_id

# creating a blueprint

income_analysis_bp = Blueprint('income',__name__)

@income_analysis_bp.route('/analyse_income', methods = ['GET'])
def get_income_charts():
    chart_type = request.args.get('type','bar')
    user_email = request.args.get('user_email')
    user_id = get_user_id(user_email)

    query = """
        SELECT amount, cast(created_at as date) as date FROM  income
        WHERE user_id = %s AND created_at >= (current_date - interval '364' day)
    """

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(query,(user_id,))
    result = cursor.fetchall()
    conn.close()

    if not result:
        return jsonify({"message":"no data for income!"}),204
        
    
    # here i'll plot a chart
    result_df = pd.DataFrame(result, columns=['amount','date'])

    plt.figure(figsize=(10, 6))
    if chart_type == 'bar':
        plt.bar(result_df['date'], result_df['amount'], color = 'blue')
        plt.xlabel('Date')
        plt.ylabel("Income (₹)")
        plt.title('Income Analysis (Last 12 Months)')

    elif chart_type == 'line':
        plt.plot(result_df['date'], result_df['amount'], marker = 'o', linestyle = '-', color = 'green')
        plt.xlabel('Date')
        plt.ylabel("Income (₹)")
        plt.title('Income Trend (Last 12 Months)')
        

    # storing the graph to a img
    img = io.BytesIO()
    plt.savefig(img,format = 'png')
    img.seek(0)
    plt.close()

    return send_file(img, mimetype= 'image/png')

        