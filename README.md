# Expense Tracker Application

A simple React-based application that allows users to manage their expenses. The application includes user authentication, custom validation, and data storage using local storage.

## Features

- **User Authentication**: Users can register and log in to access their personal expense data.
- **Protected Routes**: Only logged-in users can access specific pages, with redirection to the login page for unauthorized access.
- **Expense Management**: Users can add, view, edit, and delete expenses.
- **Custom Validation**: Input fields have validation checks with error messages displayed for each field.
- **Local Storage**: User data and expenses are stored in local storage, ensuring persistence across sessions.

## Pages

1. **Login Page (`/login`)**
   - Input fields for Email and Password.
   - Submission button for login and navigation to the registration page.

2. **Registration Page (`/register`)**
   - Input fields for Username, Password, Email, and Fullname.
   - Submission button for registration and navigation to the login page.

3. **Home Page (`/`)**
   - Two buttons: "Add Expense" and "Expense List."

4. **Add Expense Page (`/add-expense`)**
   - Form for entering Expense Name, Amount, Date, and Description.

5. **Expense List Page (`/expense-list`)**
   - Displays a list of all expenses with Edit and Delete buttons for each expense.
   - Confirmation popup for deletion of expenses.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Navigate to the project directory:
   ```bash
   cd <project-directory>


3. Install the required dependencies:

   ```bash
    npm install

###   Technologies Used
React: JavaScript library for building user interfaces.
React Router: For routing and navigation between components.
Local Storage: For storing user data and expenses.
JavaScript: For front-end logic and functionality.

###   Running the Application
  ```bash
    npm start

