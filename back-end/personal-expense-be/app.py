# our entry point to the project

#don't forget to save the file. 


from flask import Flask
from routes.user_routes import user_bp
from flask_cors import CORS
from models.models import createTables
from routes.add_ledger.add_ledger_routes import  add_ledger_bp
from routes.add_ledger.ledger_business_logic import add_expense_category
from routes.analysis_api_scripts.income_analysis import income_analysis_bp
from routes.analysis_api_scripts.expense_analysis import expense_analysis_bp


app = Flask(__name__)
CORS(app)

# creating/initialising all the tables before app starts
createTables()
add_expense_category()

app.register_blueprint(user_bp,url_prefix = '/users')
app.register_blueprint(add_ledger_bp, url_prefix = '/add_ledger')
app.register_blueprint(income_analysis_bp, url_prefix = '/income')
app.register_blueprint(expense_analysis_bp,url_prefix = '/expense')

@app.route('/')
def hello_world():
    return {"message": "Welcome to the Personal Finance Tracker!"}

if __name__ == "__main__":
    print("starting the server")
    app.run(debug=True)


