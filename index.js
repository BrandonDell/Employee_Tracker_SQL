const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: 'City of Pawnee' }).render();

  console.table(logoText);

  loadMainPrompts();
}
// TODO- Create first question user will see- "What would you like to do?"
// TODO- Create a variable to store the user's choice
// TODO- Create a switch statement to call the appropriate function depending on what the user chose

function loadMainPrompts() {
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'View Employees',
          value: 'VIEW_EMPLOYEES',
        },
        {
          name: 'View All Employees By Department',
          value: 'VIEW_EMPLOYEES_BY_DEPARTMENT',
        },
        {
          name: 'View All Employees By Manager',
          value: 'VIEW_EMPLOYEES_BY_MANAGER',
        },
        {
          name: 'Add Employee',
          value: 'ADD_EMPLOYEE',
        },
        {
          name: 'Remove Employee',
          value: 'REMOVE_EMPLOYEE',
        },
        {
          name: 'Update Employee Role',
          value: 'UPDATE_EMPLOYEE_ROLE',
        },
        {
          name: 'Update Employee Manager',
          value: 'UPDATE_EMPLOYEE_MANAGER',
        },
        {
          name: 'View All Roles',
          value: 'VIEW_ROLES',
        },
        {
          name: 'Add Role',
          value: 'ADD_ROLE',
        },
        {
          name: 'Remove Role',
          value: 'REMOVE_ROLE',
        },
        {
          name: 'View All Departments',
          value: 'VIEW_DEPARTMENTS',
        },
        {
          name: 'Add Department',
          value: 'ADD_DEPARTMENT',
        },
        {
          name: 'Remove Department',
          value: 'REMOVE_DEPARTMENT',
        },
        {
          name: 'View Total Utilized Budget By Department',
          value: 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT',
        },
        {
          name: 'Quit',
          value: 'QUIT',
        },
      ],
    },
  ]).then((res) => {
    console.log(res);
    let choice = res.action;
    switch (choice) {
      case 'VIEW_EMPLOYEES':
        viewEmployees();
        break;
      case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
        viewEmployeesByDepartment();
        break;
      case 'VIEW_EMPLOYEES_BY_MANAGER':
        viewEmployeesByManager();
        break;
      case 'ADD_EMPLOYEE':
        addEmployee();
        break;
      case 'REMOVE_EMPLOYEE':
        removeEmployee();
        break;
      case 'UPDATE_EMPLOYEE_ROLE':
        updateEmployeeRole();
        break;
      case 'UPDATE_EMPLOYEE_MANAGER':
        updateEmployeeManager();
        break;
      case 'VIEW_ROLES':
        viewRoles();
        break;
      case 'ADD_ROLE':
        addRole();
        break;
      case 'REMOVE_ROLE':
        removeRole();
        break;
      case 'VIEW_DEPARTMENTS':
        viewDepartments();
        break;
      case 'ADD_DEPARTMENT':
        addDepartment();
        break;
      case 'REMOVE_DEPARTMENT':
        removeDepartment();
        break;
      case 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT':
        viewUtilizedBudgetByDepartment();
        break;
      case 'QUIT':
        quit();
        break;
    }
  });
}

// TODO- Create a function to View all employees-24
function viewEmployees() {
  console.log('hello');
  db.findAllEmployees()
    .then((data) => {
      console.table(data.rows);
    })
    .then(() => {
      loadMainPrompts();
    });
}

// TODO- Create a function to Update an employee's role-44
function updateEmployeeRole() {}

// TODO- Create a function to View all roles-52
function viewRoles() {

}
// TODO- Create a function to Add a role-56
function addRole() {}

// TODO- Create a function to View all deparments-64
function viewDepartments() {
  console.log('hello');
  db.findAllDepartments()
    .then((data) => {
      console.table(data.rows);
    })
    .then(() => {
      loadMainPrompts();
    });
}
// TODO- Create a function to Add a department-68
function addDepartment() {
  prompt({
    type: 'input',
    name: 'newDepartment',
    message: 'What is the new department name ?',
  }).then((answer) => {
    console.log('This is answer ==== ', answer.newDepartment);
    db.createDepartment(answer.newDepartment)
      .then(() => {
        console.log('Department Added!!!');
      })
      .then(() => {
        loadMainPrompts();
      });
  });
}
// TODO- Create a function to Add an employee-36
function addEmployee() {}

// Exit the application
function quit() {
  console.log('Goodbye!');
  process.exit();
}
