import { z } from "zod";

export const EventActivityValidationSchema = z.object({
   date: z.string(),
   venue: z.string(),
   price: z.number(),
   total_ticket: z.number(),
   title: z.string(),
   poster: z.string(),
   _comment_count: z.number(),
});

export type EventActivityValidationType = z.infer<
   typeof EventActivityValidationSchema
>;
