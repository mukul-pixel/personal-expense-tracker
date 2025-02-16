from flask import Blueprint,request,jsonify
from connection.db import get_db_connection
from datetime import datetime
from routes.add_ledger.ledger_business_logic import get_category_id,get_current_income,get_total_expense,get_user_id

add_ledger_bp = Blueprint('add_ledger',__name__)


@add_ledger_bp.route('/addExpense', methods = ['POST'])
def add_expense():
    data = request.get_json()
    date = datetime.today().date()
    category_name = data.get('category')
    amount = data.get('amount')
    user_mail = data.get('user_id')

    category_id = get_category_id(category_name)
    user_id = get_user_id(user_mail)
    if user_id == -1:
        return {"message":"user_id not registered"},400

    if category_id:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = 'INSERT INTO  expenses(category_id,amount,date,user_id) VALUES (%s,%s,%s,%s)'
        cursor.execute(query,(category_id,amount,date,user_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message":"expense added successfully"},200
    
    return {"message":"category not found"},404


@add_ledger_bp.route('/addIncome', methods = ['POST'])
def add_income():
    data = request.get_json()
    user_mail = data.get('user_id')
    amount = data.get('incomeAmount')

    user_id = get_user_id(user_mail)
    if user_id == -1:
        return {"message":"user_id not registered"},400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    query = 'INSERT INTO  income(user_id,amount) VALUES (%s,%s)'
    cursor.execute(query,(user_id,amount,))
    conn.commit()
    cursor.close()
    conn.close()

    return {"message":"income added successfully"}

@add_ledger_bp.route('/getLedgerInfo', methods = ['GET'])
def get_ledger_info():
    user_email = request.args.get("email") 

    if not user_email:
        return jsonify({"message": "Not authorized"}), 400
    
    user_id = get_user_id(user_email)

    if not user_id:
        return jsonify({"message": "User not found"}), 404

    current_income = get_current_income(user_id)
    total_expense = get_total_expense(user_id)

    return jsonify({
        "message": "Ledger fetched successfully!",
        "current_income": current_income,
        "total_expense": total_expense
    }), 200