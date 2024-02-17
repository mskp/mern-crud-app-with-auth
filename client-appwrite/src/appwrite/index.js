import { Account, Client, Databases, ID } from "appwrite";

const APPWRITE_URL = import.meta.env.VITE_APPWRITE_URL;
const APPWITE_PROJECT_ID = import.meta.env.VITE_APPWITE_PROJECT_ID;
export const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
export const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint(APPWRITE_URL)
  .setProject(APPWITE_PROJECT_ID);

export const account = new Account(client);
export const uniqueId = ID.unique();
export const database = new Databases(client);
