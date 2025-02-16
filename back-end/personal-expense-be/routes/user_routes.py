# need to write these apis for better get and post data.

from flask import Blueprint, request, jsonify
from connection.db import get_db_connection

user_bp = Blueprint('users',__name__)


def fetchUser(email:str):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    query = 'SELECT * from users where email = %s'
    cursor.execute(query,(email,))
    user = cursor.fetchone()
    return user

def add_user(data: dict):
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor()
    query = 'INSERT INTO users(user_name,email,password) VALUES (%s,%s,%s)'

    try:
        cursor.execute(query,(name,email,password))
        conn.commit()
        return "user added"
    except Exception as e:
        return f"error: {str(e)}"
    finally:
        conn.close()


@user_bp.route('/registerUser', methods = ['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')

    user_info = fetchUser(email)

    if user_info:
        return {"message":"user already exists"},400
    
    result = add_user(data)
    if result == "user added":
        return {"message":"user added"},200
    else:
        # print(result)
        return {"message":"error adding user"},500    


@user_bp.route('/loginUser', methods = ['POST'])
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user_info = fetchUser(email)

    if not user_info:
        return {"message":"email or password is incorrect"},404
    
    if password == user_info["password"]:
        return {"message":"login successfull"},200
    else:
        return {"message":"email or password is incorrect"},401


