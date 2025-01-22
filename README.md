# Marketing Campaign Automation Backend

This project automates marketing campaigns with features such as scheduling, retry mechanisms, and targeted campaigns based on user categories. The backend is developed using **TypeScript**, **Express**, **PostgreSQL** (with **TypeORM** and migrations), and **NodeMailer** for handling emails.

## Features

- **User Authentication**: Users can sign up and log in securely using JWT-based authentication.
- **Campaign Management**: Admins can create, update, and delete campaigns, including scheduling the campaigns for execution.
- **Email Notifications**: The system sends emails to users based on their categories, notifying them of campaigns.
- **Scheduler**: A scheduler is used to run campaigns automatically based on a set time.
- **Admin Access**: Only users with the "admin" role have access to sensitive routes like creating and managing campaigns.

  
## Technologies Used

- **TypeScript** - A superset of JavaScript providing type safety.
- **Express** - A minimal and flexible Node.js web application framework.
- **PostgreSQL** - Relational database system used for persistent data storage.
- **TypeORM** - ORM (Object-Relational Mapper) for Node.js and TypeScript to interact with the PostgreSQL database.
- **NodeMailer** - Node.js library used for sending emails.
- **dotenv** - Loads environment variables from a `.env` file.
  
## Installation

### Prerequisites

- PostgreSQL (installed and running)
  
### Steps to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/Surajwalia1/Marketing-Campaigns-Using-orm.git
   cd Marketing-Campaigns-Using-orm
