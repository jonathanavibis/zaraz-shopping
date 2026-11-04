import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri =
  process.env.MONGODB_URI ||
  process.env.MONGODB_URL ||
  "mongodb+srv://zaraz-admin:6681CptbyrN76kua@cluster0.qlpxs02.mongodb.net/zaraz_db?retryWrites=true&w=majority";

const clientOptions = {
  tlsAllowInvalidCertificates: true,
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 10000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromiseAuth) {
    client = new MongoClient(uri, clientOptions);
    (global as any)._mongoClientPromiseAuth = client.connect().catch((err) => {
      console.warn("[MongoDB Auth Client Connection Warning]:", err.message);
      return client;
    });
  }
  clientPromise = (global as any)._mongoClientPromiseAuth;
} else {
  client = new MongoClient(uri, clientOptions);
  clientPromise = client.connect().catch((err) => {
    console.warn("[MongoDB Auth Client Connection Warning]:", err.message);
    return client;
  });
}

export const getDb = async () => {
  try {
    const connectedClient = await clientPromise;
    return connectedClient.db(process.env.MONGODB_DB || "zaraz_db");
  } catch (err) {
    console.warn("[getDb Error]:", err);
    return client.db("zaraz_db");
  }
};

const getBaseUrl = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  return "http://localhost:3000";
};

export const auth = betterAuth({
  database: mongodbAdapter(await getDb(), {
    client: await clientPromise,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || "EQIm8GWsjGHQY0jf0Ixf7Djjh6CRxFCZ",
  baseURL: getBaseUrl(),
});
