import mysql.connector

def get_db_connection():
    conn = mysql.connector.connect(
        host = 'localhost', 
        username = 'root', 
        password = 'hello@123', 
        database = 'personal_expense'
    )
    return conn



