import { Injectable, Inject } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ELASTIC_CLIENT } from './elastic.constants';

@Injectable()
export class ElasticService {
  constructor(@Inject(ELASTIC_CLIENT) private readonly elasticClient: Client) {}

  // Search documents in an index
  async search(index: string, query: any): Promise<any> {
    try {
      const response = await this.elasticClient.search({
        index,
        ...query,
      });
      return response;
    } catch (error) {
      throw new Error(`Elasticsearch search error: ${error.message}`);
    }
  }

  // Index a document
  async index(index: string, document: any, id?: string): Promise<any> {
    try {
      const params: any = {
        index,
        body: document,
      };

      if (id) {
        params.id = id;
      }

      return await this.elasticClient.index(params);
    } catch (error) {
      throw new Error(`Elasticsearch index error: ${error.message}`);
    }
  }

  // Update a document
  async update(index: string, id: string, doc: any): Promise<any> {
    try {
      return await this.elasticClient.update({
        index,
        id,
        body: { doc },
      });
    } catch (error) {
      throw new Error(`Elasticsearch update error: ${error.message}`);
    }
  }

  // Delete a document
  async delete(index: string, id: string): Promise<any> {
    try {
      return await this.elasticClient.delete({
        index,
        id,
      });
    } catch (error) {
      throw new Error(`Elasticsearch delete error: ${error.message}`);
    }
  }

  // Check if an index exists
  async indexExists(index: string): Promise<boolean> {
    try {
      const response = await this.elasticClient.indices.exists({ index });
      return response;
    } catch (error) {
      throw new Error(`Elasticsearch index exists error: ${error.message}`);
    }
  }

  // Create an index
  async createIndex(index: string, mappings?: any): Promise<any> {
    try {
      const indexParams: any = { index };

      if (mappings) {
        indexParams.body = mappings;
      }

      return await this.elasticClient.indices.create(indexParams);
    } catch (error) {
      throw new Error(`Elasticsearch create index error: ${error.message}`);
    }
  }

  // Delete an index
  async deleteIndex(index: string): Promise<any> {
    try {
      return await this.elasticClient.indices.delete({ index });
    } catch (error) {
      throw new Error(`Elasticsearch delete index error: ${error.message}`);
    }
  }

  // Bulk operations
  async bulk(operations: any[]): Promise<any> {
    try {
      return await this.elasticClient.bulk({ body: operations });
    } catch (error) {
      throw new Error(`Elasticsearch bulk operation error: ${error.message}`);
    }
  }

  // Get the raw client for advanced operations
  getClient(): Client {
    return this.elasticClient;
  }
}
