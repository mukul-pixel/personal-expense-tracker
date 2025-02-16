import matplotlib
matplotlib.use('Agg')

from flask import jsonify, send_file, Blueprint, request
import pandas as pd
import matplotlib.pyplot as plt
import io
from connection.db import get_db_connection
from routes.add_ledger.ledger_business_logic import get_user_id

expense_analysis_bp = Blueprint('expense', __name__)

@expense_analysis_bp.route('/analyse_expense', methods=['GET'])
def analyse_expense():
    user_email = request.args.get('user_email')
    user_id = get_user_id(user_email)
    chart_type = request.args.get('type', 'bar')
    chart_category = request.args.get('chart_category')

    # Select appropriate query based on chart_category
    if chart_category == 'category':
        query = """
            SELECT 
                DATE_FORMAT(e.created_at, '%Y-%m-01') AS month,
                ec.category_name, 
                SUM(amount) AS amount 
            FROM expenses e 
            JOIN expense_category ec ON e.category_id = ec.id 
            WHERE e.created_at >= (CURRENT_DATE - INTERVAL 364 DAY)
            AND user_id = %s
            GROUP BY 1,2
            ORDER BY 1
        """
        columns = ['month', 'category_name', 'amount']
    
    elif chart_category == 'monthly':
        query = """
            SELECT
                DATE_FORMAT(e.created_at,'%Y-%m-01') AS month,
                SUM(amount) as amount
            FROM expenses e
            WHERE e.created_at >= (CURRENT_DATE - INTERVAL 364 DAY)
            AND user_id = %s
            GROUP BY 1
        """
        columns = ['month', 'amount']
    
    else:
        return jsonify({"message": "Invalid chart category! Use 'category' or 'monthly'."}), 400

    # Fetch data from the database
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(query, (user_id,))
    result = cursor.fetchall()
    conn.close()

    if not result:
        return jsonify({"message": "No data for expense!"}), 204

    # Convert result into a DataFrame
    result_df = pd.DataFrame(result, columns=columns)

    # Convert 'month' column to datetime format for proper plotting
    result_df['month'] = pd.to_datetime(result_df['month'])

    # Set figure size
    plt.figure(figsize=(10, 6))

    # Handle different chart types
    if chart_category == 'category':
        if chart_type == 'bar':
            plt.bar(result_df['category_name'], result_df['amount'], color='skyblue')
            plt.xlabel('Category')
            plt.ylabel('Amount')
            plt.title('Expense Analysis by Category')
            # plt.xticks(rotation=45)

        elif chart_type == 'pie':
            plt.pie(result_df['amount'], labels=result_df['category_name'], autopct='%1.1f%%', startangle=140, colors=plt.cm.Paired.colors)
            # plt.title('Expense Distribution by Category')

        elif chart_type == 'line':
            pivot_df = result_df.pivot(index='month', columns='category_name', values='amount')
            pivot_df.plot(kind='line', marker='o', linewidth=2)
            plt.xlabel('Month')
            plt.ylabel('Amount')
            plt.title('Monthly Expense Trend by Category')
            plt.legend(title="Categories", bbox_to_anchor=(1.05, 1), loc='upper left')
            # plt.xticks(rotation=45)

        else:
            return jsonify({"message": "Invalid chart type! Use 'bar', 'pie', or 'line'."}), 400

    elif chart_category == 'monthly':
        if chart_type == 'bar':
            plt.bar(result_df['month'].dt.strftime('%Y-%m'), result_df['amount'], color='skyblue')
            plt.xlabel('Month')
            plt.ylabel('Amount')
            plt.title('Monthly Expense Analysis')
            # plt.xticks(rotation=45)

        elif chart_type == 'line':
            plt.plot(result_df['month'], result_df['amount'], marker='o', linestyle='-', linewidth=2, color='b')
            plt.xlabel('Month')
            plt.ylabel('Amount')
            plt.title('Monthly Expense Trend')
            # plt.xticks(rotation=45)
        elif chart_type == 'pie':
            plt.pie(result_df['amount'], labels=result_df['month'].dt.strftime('%Y-%m'), autopct='%1.1f%%', startangle=140, colors=plt.cm.Paired.colors)
            # plt.title('Expense Distribution by Category')

        else:
            return jsonify({"message": "Invalid chart type for monthly! Use 'bar' or 'line'."}), 400

    # Save plot to a BytesIO buffer
    img = io.BytesIO()
    plt.savefig(img, format='png', bbox_inches='tight')
    img.seek(0)
    plt.close()

    return send_file(img, mimetype='image/png')