# Marketing Campaign Automation Backend

This project automates marketing campaigns with features such as scheduling, retry mechanisms, and targeted campaigns based on user categories. The backend is developed using **TypeScript**, **Express**, **PostgreSQL** (with **TypeORM** and migrations), and **NodeMailer** for handling emails.

## Features

- **Email Campaign Scheduling**: Admins can schedule email campaigns based on user categories.
- **Retry Mechanism**: Automatic retry mechanism for failed email deliveries.
- **Targeted Campaigns**: Campaigns can be broadcast to all users or targeted to specific categories.
- **Admin Profile Management**: Admins can create and manage user profiles with email and category information.
  
## Technologies Used

- **TypeScript** - A superset of JavaScript providing type safety.
- **Express** - A minimal and flexible Node.js web application framework.
- **PostgreSQL** - Relational database system used for persistent data storage.
- **TypeORM** - ORM (Object-Relational Mapper) for Node.js and TypeScript to interact with the PostgreSQL database.
- **NodeMailer** - Node.js library used for sending emails.
- **dotenv** - Loads environment variables from a `.env` file.
  
## Installation

### Prerequisites

- Node.js (>=14.x)
- PostgreSQL (installed and running)
  
### Steps to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/Surajwalia1/Marketing-Campaigns-Using-orm.git
   cd Marketing-Campaigns-Using-orm
