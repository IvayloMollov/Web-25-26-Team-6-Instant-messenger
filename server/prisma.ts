import "dotenv/config";
import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "@/generated/prisma/client";

export class DB_Connection {
    public getClient(): PrismaClient {
        return this.client;
    }

    private static instance: DB_Connection;
    private constructor() {
        const connectionString = `${process.env.DATABASE_URL}`;
        const adapter = new PrismaPg({connectionString});
        this.client = new PrismaClient({adapter});
    }
    public static getInstance(): DB_Connection {
        if (!DB_Connection.instance) {
            DB_Connection.instance = new DB_Connection();
        }
        return DB_Connection.instance;
    }
    private client: PrismaClient;
}