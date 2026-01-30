import { z } from 'zod';

export const ProfileSchema = z.object({
    id: z.string().uuid(),
    display_name: z.string().nullable(),
    role: z.enum(['user', 'admin']),
    created_at: z.string(),
    updated_at: z.string().nullable(),
});

export const SongStatusSchema = z.enum(['draft', 'published']);

export const SongSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    composer: z.string().nullable(),
    lyrics_markdown: z.string().nullable(),
    status: SongStatusSchema,
    created_at: z.string(),
    updated_at: z.string().nullable(),
    published_at: z.string().nullable(),
});
