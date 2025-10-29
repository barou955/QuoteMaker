import { type Quote, type InsertQuote } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createQuote(quote: InsertQuote): Promise<Quote>;
  getQuote(id: string): Promise<Quote | undefined>;
  getQuotes(): Promise<Quote[]>;
}

export class MemStorage implements IStorage {
  private quotes: Map<string, Quote>;
  private quoteCounter: number = 1;

  constructor() {
    this.quotes = new Map();
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const counter = String(this.quoteCounter++).padStart(6, '0');
    const quoteNumber = `BD-${year}${month}-${counter}`;

    const quote: Quote = {
      ...insertQuote,
      id,
      quoteNumber,
      createdAt: now,
    };

    this.quotes.set(id, quote);
    return quote;
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();