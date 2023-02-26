INSERT INTO departments (department_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Human Resources"),
       ("Legal"),
       ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1),
       ("Engineering Team Lead", 180000, 1),
       ("Accountant", 100000, 2),
       ("Chief Finance Officer", 250000, 2),
       ("Payroll Specialist", 80000, 3),
       ("Onboarding Specialist", 80000, 3),
       ("Director of Human Resources", 130000, 3),
       ("Lawyer", 180000, 4),
       ("General Counsel", 250000, 4),
       ("Sales Associate", 80000, 5),
       ("Sales Manager", 130000, 5);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Tony", "Stark", 2),
       ("Scrooge", "McDuck", 4),
       ("Carla", "Coe", 7),
       ("Grace", "Goe", 9),
       ("Herbert", "Hoe", 11);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Loeffler", 1, 1),
       ("John", "Doe", 3, 2),
       ("Donna", "Doe", 5, 3),
       ("Frank", "Foe", 6, 3),
       ("Marta", "Moe", 8, 4),
       ("Norma", "Noe", 10, 5);