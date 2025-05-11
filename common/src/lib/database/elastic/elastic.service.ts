import { Injectable, Inject } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ELASTIC_CLIENT } from './elastic.constants';
import { getlastPlantIndex } from '../../utils';

@Injectable()
export class ElasticService {
  constructor(@Inject(ELASTIC_CLIENT) private readonly elasticClient: Client) {}
  // Search documents in an index
  async search(index: string, body: any): Promise<any> {
    try {
      const response = await this.elasticClient.search({
        index,
        body,
      });
      return response;
    } catch (error) {
      const e = error as Error;
      throw new Error(`Elasticsearch search error: ${e.message}`);
    }
  }

  async getPlantDevices(plantTag: string) {
    const plantIndex = getlastPlantIndex(plantTag);
    const body = {
      _source: ['log.file.path', 'DeviceName'],
      size: 0,
      aggs: {
        by_sub: {
          terms: {
            script: {
              source: `
              def path = doc['log.file.path.keyword'].value;
              def matcher = /\\\\([^\\\\]+)\\\\/.matcher(path);
              return matcher.find() ? matcher.group(1) : null;
            `,
              lang: 'painless',
            },
          },
          aggs: {
            unique_device_names: {
              terms: {
                field: 'DeviceName.keyword',
                order: {
                  _key: 'asc',
                },
                size: 10000,
              },
            },
          },
        },
      },
    };
    return await this.search(plantIndex, body);
  }

  async getPlantParameters(plantTag: string, entity_type_tag: string) {
    const plantIndex = getlastPlantIndex(plantTag);
    const body = {
      _source: {
        excludes: [
          'DeviceID',
          'agent',
          'input',
          'host',
          'tags',
          'log',
          '@version',
          '@timestamp',
          'event',
          'ecs',
          'is_sent',
          'message',
          'fields',
        ],
      },
      query: {
        bool: {
          must: [
            {
              wildcard: {
                'DeviceName.keyword': entity_type_tag,
              },
            },
          ],
        },
      },
      sort: [
        {
          DateTime: {
            order: 'desc',
          },
        },
      ],
      size: 1,
    };
    return await this.search(plantIndex, body);
  }
  // Get the raw client for advanced operations
  getClient(): Client {
    return this.elasticClient;
  }
}
