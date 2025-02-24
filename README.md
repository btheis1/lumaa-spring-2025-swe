# Full-Stack Coding Challenge

**Brook Theis - bthei10@wgu.edu**

---

## Overview

A simple Task Management application built with React - Typescript, Node.js, Express, and PostgreSQL.

---

## Video Demo

https://github.com/user-attachments/assets/c234be11-9a49-4f24-ba04-7dc7add0e9cf

## Steps to Run

### 1. Database Set Up

- In the server/.env file:
  - Delete the current values for DBUSERNAME and PASSWORD (where it says, "Your username/password here).
  - Enter your PostgreSQL Username and Password in those fields.
 
- Open a terminal window and run the following command to connect to PostgreSQL:
  - psql -U yourUsername
  - Type in your PostgreSQL password when prompted.
- Open the server/data.sql file.  
  - Run each of the SQL statements in that file one-by-one in your terminal window connected to PostgreSQL.
  - Ex: Run line 1, then line 3, then lines 5-9, and then lines 11-16.

### 2. Start the back end

- Open up a terminal at the root of the server folder.
  - Run "npm i" to install node modules.
  - Run "npm run start" to run the server.
  - If you'd like to test the back end endpoints without the front end, they can be found at http://localhost:8000. The /task endpoints won't work without an autorization token.
  - You can reference the server port information in the client/.env file.
  - You can see database port information in the server/.env file.

### 3. Start the front end

- Open up a second terminal window at the root of the client folder.
  - Run "npm i" to install node modules.
  - Run "npm run dev" to run the front end.
  - The front end app will run at http://localhost:5173


## Salary Expectations Per Month
I'd like $30/hour, so if I were working 20/hours per week at this part-time internship, I'd expect roughly $2,600/month.

---

Thank you!
