import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        return conn

def run_sql(conn, sql_string):
    c = conn.cursor()
    c.execute(sql_string)
    rows = c.fetchall()
    return rows
    
def insert_data(conn, sql_string, params):
    c = conn.cursor()
    c.execute(sql_string, params)
    return c.lastrowid
    
def print_users(connection, get_users_string):
    result = run_sql(connection, get_users_string)
    for i in result:
        print(i)

def global_prompt():
    print("Choose function")
    print("0. Exit")
    print("1. Print Users")
    print("2. New User")
    print("3. Delete User")
    print("4. Delete All")
    print("5. Add Test Users")
    value = input()
    try:
        value = int(value)
    except:
        print("\nInvalid Input: Type the number of your choice and press enter\n")
        return global_prompt()
    if(-1 < value & value < 6):
        return value
    else:
        print("\nInput out of range\n")
        return global_prompt()

def new_user_prompt():
    #NEED TO ADD CHECKS TO THESE
    print("Enter username")
    name = input()
    print("Enter password")
    password = input()
    print("Enter user level")
    user_level = input()
def delete_user_prompt():
    print("Enter username to delete")
    name = input()
def main():
    #Test Varaibles
    test_user = ("hroeder1", "pass123", 2)
    test_users = [("hroeder2", "pass123", 2), ("hroeder3", "pass123", 1), ("hroeder4", "pass123", 0)]

    #SQL STRINGS
    create_users_table_string = "CREATE TABLE IF NOT EXISTS users(id integer PRIMARY KEY, username text NOT NULL, password text NOT NULL, level int NOT NULL);"
    insert_user_string = "INSERT INTO users(username, password, level) VALUES(?,?,?);"
    get_users_string = "SELECT * from users"

    #SETUP DATABASE CONNECTION
    connection = create_connection(r"users_db")
    
    
    
    if(connection is None):
        print("Could not connect to database")
    else:
        #Create table and insert a user
        run_sql(connection, create_users_table_string)

        choice = -1
        while(choice != 0):
            print("")
            choice = global_prompt()
            if(choice == 0):
                print("Exiting")
            if(choice == 1):
                print_users(connection, get_users_string)
            if(choice == 2):
                new_user_prompt()
            if(choice == 3):
                delete_user_prompt()
            if(choice == 4):
                run_sql(connection, "DELETE FROM users")       
                print_users(connection, get_users_string) 
            if(choice == 5):
                for user in test_users:
                    result = insert_data(connection, insert_user_string, user)
                    print(result)
        
        


    


main()