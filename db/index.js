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

  // TODO- Done-Create a query to Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    const employeeQueary =
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS Department, CONCAT(manager.first_name, ' ',manager.last_name ) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN employee manager on manager.id = employee.manager_id LEFT JOIN department on role.department_id = department.id";
    return this.query(employeeQueary);
  }
  // TODO- Create a query to Create a new employee
  addEmployee(employee) {
    console.log(employee);
    return this.query(`INSERT INTO employee (first_name, Last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);
  }
  // TODO- Create a query to Update the given employee's role
  // updateEmployeeRole(update, role) {
  //   return this.query(
  //     "UPDATE role SET title = 1 WHERE ID =2"[update, role]
  //   )
  // }

  // TODO- Done-Create a query to Find all roles, join with departments to display the department name
  findAllRoles() {
    const employeeQueary =
      'SELECT role.id, role.title, role.salary, department.name AS Department FROM role LEFT JOIN department on role.department_id = department.id';
    return this.query(employeeQueary);
  }
  // TODO-Create a query to Create a new role
  addRole(role) {
    console.log(role)
    return this.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [role.title, role.salary, role.department_id]);
  }

  // TODO- Done-Create a query to Find all departments
  findAllDepartments() {
    const departmentQueary = 'SELECT id, name FROM department';
    return this.query(departmentQueary);
  }
  // TODO-Done-Create a query to Create a new department
  createDepartment(department) {
    return this.query(`INSERT INTO department (name) VALUES ('${department}')`);
  }
}

module.exports = new DB();
