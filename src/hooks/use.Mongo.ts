import { useMemo } from "react";
// import { useUser } from "@clerk/nextjs";
import { useUser } from "@realm/react";
import config from "@/lib/mongodb";
import client from "@/lib/mongodb";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

export function useMongoClient() {
    let client = new MongoClient(uri, options)
    return useMemo(() => {
      if (!client) return null;
      return client;
    }, [client]);
  }

export function useMongoDB(databaseName = 'Mazamaza-shop') {
  const client = useMongoClient();
  return useMemo(() => {
    if (!client) return null;
    return client.db(databaseName);
  }, [client, databaseName]);
}

export function useMongoCollection(collectionName: string, databaseName = 'Mazamaza-shop') {
  const db = useMongoDB(databaseName);
  return useMemo(() => {
    if (!db) return null;
    return db.collection(collectionName);
  }, [db, collectionName]);
}
