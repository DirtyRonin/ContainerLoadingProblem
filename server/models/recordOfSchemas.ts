export const modelSchema = ['Truck', 'Cargo', 'Order'] as const;

export type ModelSchemaTypes = 'Truck' | 'Cargo' | 'Order';

export const RecordOfSchemas: Record<ModelSchemaTypes, string> = {
  Truck: 'Truck',
  Cargo: 'Cargo',
  Order: 'Order',
};
