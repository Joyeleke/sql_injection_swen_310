# SQL Injection Demonstration (SWEN 310)

This project demonstrates SQL Injection vulnerabilities and mitigation techniques within a web application, highlighting both insecure and secure methods for handling SQL queries.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Features](#features)
5. [Securing SQL Queries](#securing-sql-queries)
6. [License](#license)

## Introduction

SQL Injection is a vulnerability that allows attackers to manipulate database queries through user input. This project highlights how SQL injections work and showcases methods to prevent them.

## Installation

To install and set up the project:

```bash
git clone https://github.com/Joyeleke/sql_injection_swen_310.git
cd sql_injection_swen_310
npm install
```

Ensure you have Node.js installed.

## Running the Application
To start the application, run:

```bash
npm start
```

Once the server is running, open your browser and go to http://localhost:3001.

## Features
- Vulnerable Application: Demonstrates SQL Injection vulnerabilities.
- Input Validation: Illustrates how user input can be exploited.
- Secure Query Handling: Demonstrates safe query handling practices.

## Securing SQL Queries
To prevent SQL injections, use:

- Prepared Statements: Use parameterized queries to prevent manipulation.
- ORMs: Use an ORM like Sequelize to manage queries securely.

## License
This project is licensed under the MIT License.

## SQLite Dependency

This project uses SQLite as the database. Ensure SQLite is properly installed, and configure your environment if needed. To install the SQLite Node.js package, run:

```bash
npm install sqlite3
```

### SQLite Version

This project has been tested with the following version of SQLite:

```bash
sqlite3@5.1.6
```

## Updated Dependencies

Ensure you also have the following dependencies installed and included in `package.json`:

1. Express - `express@4.18.2`
2. SQLite - `sqlite3@5.1.6`

If not present, install them manually:

```bash
npm install express sqlite3
```

## Node.js Requirements

The project requires Node.js version **16.0.0 or higher**. Check your current Node.js version using:

```bash
node -v
```

Update Node.js if necessary from [Node.js Official Website](https://nodejs.org).

---

## License

This project is licensed under the MIT License.

