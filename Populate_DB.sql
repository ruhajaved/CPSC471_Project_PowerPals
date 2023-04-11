USE power_pals;

INSERT INTO company_admin (First_Name, Last_Name, Address, Email, Password, Salary) VALUES
    ('John', 'Doe', '123 Main St', 'johndoe@admin.com', 'password1', 50000),
    ('Jane', 'Doe', '456 Maple Ave', 'janedoe@admin.com', 'password2', 60000),
    ('Bob', 'Smith', '789 Oak Dr', 'bobsmith@admin.com', 'password3', 55000),
    ('Alice', 'Jones', '246 Elm St', 'alicejones@admin.com', 'password4', 65000);

INSERT INTO gym (Address, Gym_Name)
VALUES 
	('123 Main Street', 'Fitness First'),
	('456 Elm Street', 'Gym Rats'),
	('789 Oak Street', 'Muscle Mansion'),
	('1010 Maple Street', 'Iron Paradise'),
	('1111 Pine Street', 'Fit Nation');

INSERT INTO studio (Gym_ID, Studio_Room_No, Studio_Name, Studio_Size)
VALUES 
	  (1, 'A101', 'Yoga Studio', 20),
	  (1, 'B201', 'Cycling Studio', 15),
	  (1, 'C301', 'Pilates Studio', 10),
	  (2, 'A102', 'Weightlifting Studio', 30),
	  (3, 'A103', 'CrossFit Studio', 25),
	  (4, 'A104', 'Cardio Studio', 40),
	  (4, 'B202', 'Functional Training Studio', 20);
  
INSERT INTO class_type (Class_Category, Intensity_Level, Equipment_Required) VALUES 
    ('Yoga', 5, 'Yoga mat'),
    ('Spin', 8, 'Stationary bike'),
    ('Boxing', 9, 'Boxing gloves and punching bag'),
    ('Pilates', 6, 'Exercise mat'),
    ('Zumba', 7, 'None');
    
INSERT INTO instructor (First_Name, Last_Name, Address, Email, Gender, Languages, Status_Active) VALUES
    ('John', 'Doe', '123 Main St', 'johndoe@gmail.com', 'Male', 'English, Spanish', true),
    ('Jane', 'Doe', '456 Maple Ave', 'janedoe@gmail.com', 'Female', 'English, French', true),
    ('Bob', 'Smith', '789 Oak Dr', 'bobsmith@gmail.com', 'Male', 'English, German', true),
    ('Alice', 'Jones', '246 Elm St', 'alicejones@gmail.com', 'Female', 'English, Italian', false);

INSERT INTO instructor_can_teach_class_type (Instructor_ID, Class_Category) VALUES 
    (1, 'Yoga'),
    (1, 'Pilates'),
    (2, 'Zumba'),
    (2, 'Spin'),
    (3, 'Boxing'),
    (3, 'Yoga'),
    (4, 'Pilates');
    
INSERT INTO fitness_class (
    Class_Cost,
    Class_Name, 
    Class_Duration, 
    Class_Date, 
    Class_Description,
    No_of_Max_Ppl,
    Class_Time,  
	Admin_ID,
    Gym_ID,
    Studio_Room_No,
    Class_Category,
    Instructor_ID
) 
VALUES 
    (10, 'Yoga for Beginners', 60, '2023-04-05', 'Learn basic yoga poses and breathing techniques.', 20, '14:00:00', 1, 1, 'A101', 'Yoga', 1),
    (20, 'Yoga for Advanced', 60, '2023-01-01', 'Learn basic yoga poses and breathing techniques.', 20, '14:00:00', 1, 1, 'A101', 'Yoga', 1),
    (15, 'Spin & Sweat', 45, '2023-04-19', 'A high-intensity cycling workout to burn calories and boost cardio.', 15, '11:00:00', 1, 1, 'B201', 'Spin', 2),
    (20, 'Boxing Bootcamp', 90, '2023-04-14', 'A total-body workout that combines boxing, strength training, and cardio.', 25, '17:00:00', 2, 3, 'A103', 'Boxing', 3),
    (12, 'Pilates Sculpt', 75, '2023-04-13', 'A low-impact, full-body workout that focuses on core strength and flexibility.', 10, '09:00:00', 3, 2, 'A102', 'Pilates', 4),
    (8, 'Zumba Party', 60, '2023-04-20', 'A fun and energetic dance workout that combines Latin and international music.', 30, '18:00:00', 2, 4, 'A104', 'Zumba', 2),
    (40, 'Spin Cats', 60, '2023-04-13', 'A dynamic, spin class with cats as your partners.', 20, '10:00:00', 1, 1, 'A101', 'Spin', 4),
    (60, 'Zum-cat Party', 60, '2023-08-02', 'A fun and energetic dance workout that involves dancing cats', 30, '18:00:00', 2, 4, 'A104', 'Zumba', 2),
    (70, 'Yoga Cats', 60, '2023-07-03', 'A calming class that involves petting and cuddling cats', 20, '10:00:00', 2, 1, 'A101', 'Yoga', 1);

