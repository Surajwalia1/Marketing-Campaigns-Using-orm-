import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source'; // Import your TypeORM data source
import campaignRoutes from './routes/campaignRoutes'; // Import campaign routes
import authRoutes from './routes/authRoutes'; // Import authentication routes
import scheduleCampaigns from './scheduler/campaignScheduler'; // Import campaign scheduler
import { authenticateJWT } from './middleware/authMiddleware'; // Import JWT authentication middleware

dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Register authentication and campaign routes
app.use('/api/auth', authRoutes);
app.use(authenticateJWT); // This will apply to all routes below unless specified otherwise
app.use('/api', campaignRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running smoothly' });
});

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong', details: err.message });
});

// Connect to PostgreSQL and start the server
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to PostgreSQL');
    
    // Start the campaign scheduler after the connection is established
    scheduleCampaigns();

    // Start the server
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1); // Exit the process if PostgreSQL connection fails
  });
