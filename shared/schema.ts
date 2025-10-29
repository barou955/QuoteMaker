import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quotes = pgTable("quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  countryLanguage: varchar("country_language", { enum: ["FR", "BNL"] }).notNull(),
  institutionType: varchar("institution_type", { enum: ["public", "private"] }).notNull(),
  contactInfo: jsonb("contact_info").notNull(),
  selectedCytometers: jsonb("selected_cytometers").notNull(),
  selectedModules: jsonb("selected_modules").notNull(),
  selectedOptions: jsonb("selected_options").notNull(),
  selectedLocation: varchar("selected_location").notNull(),
  numberOfParticipants: integer("number_of_participants").notNull(),
  totalPrice: integer("total_price").notNull(),
  originalPrice: integer("original_price").notNull(),
  discountAmount: integer("discount_amount").notNull(),
  automaticComments: text("automatic_comments").notNull(),
  quoteNumber: varchar("quote_number").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  quoteNumber: true,
  createdAt: true,
});

export const contactInfoSchema = z.object({
  title: z.enum(["Madame", "Monsieur"], { required_error: "Civilité requise" }),
  name: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  institution: z.string().min(1, "Établissement requis"),
  address: z.string().min(1, "Adresse requise"),
  phone: z.string().optional(),
});

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;
export type ContactInfo = z.infer<typeof contactInfoSchema>;

// Cytometer schema
export const cytometerSchema = z.object({
  id: z.string(),
  name: z.string(),
  pricePublic: z.number(),
  pricePrivate: z.number(),
  duration: z.string(),
  maxParticipants: z.number(),
  availableLocations: z.array(z.string()),
});

// Training module schema
export const trainingModuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  pricePublic: z.number(),
  pricePrivate: z.number(),
});

// Additional option schema
export const additionalOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  pricePublic: z.number(),
  pricePrivate: z.number(),
});
