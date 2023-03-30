USE power_pals;

INSERT INTO gym (Gym_ID, Address, Gym_Brand, Gym_Branch)
VALUES 
  (1, '123 Main St', 'Fitness First', 'Downtown'),
  (2, '456 Elm St', 'Golds Gym', NULL),
  (3, '789 Oak St', 'CrossFit', NULL),
  (4, '321 Maple St', 'LA Fitness', 'Midtown');

INSERT INTO studio (Gym_ID, Studio_Room_No, Studio_Name, Studio_Size)
VALUES 
  (1, 'A101', 'Yoga Studio', 20),
  (1, 'B201', 'Cycling Studio', 15),
  (1, 'C301', 'Pilates Studio', 10),
  (2, 'A102', 'Weightlifting Studio', 30),
  (3, 'A103', 'CrossFit Studio', 25),
  (4, 'A104', 'Cardio Studio', 40),
  (4, 'B202', 'Functional Training Studio', 20);