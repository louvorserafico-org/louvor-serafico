import { z } from 'zod';
import { ProfileSchema, SongSchema } from './schemas';

export type Profile = z.infer<typeof ProfileSchema>;
export type Song = z.infer<typeof SongSchema>;
export type SongStatus = z.infer<typeof SongStatusSchema>;
