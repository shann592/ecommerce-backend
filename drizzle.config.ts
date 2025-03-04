import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/productsSchema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true, // for logging purpose,
  strict: true, // to import some more rule
})
