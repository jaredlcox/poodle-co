/**
 * Migration script to move data from data.json to Firestore
 * 
 * Usage:
 * 1. Make sure Firebase is configured in .env.local
 * 2. Run: npx tsx scripts/migrate-to-firestore.ts
 * 
 * Or use Node.js:
 * node -r ts-node/register scripts/migrate-to-firestore.ts
 */

import { migrateToFirestore } from "@/lib/migration/migrate"

async function main() {
  try {
    console.log("🚀 Starting migration...")
    const result = await migrateToFirestore()
    console.log("✅", result.message)
    process.exit(0)
  } catch (error: any) {
    console.error("❌ Migration failed:", error.message)
    process.exit(1)
  }
}

main()
