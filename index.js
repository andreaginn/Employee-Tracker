
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "",
    port: 3306,
    database: "employee_tracker_db"

});

db.connect(function (err) { if (err) throw err })

mainMenu()


function mainMenu() {
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            name: "doNext",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]
        }
    )
        .then(res => {
            if (res.doNext === "View all departments") {
                db.query("Select * from department", (err, res) => {
                    console.table(res)
                    mainMenu()
                })
            } else if (res.doNext === "View all roles") {
                db.query("Select * from role", (err, res) => {
                    console.table(res)
                    mainMenu()
                })
            } else if (res.doNext === "View all employees") {
                db.query("Select * from employee", (err, res) => {
                    console.table(res)
                    mainMenu()
                })
            } else if (res.doNext === "Add a department") {
                inquirer.prompt(
                    {
                        type: "input",
                        message: "Enter the new department name:",
                        name: "deptName",
                    }
                )
                    .then(res => {
                        db.query(`Insert into department(name)VALUES("${res.deptName}")`, (err, res) => {
                            console.table(res)
                            mainMenu()
                        })
                    })

            } else if (res.doNext === "Add a role") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Enter the new role title:",
                        name: "roleTitle",
                    },
                    {
                        type: "input",
                        message: "Enter the new role's salary':",
                        name: "salaryAmt",
                    },
                    {
                        type: "input",
                        message: "Enter the department id for the new role",
                        name: "deptId",
                    },
                ]
                )
                    .then(res => {
                        db.query(`Insert into role(title, salary, department_id)VALUES("${res.roleTitle}", ${res.salaryAmt}, ${res.deptId})`, (err, res) => {
                            console.table(res)
                            mainMenu()
                        })
                    })

            } else if (res.doNext === "Add an employee") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the employee's first name?",
                        name: "firstName",
                    },
                    {
                        type: "input",
                        message: "What is the employee's last name?",
                        name: "lastName",
                    },
                    {
                        type: "input",
                        message: "What is the new employee's role id?",
                        name: "roleId",
                    }, 
                    {
                        type: "input",
                        message: "What is the new employee's manager id?",
                        name: "managerId",
                        default: null
                    },
                ]
                )
                    .then(res => {
                        db.query(`Insert into employee(first_name, last_name, role_id, manager_id)VALUES("${res.firstName}", "${res.lastName}", ${res.roleId}, ${res.managerId})`, (err, res) => {
                            console.table(res)
                            mainMenu()
                        })
                    })

            } else if (res.doNext === "Update an employee role") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Enter the id of the employee you'd like to update:",
                        name: "employeeId",
                    },
                    {
                        type: "input",
                        message: "What is the id of the employee's new role?",
                        name: "roleId",
                    },

                ]
                )
                    .then(res => {
                        db.query(`Update employee set role_id=${res.roleId} where employee.id=${res.employeeId}`, (err, res) => {
                            console.table(res)
                            mainMenu()
                        })
                    })

            } else {
                process.exit()
            }

        })
} 