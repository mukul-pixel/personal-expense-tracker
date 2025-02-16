from connection.db import get_db_connection

def add_expense_category():
    conn = get_db_connection()
    cursor = conn.cursor()

    categories = ["Food","Entertainment","Travel","Entertainment","Utilities","Others"]

    for category in categories:
        check = 'SELECT * FROM expense_category WHERE category_name = %s'
        cursor.execute(check, (category,)) 
        result = cursor.fetchone() 

        if result: 
            continue

        query = 'INSERT INTO expense_category (category_name) VALUES (%s)'
        cursor.execute(query, (category,))

    conn.commit()
    cursor.close()
    conn.close()

def get_category_id(category_name:str):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = 'SELECT * FROM expense_category WHERE category_name = %s'
    cursor.execute(query,(category_name,))
    result = cursor.fetchone()

    if result:
        return result[0]
    
    return -1

def get_user_id(user_mail:str):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = 'SELECT * FROM users WHERE email = %s'
    cursor.execute(query,(user_mail,))
    result = cursor.fetchone()

    if result:
        return result[0]
    
    return -1

def get_current_income(user_id:int):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = 'SELECT amount from income where user_id = %s and created_at in (select max(created_at) from income where user_id = %s)'
    cursor.execute(query,(user_id,user_id,))
    result = cursor.fetchone()

    if result:
        print("income - ",result[0])
        return result[0]
    
    return 0



def get_total_expense(user_id:int):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """SELECT SUM(amount) AS total_expense
            FROM expenses
            WHERE user_id = %s
            AND DATE_FORMAT(date, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
    """

    cursor.execute(query,(user_id,))
    result = cursor.fetchall()
    
    if result:
        print("result - ", result[0])
        return result[0]
    
    print("expense - ",result)
    return 0