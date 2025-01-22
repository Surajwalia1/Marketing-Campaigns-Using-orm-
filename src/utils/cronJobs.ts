import cron from 'node-cron';
import { sendEmail } from '../services/emailService';
import {Campaign} from '../models/campaign';

// Function to schedule a campaign
export const scheduleCampaign = (campaign: any) => {
  // Parse the scheduledAt field into a cron time expression (for simplicity, assume it's in a specific format)
  const cronTime = `${campaign.scheduledAt.getMinutes()} ${campaign.scheduledAt.getHours()} ${campaign.scheduledAt.getDate()} ${campaign.scheduledAt.getMonth() + 1} *`;

  cron.schedule(cronTime, async () => {
    console.log(`Sending scheduled campaign: ${campaign.name}`);
    await sendEmail;  // Send the email when the cron time is reached
  });
};
