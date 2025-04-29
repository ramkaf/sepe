import { Module, DynamicModule, Provider, Global, Logger } from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { ELASTIC_CLIENT } from './elastic.constants';
import { Client, ClientOptions } from '@elastic/elasticsearch';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Interface for Elasticsearch module configuration options
 */
export interface ElasticModuleOptions {
  /** Pre-configured Elasticsearch client instance */
  client?: Client;
  /** Custom configuration for Elasticsearch client */
  config?: {
    /** Elasticsearch node URL */
    node?: string;
    /** Authentication credentials */
    auth?: {
      username?: string;
      password?: string;
    };
    /** TLS configuration */
    tls?: {
      /** Path to CA certificate */
      caPath?: string;
      /** Reject unauthorized connections */
      rejectUnauthorized?: boolean;
    };
  };
}

@Global()
@Module({})
export class ElasticModuleVersion2 {

  static register(options?: Partial<ElasticModuleOptions>): DynamicModule {
    const elasticProvider: Provider = {
      provide: ELASTIC_CLIENT,
      useFactory: (): Client => {
        if (options?.client) {
          return options.client;
        }

        const clientOptions: ClientOptions = {};
        clientOptions.node = options?.config?.node || process.env['ELASTIC_NODE']!;
        clientOptions.auth = {
          username: options?.config?.auth?.username || process.env['ELASTIC_USERNAME']!,
          password: options?.config?.auth?.password || process.env['ELASTIC_PASSWORD']!,
        };

        // Configure TLS
        const caPath = options?.config?.tls?.caPath || path.resolve(process.cwd(), 'ca.crt');
        
        try {
          const ca = fs.readFileSync(caPath);
          clientOptions.tls = {
            ca,
            rejectUnauthorized: options?.config?.tls?.rejectUnauthorized !== undefined 
              ? options.config.tls.rejectUnauthorized 
              : false,
          };
        } catch (error) {
          const logger = new Logger('ElasticModule');
          const e = error as Error
          logger.error(`Failed to read CA certificate at ${caPath}: ${e.message}`);
          throw error;
        }

        return new Client(clientOptions);
      },
    };

    return {
      module: ElasticModuleVersion2,
      providers: [elasticProvider, ElasticService],
      exports: [ElasticService],
    };
  }
}