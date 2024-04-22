# Insert sample data
Run the scripts in MySQL in the following order
1. In the terminal, enter the following command: `npm run migrate up`. This will run the migration file, which create the tables for each entity ([Data Definition Language](https://www.ibm.com/docs/en/i/7.5?topic=programming-data-definition-language)).
2. Next, connect to your MySQL server via `mysql -u <username> -p`. Enter the user password (if applicable)
3. Use the commands in the file `data.sql` in the terminal that is connected to the MySQL server. This will insert the sample data in each entity's table ([Data Manipulation Language](https://www.ibm.com/docs/en/i/7.5?topic=programming-data-manipulation-language)).

Alternative to step 3 includes using a database manager.
* Install the extension [MySQL by cwejian](https://database-client.com/) in VSCode
* `Create a connection` by entering your MySQL username and password
* Select the database, navigate to the `Tables` and insert the data from there


## Summary of commands for DDL and DML

![Picture listing the commands for DDL and DML](https://www.boardinfinity.com/blog/content/images/2023/03/DDL-AND-DML-COMMANDS.png)