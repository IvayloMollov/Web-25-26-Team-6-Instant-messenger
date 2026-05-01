import {PrismaPg} from "@prisma/adapter-pg";

// According to the official Prisma documentation the import path should be "@prisma/client"
// but it is not recognized by the TypeScript compiler. Regenerating does not help
import {PrismaClient} from "@prisma/client/extension";

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