import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source'; // Import your DataSource instance
import { User } from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { limiter } from '../middleware/rateLimiter';

const router = express.Router();

router.post('/signup', limiter, async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role, category } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      email,
      password: hashedPassword,
      role,
      category,
    });

    await userRepository.save(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
});

router.post('/login', limiter, async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
