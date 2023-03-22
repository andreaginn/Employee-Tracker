USE employee_tracker_db;

INSERT INTO department (name)
VALUES
("Administration"),
("Legal"),
("Food Services"),
("Arts"),
("Athletics"),
("Foreign Languages"),


INSERT INTO role (title, salary, department_id)
VALUES
("Lawyer", 150000, 2),
("Student Counselor", 80000, 1),
("Filmmaking Professor", 80000, 4),
("Nurse", 90000, 1),
("Football Coach", 60000, 5),
("Cook", 50000, 3),
("Cafeteria Operations", 70000, 3),
("Spanish Professor", 80000, 6),
("Dean", 150000, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Jeff", "Winger", 1, NULL),
("Britta", "Perry", 2, 9),
("Abed", "Nadir", 3, 9),
("Annie", "Edison", 4, 9),
("Troy", "Barnes", 5, 9),
("Shirley", "Bennett", 6, 7),
("Pierce", "Hawthorne", 7, NULL),
("Ben", "Chang", 8, 9),
("Craig", "Pelton", 9, NULL);