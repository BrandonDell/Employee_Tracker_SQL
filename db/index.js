const pool = require('./connection');

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

  // TODO- Create a query to Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    const employeeQueary =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS Department, CONCAT(manager.first_name, ' ',manager.last_name ) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN employee manager on manager.id = employee.manager_id LEFT JOIN department on role.department_id = department.id";
       return this.query(employeeQueary);
  }

  // TODO- Create a query to Find all employees except the given employee id

  // TODO- Create a query to Create a new employee

  // BONUS- Create a query to Remove an employee with the given id

  // TODO- Create a query to Update the given employee's role

  // BONUS- Create a query to Update the given employee's manager

  // TODO- Create a query to Find all roles, join with departments to display the department name

  // TODO- Create a query to Create a new role

  // BONUS- Create a query to Remove a role from the db

  // TODO- Create a query to Find all departments
  findAllDepartments() {
    const departmentQueary =
    "SELECT department.name AS Department, LEFT JOIN department on role.department_id = department.id";
       return this.query(departmentQueary);
  }
  // BONUS- Create a query to Find all departments, join with employees and roles and sum up utilized department budget

  // TODO- Create a query to Create a new department
  createDepartment(department) {
    return this.query(`INSERT INTO department (name) VALUES ('${department}')`);
  }

  // BONUS- Create a query to Remove a department

  // BONUS- Create a query to Find all employees in a given department, join with roles to display role titles

  // BONUS- Create a query to Find all employees by manager, join with departments and roles to display titles and department names
}

module.exports = new DB();
