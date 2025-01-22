import { Request, Response } from 'express';
import { AppDataSource } from '../data-source'; // Import data source
import { User } from '../models/User'; // Import User entity (since profiles are part of the User model)


// Create a new user profile
export const createProfile = async (req: Request, res: Response): Promise<void> => {
  const { email, category } = req.body;

  try {
    // Create a new profile using the TypeORM repository pattern
    const userRepository = AppDataSource.getRepository(User);
    const newProfile = userRepository.create({
      email,
      category,
      role: 'user', // Set the role to 'user' by default
    });

    await userRepository.save(newProfile);

    res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error creating profile', error });
  }
};

// Get a profile by email
export const getProfileByEmail = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;

  try {
    // Fetch the profile using TypeORM repository pattern
    const userRepository = AppDataSource.getRepository(User);
    const profile = await userRepository.findOne({ where: { email } });

    if (!profile) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};
