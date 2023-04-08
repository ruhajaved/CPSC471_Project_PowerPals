DROP DATABASE IF EXISTS power_pals;
CREATE DATABASE power_pals;
USE power_pals;

/* CREATE ALL TABLES w/out foreign keys*/
CREATE TABLE payment_for_classes (   
	Class_ID int NOT NULL,  		/* PRIMARY KEY 1/3 */
    Transaction_ID int NOT NULL, 	/* PRIMARY KEY 2/3 */
    Customer_ID int NOT NULL, 		/* PRIMARY KEY 3/3 */
    CONSTRAINT pk_payment_for_classes PRIMARY KEY(Class_ID, Transaction_ID, Customer_ID)
);

CREATE TABLE payment_for_membership (   
	Membership_ID int NOT NULL,  		/* PRIMARY KEY 1/3 */
    Transaction_ID int NOT NULL, 	/* PRIMARY KEY 2/3 */
    Customer_ID int NOT NULL, 		/* PRIMARY KEY 3/3 */
    CONSTRAINT pk_payment_for_membership PRIMARY KEY(Membership_ID, Transaction_ID, Customer_ID)
);

CREATE TABLE instructor_can_teach_class_type (  
	Instructor_ID int NOT NULL, 			/* PRIMARY KEY 1/2 */
    Class_Category varchar(256) NOT NULL, 	/* PRIMARY KEY 2/2 */
    CONSTRAINT pk_instructor_can_teach_class_type PRIMARY KEY(Instructor_ID, Class_Category)
);

CREATE TABLE payment (
	Transaction_ID int NOT NULL AUTO_INCREMENT, 		/* PRIMARY KEY */
	Trans_DateTime date NOT NULL, 
	Amount int NOT NULL,
	Credit_Card_No int NOT NULL,	
	Promo_Code varchar(256),  			/* OPTIONAL */ 
    PRIMARY KEY(Transaction_ID)
);

CREATE TABLE membership (
	Membership_ID int NOT NULL AUTO_INCREMENT, 		/* PRIMARY KEY */
    Tier varchar(256) NOT NULL,
    Customer_ID int NOT NULL,
    PRIMARY KEY(Membership_ID)
);

CREATE TABLE customer (
	Customer_ID int NOT NULL AUTO_INCREMENT,			/* PRIMARY KEY */
    First_Name varchar(256) NOT NULL, 
    Last_Name varchar(256) NOT NULL, 
    Address varchar(256) NOT NULL, 
    Email varchar(256) NOT NULL, 
    Gender varchar(256),				/* OPTIONAL */
    Date_of_Birth varchar(256) NOT NULL,
    Password varchar(256) NOT NULL, 
    PRIMARY KEY(Customer_ID),
    UNIQUE(Email)
  );

CREATE TABLE company_admin (
	Admin_ID int NOT NULL AUTO_INCREMENT, 
    First_Name varchar(256) NOT NULL, 
    Last_Name varchar(256) NOT NULL, 
    Address varchar(256) NOT NULL, 
    Email varchar(256) NOT NULL, 
    Password varchar(256) NOT NULL, 
    Salary int NOT NULL,
    PRIMARY KEY(Admin_ID),
    UNIQUE(Email)
  );

CREATE TABLE instructor (
	Instructor_ID int NOT NULL AUTO_INCREMENT, 
    First_Name varchar(256) NOT NULL, 
    Last_Name varchar(256) NOT NULL, 
    Address varchar(256) NOT NULL, 
    Email varchar(256) NOT NULL, 
    Gender varchar(256),      		/* GENDER IS OPTIONAL */
    Languages varchar(256) NOT NULL, 
    /*Gym_ID int NOT NULL,*/
    Status_Active boolean NOT NULL, /* NEW STATUS ACTIVE */
    PRIMARY KEY(Instructor_ID),
    UNIQUE(Email)
  );

CREATE TABLE promo_code (
	Promo_Code  varchar(256) NOT NULL, 		/* PRIMARY KEY */
    Start_Date date NOT NULL, 
    End_Date date NOT NULL, 
    Description varchar(256) NOT NULL, 
    Discount_Amount int NOT NULL,
    PRIMARY KEY(Promo_Code)
); 

