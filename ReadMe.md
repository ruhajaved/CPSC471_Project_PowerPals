# Welcome to PowerPals!

Hi, welcome to PowerPals! This is a project for CPSC 471 during the Winter 2023 semester. This project was made by Mustafa Muhammad, Ruha Javed, and Julie Kim. We are group 40.

# How to run

PowerPals has three main parts to it. A React.js frontend, a Node.js/Express RESTful API backend and a MySQL database server.

### Requirements

- Ensure you have Node.js installed with version 16 or higher.
- Ensure you have npm (node package manager) installed with version 8 or higher.
- Download MySQL version 8 or higher.

### MySQL Database Server

Ensure you have a local MySQL database server running on your computer. Run the SQL file "Power_Pals_DB_Script.sql" to create the database PowerPals which has all base structure for the DB. Then run the "Populate_DB.sql" script to populate the database.

### React.js Frontend

To run the React.js frontend, change directories into the my-app folder and use the command line to run the command "npm start".
Note: Make sure you have the correct dependencies installed, use "npm install" to install dependencies required for this project.

### Node.js/Express.js Backend

To run the Node.js/Express.js, change directories into the Backend folder, make sure your local MySQL server is running. Then go to the file "DB.js" and fill in lines 5/6 which correspond to your local MySQL username and password so that you're able to connect to your database server. Then use the command line to run the command "npm start".
Note: Make sure you have the correct dependencies installed, use "npm install" to install dependencies required for this project.

### Postman

We have also attached two postman.json files which correspond to our two major routes for our RESTful express API. "CPSC 471 Admin.postman*collection.json" contains api commands for all admin routes, while "471_Power_Pals*-\_User_Postman.postman_collection.json" contains all api commands for all user routes.

Inside the Admin postman routes, we pass an API key from the CPSC 471 folder to all subfolders and files, this API key looks like "admin: 1". You can remove this api key to ensure only admins are able to call these routes.

This is the same for the Customer postman routes.

You can contact us at mustafa.muhammad1@ucalgary.ca for any questions.
