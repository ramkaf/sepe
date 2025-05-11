import { EntityModel, EntityType } from 'common/src/lib/database';

export interface ISourceWithDevices {
  sourceName: string;
  devices: string[];
}

export interface IEntityTypeWithParameters {
  entityType: EntityType;
  paramters: string[];
}
