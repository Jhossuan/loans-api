import {CacheRepository} from "./cache.repository";
import Redis from "ioredis";

export class RedisCacheService implements CacheRepository {
    private client: Redis;

    constructor() {
        this.client = new Redis({
            host: "localhost",
            port: 6379
        })
    }

    async get<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        if(!data) return null;
        return JSON.parse(data);
    }

    async set(key: string, value: unknown, ttl?: number): Promise<void>{
        const data = JSON.stringify(value);
        if(ttl){
            await this.client.set(key, data, "EX", ttl)
        } else {
            await this.client.set(key, data)
        }
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}