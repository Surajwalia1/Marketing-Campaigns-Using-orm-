import express, { Request, Response } from 'express';
import { authenticateJWT, authorizeAdmin } from '../middleware/authMiddleware';
import { AppDataSource } from '../data-source'; // Import your DataSource instance
import { Campaign } from '../models/campaign';
import { User } from '../models/User';
import { sendEmail } from '../services/emailService';

const router = express.Router();

router.post('/campaigns', authenticateJWT, authorizeAdmin, async (req: Request, res: Response): Promise<void> => {
  const { message, category, scheduledTime, repeatPattern } = req.body;

  try {
    const campaignRepository = AppDataSource.getRepository(Campaign);

    const newCampaign = campaignRepository.create({
      message,
      category,
      scheduledTime,
      repeatPattern,
    });

    await campaignRepository.save(newCampaign);
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    res.status(400).json({ error: 'Error creating campaign', details: error });
  }
});

router.get('/campaigns', authenticateJWT, authorizeAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const campaignRepository = AppDataSource.getRepository(Campaign);
    const campaigns = await campaignRepository.find();
    res.status(200).json({ campaigns });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching campaigns', details: error });
  }
});

router.put('/campaigns/:id', authenticateJWT, authorizeAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { message, category, scheduledTime, repeatPattern } = req.body;

  try {
    const campaignRepository = AppDataSource.getRepository(Campaign);
    const updatedCampaign = await campaignRepository.findOne({ where: { id: Number(id) } });

    if (!updatedCampaign) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }

    updatedCampaign.message = message;
    updatedCampaign.category = category;
    updatedCampaign.scheduledTime = scheduledTime;
    updatedCampaign.repeatPattern = repeatPattern;

    await campaignRepository.save(updatedCampaign);

    res.status(200).json({ message: 'Campaign updated successfully', campaign: updatedCampaign });
  } catch (error) {
    res.status(400).json({ error: 'Error updating campaign', details: error });
  }
});

router.post('/campaigns/:id/execute', authenticateJWT, authorizeAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const campaignRepository = AppDataSource.getRepository(Campaign);
    const userRepository = AppDataSource.getRepository(User);

    const campaign = await campaignRepository.findOne({ where: { id: Number(id) } });

    if (!campaign) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }

    const users = await userRepository.find();

    if (users.length === 0) {
      res.status(404).json({ error: 'No users found in the database' });
      return;
    }

    for (const user of users) {
      await sendEmail(user.email, 'Broadcast Campaign', campaign.message || '');
    }

    campaign.status = 'executed';
    await campaignRepository.save(campaign);

    res.status(200).json({ message: 'Campaign executed and emails sent successfully', campaign });
  } catch (error) {
    console.error('Error executing campaign:', error);
    res.status(500).json({ error: 'Error executing campaign', details: error });
  }
});

export default router;
