import rateLimit from 'express-rate-limit';

// Define the rate limiter
export const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again after 10 seconds',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});
