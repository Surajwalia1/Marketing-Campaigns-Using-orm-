import cron from 'node-cron';
import { AppDataSource } from '../data-source'; // Import the AppDataSource to ensure it is initialized
import { Campaign } from '../models/campaign';  // TypeORM Campaign entity
import { sendEmail } from '../services/emailService'; // Your email sending service
import { User } from '../models/User';  // TypeORM User entity
import { LessThanOrEqual } from 'typeorm';

/**
 * Schedules campaigns to be executed based on their scheduled time.
 * This function runs every minute and checks for campaigns that are due to be executed.
 * For each campaign, it sends emails to users in the target category and updates the campaign status to 'executed'.
 * @function scheduleCampaigns
 * @returns {void} This function runs on a scheduled interval (every minute) and processes due campaigns.
 */

// Schedule function
const scheduleCampaigns = () => {
  cron.schedule('* * * * *', async () => { // Runs every minute
    try {
      const now = new Date();

      // Ensure data source is initialized
      if (!AppDataSource.isInitialized) {
        console.error('TypeORM data source is not initialized!');
        return;
      }

      const campaignRepository = AppDataSource.getRepository(Campaign);
      const userRepository = AppDataSource.getRepository(User);

      // Fetch campaigns that are due to be executed
      const dueCampaigns = await campaignRepository.find({
        where: {
          scheduledTime: LessThanOrEqual(now), // Correct usage of the operator
          status: 'pending',
        },
      });

    //   if (dueCampaigns.length === 0) {
    //     console.log('No campaigns to execute at this time.');
    //   }

      for (const campaign of dueCampaigns) {
        // Ensure campaign.category is not undefined or null
        if (!campaign.category) {
          console.warn(`Campaign ${campaign.id} does not have a category, skipping.`);
          continue; // Skip this campaign if no category
        }

        // Find users in the campaign's category
        const users = await userRepository.find({
          where: { category: campaign.category },
        });

        if (users.length) {
          for (const user of users) {
            // Send email to each user
            try {
              await sendEmail(user.email, 'Campaign Execution', campaign.message || '');
              console.log(`Email sent to ${user.email} for campaign ${campaign.id}`);
            } catch (emailError) {
              console.error(`Error sending email to ${user.email}:`, emailError);
            }
          }
        }

        // Mark campaign as executed
        campaign.status = 'executed';
        await campaignRepository.save(campaign);
        console.log(`Campaign ${campaign.id} marked as executed.`);
      }
    } catch (error) {
      console.error('Error executing scheduled campaigns:', error);
    }
  });
};

export default scheduleCampaigns;
