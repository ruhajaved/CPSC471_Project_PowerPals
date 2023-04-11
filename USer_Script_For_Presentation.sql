/*  START WITH LOGIN PAGE
		- We have Login Page for Admin and Users separately as they both access different functions / features
        - We have also have a Sign Up for Users available 
        - we chose to have NO Sign Up for Admin because of security purposes, as we only want the OWNERS of the company to add admins. 
        - we would add ADMINS into the database through the database / SQL directly*/

/*  If we try to login with BLANKS - nothing happens for CUSTOMER and ADMIN
	If we try to login with incorrect values - nothing happens for CUSTOMER and ADMIN*/
SELECT * FROM company_admin;
/*  Only with the correct Admin EMAIL and PASSWORD - then you may access the admin page - we will show more of the admin later
LOG OUT back to the home page */ 
/*  Since our project mainly focused on the admin's features, the user page is quite bare-minimum but we're excited to show you its features
First,	we will SIGN UP AS A NEW USER 
    FILL IN INFORMATION 
		First Name: Amir Mirzai
        Last Name: G
        Email: Amir@ucalgary.ca
        Password: Amir
	First, we made it so that you MUST have information filled out before you sign up - you cannot sign up without an email and password
    While we did not consider all cases, we also added a nice feature to email where if we try... 
		Try "471"
        Try "471@"
        Try 471@.
        Try 471@gmail.com
        
Second, this is the USER homepage 
		Just to confirm, the user's information is on the SQL power pals database 
*/
SELECT * FROM company_admin WHERE customer.First_Name = "Amir Mirzai";


SELECT * FROM company_admin;

SELECT * FROM customer;

SELECT * FROM fitness_class;