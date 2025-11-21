import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  BOD: z.string().min(4, 'Provide a valid date of birth'),
  ContactNumber: z.string().min(7, 'Provide a valid contact number'),
  image: z.string().url().optional(),
});