CREATE TABLE fitness_class (
	Class_ID int NOT NULL AUTO_INCREMENT, 			/* PRIMARY KEY */
    Class_Cost int NOT NULL,
    Class_Name varchar(256) NOT NULL, 
    Class_Duration int NOT NULL, 
    Class_Date date NOT NULL, 
    Class_Description varchar(256) NOT NULL,
    No_of_Max_Ppl int NOT NULL,
    Class_Time time NOT NULL,  
	Admin_ID int NOT NULL,
    Gym_ID int,
    Studio_Room_No varchar(256),
    Class_Category varchar(256) NOT NULL,
    Instructor_ID int NOT NULL,
    PRIMARY KEY(Class_ID)
);

CREATE TABLE gym (
	Gym_ID int NOT NULL AUTO_INCREMENT,				/* PRIMARY KEY */
    Address varchar(256) NOT NULL,
    Gym_Name varchar(256) NOT NULL, 	/* if this is a small gym / not a franchise, Name of Gym goes here*/
    PRIMARY KEY(Gym_ID)
);

CREATE TABLE studio (
	Gym_ID int NOT NULL, 				    /* 1/2 PRIMARY KEY */
    Studio_Room_No varchar(256) NOT NULL,   /* 2/2 PRIMARY KEY */
    Studio_Name varchar(256) NOT NULL, 
    Studio_Size int NOT NULL,			/* Number of Max People that can fit in the room*/
    CONSTRAINT pk_studio PRIMARY KEY(Gym_ID, Studio_Room_No)
);

CREATE TABLE class_type (
	Class_Category varchar(256) NOT NULL, 	/* PRIMARY KEY */
    Intensity_Level int NOT NULL, 			/* From Scale 1-10 */
    Equipment_Required varchar(256), 	/* OPTIONAL Akin to Description */ 
    PRIMARY KEY(Class_Category)
);

/*=------------------------------------------------------*/
/* ADD FOREIGN KEYS */

ALTER TABLE payment_for_classes
	ADD	FOREIGN KEY (Class_ID) 			REFERENCES fitness_class(Class_ID) ON DELETE CASCADE,
	ADD	FOREIGN KEY (Transaction_ID)	REFERENCES payment(Transaction_ID),
	ADD	FOREIGN KEY (Customer_ID) 		REFERENCES customer(Customer_ID)    
;

ALTER TABLE payment_for_membership
	ADD	FOREIGN KEY (Membership_ID) 	REFERENCES membership(Membership_ID),
	ADD	FOREIGN KEY (Transaction_ID)	REFERENCES payment(Transaction_ID),
	ADD	FOREIGN KEY (Customer_ID) 		REFERENCES customer(Customer_ID)    
;

ALTER TABLE instructor_can_teach_class_type 
	ADD	FOREIGN KEY (Instructor_ID) 	REFERENCES instructor(Instructor_ID),   
	ADD	FOREIGN KEY (Class_Category) 	REFERENCES class_type(Class_Category) ON UPDATE CASCADE
;

ALTER TABLE payment 
	ADD	FOREIGN KEY (Promo_Code) 		REFERENCES promo_code(Promo_Code)   
;

ALTER TABLE membership
    ADD FOREIGN KEY (Customer_ID) REFERENCES customer(Customer_ID)
;

ALTER TABLE fitness_class 
	ADD	FOREIGN KEY (Admin_ID) 			REFERENCES company_admin(Admin_ID),    
	ADD	CONSTRAINT fk_studio FOREIGN KEY (Gym_ID, Studio_Room_No) REFERENCES studio(Gym_ID, Studio_Room_No) ON DELETE CASCADE,
	ADD	FOREIGN KEY (Class_Category)	REFERENCES class_type(Class_Category),
    ADD FOREIGN KEY (Instructor_ID)     REFERENCES instructor(Instructor_ID)
;

ALTER TABLE studio 
	ADD	FOREIGN KEY (Gym_ID)		REFERENCES gym(Gym_ID) ON DELETE CASCADE;