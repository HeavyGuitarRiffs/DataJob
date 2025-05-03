
// global.d.ts
import { MongoClient } from "mongodb";

declare global {
  // Use 'let' or 'const' for the global variable to avoid using 'var'
  let _mongoClientPromise: Promise<MongoClient> | undefined;
}

// This is necessary for the TypeScript compiler to treat this file as a global declaration
export {};
