import { MongoClient, Db } from "mongodb";
import { initialProducts, initialCategories, initialBanners, Product, Category, Banner } from "./seed-data";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://book-admin:ViwhhsBSIAx2WgtW@cluster0.evzoqt4.mongodb.net/zaraz?retryWrites=true&w=majority";
const MONGODB_DB = process.env.MONGODB_DB || "zaraz";

// In-Memory store fallback
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var _zarazMemoryStore: {
    products: Product[];
    categories: Category[];
    banners: Banner[];
    orders: any[];
    users: any[];
  } | undefined;
}

if (!global._zarazMemoryStore) {
  global._zarazMemoryStore = {
    products: [...initialProducts],
    categories: [...initialCategories],
    banners: [...initialBanners],
    orders: [],
    users: [
      {
        id: "user-1",
        name: "Demo Customer",
        email: "user@zaraz.com",
        password: "password123",
        phone: "01711000000",
        address: "House 24, Road 5, Dhanmondi, Dhaka",
        role: "customer"
      }
    ]
  };
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export async function getDb(): Promise<{ db: Db | null; isMemory: boolean }> {
  try {
    if (!clientPromise) {
      if (process.env.NODE_ENV === "development") {
        if (!global._mongoClientPromise) {
          client = new MongoClient(MONGODB_URI, {
            serverSelectionTimeoutMS: 4000,
            connectTimeoutMS: 4000
          });
          global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
      } else {
        client = new MongoClient(MONGODB_URI, {
          serverSelectionTimeoutMS: 4000,
          connectTimeoutMS: 4000
        });
        clientPromise = client.connect();
      }
    }

    const connectedClient = await clientPromise;
    const db = connectedClient.db(MONGODB_DB);
    return { db, isMemory: false };
  } catch (error) {
    // Graceful fallback to memory store
    return { db: null, isMemory: true };
  }
}

export function getMemoryStore() {
  return global._zarazMemoryStore!;
}
