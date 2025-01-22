import { Request, Response } from 'express';
import { AppDataSource } from '../data-source'; // Import your DataSource instance
import { Campaign } from '../models/campaign'; // Using TypeORM's Campaign entity
import { sendEmail } from '../services/emailService'; // For sending emails
import { scheduleCampaign } from '../utils/cronJobs'; // For scheduling campaigns
import moment from 'moment'; // Import moment.js

// Create a new campaign
export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  const { message, category, type, recipients, scheduledAt, repeatPattern } = req.body;

  try {
    // If scheduledAt is provided, parse it to a valid Date object using moment
    const parsedDate = scheduledAt ? moment(scheduledAt, "YYYY-MM-DD h:mma").toDate() : null;

    // Create a new campaign instance using AppDataSource.getRepository
    const campaignRepository = AppDataSource.getRepository(Campaign);
    const newCampaign = campaignRepository.create({
      message,
      category,
      scheduledTime: parsedDate || undefined,
      repeatPattern,
      status: 'pending', // Default value
    });

    // Save the new campaign using TypeORM
    await campaignRepository.save(newCampaign);

    // Send the email campaign to all users if it's a broadcast
    if (type === 'broadcast') {
      sendEmailCampaign(newCampaign);
    }

    // If there is a scheduled time, use the cron job to schedule it
    if (parsedDate) {
      scheduleCampaign(newCampaign); // Utility function to schedule
    }

    // Respond with success
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign', error });
  }
};

// Get a campaign by ID
export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const campaignRepository = AppDataSource.getRepository(Campaign);
    const campaign = await campaignRepository.findOne({ where: { id: Number(id) } });

    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }

    res.status(200).json({ campaign });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign', error });
  }
};

// Send email campaign (This is a placeholder, you should implement it based on your logic)
function sendEmailCampaign(newCampaign: Campaign): void {
  // Implementation of email sending logic here
  console.log('Sending email campaign:', newCampaign);
}
