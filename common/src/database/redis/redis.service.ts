import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: ReturnType<typeof createClient>;

  constructor(private configService: ConfigService) {
    const redisConfig = {
      user: this.configService.get('REDIS_USER') || '',
      host: this.configService.get('REDIS_HOST') || 'localhost',
      port: this.configService.get('REDIS_PORT') || 6379,
      password: this.configService.get('REDIS_PASSWORD') || '',
    };

    this.client = createClient({
      url: `redis://${redisConfig.user}:${redisConfig.password}@${redisConfig.host}:${redisConfig.port}`,
    });

    this.client.on('error', (err) =>
      this.logger.error('Redis Client Error', err),
    );
  }

  async onModuleInit() {
    try {
      await this.connect();
      this.logger.log(
        `✅ Redis client connected successfully to ${this.configService.get('REDIS_HOST')}:${this.configService.get('REDIS_PORT')}`,
      );
    } catch (error) {
      this.logger.error(
        `❌ Failed to connect to Redis: ${error.message}`,
        error.stack,
      );
    }
  }

  async onModuleDestroy() {
    await this.disconnect();
    this.logger.log('Redis client disconnected');
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async disconnect() {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  getClient() {
    return this.client;
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      this.logger.error(`Error getting key ${key}: ${error.message}`);
      throw error;
    }
  }

  async set(
    key: string,
    value: string,
    ttlSeconds?: number,
  ): Promise<string | null> {
    try {
      if (ttlSeconds) {
        return await this.client.set(key, value, { EX: ttlSeconds });
      }
      return await this.client.set(key, value);
    } catch (error) {
      this.logger.error(`Error setting key ${key}: ${error.message}`);
      throw error;
    }
  }

  async del(key: string): Promise<number> {
    try {
      return await this.client.del(key);
    } catch (error) {
      this.logger.error(`Error deleting key ${key}: ${error.message}`);
      throw error;
    }
  }

  async exists(key: string): Promise<number> {
    try {
      return await this.client.exists(key);
    } catch (error) {
      this.logger.error(
        `Error checking if key ${key} exists: ${error.message}`,
      );
      throw error;
    }
  }

  // Stack Operations (Using Lists)
  async pushToStack(stackName: string, ...values: string[]): Promise<number> {
    try {
      return await this.client.lPush(stackName, values);
    } catch (error) {
      this.logger.error(
        `Error pushing to stack ${stackName}: ${error.message}`,
      );
      throw error;
    }
  }

  async popFromStack(stackName: string): Promise<string | null> {
    try {
      return await this.client.lPop(stackName);
    } catch (error) {
      this.logger.error(
        `Error popping from stack ${stackName}: ${error.message}`,
      );
      throw error;
    }
  }

  async getStackLength(stackName: string): Promise<number> {
    try {
      return await this.client.lLen(stackName);
    } catch (error) {
      this.logger.error(
        `Error getting stack length ${stackName}: ${error.message}`,
      );
      throw error;
    }
  }

  async getStackElements(
    stackName: string,
    start = 0,
    end = -1,
  ): Promise<string[]> {
    try {
      return await this.client.lRange(stackName, start, end);
    } catch (error) {
      this.logger.error(
        `Error getting stack elements ${stackName}: ${error.message}`,
      );
      throw error;
    }
  }

  // Queue Operations (Using Lists, but with RPUSH and LPOP)
  async enqueue(queueName: string, ...values: string[]): Promise<number> {
    try {
      return await this.client.rPush(queueName, values);
    } catch (error) {
      this.logger.error(
        `Error enqueueing to queue ${queueName}: ${error.message}`,
      );
      throw error;
    }
  }

  async dequeue(queueName: string): Promise<string | null> {
    try {
      return await this.client.lPop(queueName);
    } catch (error) {
      this.logger.error(
        `Error dequeueing from queue ${queueName}: ${error.message}`,
      );
      throw error;
    }
  }

  async getQueueLength(queueName: string): Promise<number> {
    try {
      return await this.client.lLen(queueName);
    } catch (error) {
      this.logger.error(
        `Error getting queue length ${queueName}: ${error.message}`,
      );
      throw error;
    }
  }
}
