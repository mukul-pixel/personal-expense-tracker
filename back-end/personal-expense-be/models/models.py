from connection.db import get_db_connection

def createTables():
    conn = get_db_connection()
    cursor = conn.cursor()

    tables = {
        # user details
    "users":"""
         CREATE TABLE IF NOT EXISTS users(
             id INT AUTO_INCREMENT PRIMARY KEY,
             user_name VARCHAR(255) NOT NULL,
             email VARCHAR(255) NOT NULL,
             password VARCHAR(255) NOT NULL,
             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         )
        """,
        # type of expense is doing
    "expense_category":"""
        CREATE TABLE IF NOT EXISTS expense_category(
            id INT AUTO_INCREMENT PRIMARY KEY,
            category_name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        # amount and expense made by the user
    "expenses":"""
        CREATE TABLE IF NOT EXISTS expenses(
            id INT AUTO_INCREMENT PRIMARY KEY,
            category_id INT NOT NULL,
            amount DOUBLE NOT NULL,
            date DATE NOT NULL,
            user_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES expense_category(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        """,
    "income":"""
        CREATE TABLE IF NOT EXISTS income (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            amount INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        """
    }

    for table_name,query in tables.items():
        cursor.execute(query)
        print(f"Table '{table_name}' created successfuly")

    conn.commit()
    conn.close()

    print("table created successfully")