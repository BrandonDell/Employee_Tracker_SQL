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
function updateEmployeeRole() {
  db.findAllEmployees().then(({ rows }) => {
    const employees = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    })
    )
    db.findAllRoles().then(({ rows }) => {
      const roles = rows.map(({ id, title }) => ({
        name: `${title}`,
        value: id
      }))
      prompt([
        {
          type: 'list',
          name: 'update',
          message: "Which employee's role do you want to update?",
          choices: employees
        },
        {
          type: 'list',
          name: 'role',
          message: "Which new role would you like to select?",
          choices: roles
        },
      ])
        .then((res) => {
          console.log(res);
          db.updateEmployeeRole(res.update, res.role) 
          .then(() => {
            console.log('Role Added!!!');
            loadMainPrompts();
          })
          console.log(updateEmployeeRole);
      })
    })
  })
}

// TODO- Done/Working-Create a function to View all roles-52
function viewRoles() {
  console.log('hello');
  db.findAllRoles()
    .then((data) => {
      console.table(data.rows);
    })
    .then(() => {
      loadMainPrompts();
    });
}
// TODO- Create a function to Add a role-56
function addRole() {
  db.findAllDepartments().then(({ rows }) => {
    console.log(rows);
    const departmentChoices = rows.map(({ id, name }) => ({
        name: name,
        value: id,
      }));
    db.findAllRoles().then(({ rows }) => {
          const roleChoices = rows.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          prompt([
            {
              type: 'input',
              name: 'title',
              message: 'What is the title of the new role?',
            },
            {
              type: 'input',
              name: 'salary',
              message: 'What is the salary of the new role?',
            },
            {
              type: 'list',
              name: 'department_id',
              message: 'Select the department for the new role:',
              choices: departmentChoices,
            },
          ]).then((roleAnswers) => {
            db.addRole({
              title: roleAnswers.title,
              salary: roleAnswers.salary,
              department_id: roleAnswers.department_id,
            })
              .then(() => {
                console.log('Role Added!!!');
                loadMainPrompts();
              })
              .catch((error) => {
                console.error('Error adding role:', error);
                loadMainPrompts();
              });
          });
        })
        .catch((error) => {
          console.error('Error fetching roles:', error);
          loadMainPrompts();
        });
    })
    .catch((error) => {
      console.error('Error fetching departments:', error);
      loadMainPrompts();
    });
}
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
function addEmployee() {
  db.findAllRoles().then(({ rows }) => {
    const roleChoices = rows.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    console.log(roleChoices);
    db.findAllEmployees().then(({ rows }) => {
      const managerChoices = rows.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));

      prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter employee first name:',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter employee last name:',
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Select employee role:',
          choices: roleChoices,
        },
        {
          type: 'list',
          name: 'manaager_id',
          message: 'Select employee manager:',
          choices: managerChoices,
        },
      ]).then((answers) => {
        db.addEmployee({ 
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager_id
        })
          .then(() => {
            console.log('Employee added successfully!');
            loadMainPrompts();
          })
          .catch((err) => {
            console.error('Error adding employee:', err);
            loadMainPrompts();
          });
      });
    });
  });
}
// Exit the application
function quit() {
  console.log('Goodbye!');
  process.exit();
}
