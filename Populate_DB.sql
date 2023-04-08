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
    (15, 'Spin & Sweat', 45, '2023-04-06', 'A high-intensity cycling workout to burn calories and boost cardio.', 15, '11:00:00', 1, 1, 'B201', 'Spin', 2),
    (20, 'Boxing Bootcamp', 90, '2023-04-07', 'A total-body workout that combines boxing, strength training, and cardio.', 25, '17:00:00', 2, 3, 'A103', 'Boxing', 3),
    (12, 'Pilates Sculpt', 75, '2023-04-08', 'A low-impact, full-body workout that focuses on core strength and flexibility.', 10, '09:00:00', 3, 2, 'A102', 'Pilates', 4),
    (8, 'Zumba Party', 60, '2023-04-09', 'A fun and energetic dance workout that combines Latin and international music.', 30, '18:00:00', 2, 4, 'A104', 'Zumba', 2),
    (10, 'Yoga Flow', 60, '2023-04-10', 'A dynamic, flowing yoga class that links breath with movement.', 20, '10:00:00', 1, 1, 'A101', 'Yoga', 1);