/* TODO: update password field to represent actual format */
INSERT INTO customer (First_Name, Last_Name, Address, Email, Gender, Date_of_Birth, Password)
VALUES
    ('Alexandria','Frami','127 Carter Lakes Apt. 131 Ryanmouth, AK 75547','joanny97@example.net','Female','2019-10-26 16:00:59','2'),
    ('Clemmie','Feest','208 Addie Rue Suite 397 Cartwrightberg, WV 07166','ngusikowski@example.net','Male','2016-03-22 01:30:41','1'),
    ('Owen','Bartell','16900 Alexandra Locks East Edwinashire, DE 94053-0065','oscar11@example.org','Female','2014-03-11 21:05:20','2'),
    ('Jana','Bechtelar','431 Darrin Squares Suite 876 South Oran, CA 74871','cayla.greenholt@example.net','Male','2015-10-06 06:56:48','2'),
    ('Rosa','Von','2822 Kihn Forge Suite 999 Ullrichfurt, SC 70559','colt82@example.org','Female','2020-03-23 10:44:22','5'),
    ('Elsie','Tremblay','3054 Morissette Extensions Gavinborough, OH 73897','wankunding@example.org','Female','2022-12-14 10:14:39','3'),
    ('Vernice','Batz','9010 Lea Spur New Ramonastad, NY 50717','hyatt.niko@example.net','Female','2022-02-08 03:31:41','5'),
    ('Mack','Effertz','4960 Ernser Mall Apt. 151 Port Amara, SD 83607','maritza.fritsch@example.net','Male','2021-01-09 04:34:25','9'),
    ('Eleazar','Swaniawski','03921 Bashirian Fields Reynoldsport, MT 07235','minnie59@example.net','Male','2015-05-23 00:47:48','7'),
    ('Esteban','Gorczany','2945 Douglas Mall Apt. 724 Port Candida, PA 96194','reynolds.ryley@example.net','Female','2018-10-22 05:49:00','7');

INSERT INTO membership (Tier, Customer_ID)
VALUES
    ("Gold", 1),
    ("Silver", 2),
    ("Bronze", 3);

INSERT INTO payment (Trans_DateTime, Amount, Credit_Card_No)
VALUES
    ('2019-10-20', 100, 1234555555),
    ('2019-10-26', 75, 12345678910),
    ('2019-10-01', 50, 12111111111);

INSERT INTO payment_for_membership (Membership_ID, Transaction_ID, Customer_ID)
VALUES
    (1, 1, 1),
    (2, 2, 2),
    (3, 3, 3);

INSERT INTO promo_code (Promo_Code, Start_Date, End_Date, Description, Discount_Amount)
VALUES ('ABCD','1986-05-08','2024-07-27','equatur.', 10),
('EFGH','2011-05-06','2030-09-17','t ci ducimus.', 20),
('IJKL','1992-06-05','1980-09-26',' rem hic.', 30),
('MNOP', '2003-05-15', '2014-11-12', ' fuga saepe ut.', 40),
('QRST','1973-01-12', '2004-03-18', 'itaque qui.', 50);