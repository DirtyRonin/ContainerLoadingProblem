import { BelongsToMany, HasMany, Model, Table } from 'sequelize-typescript';
import { Cargo } from './cargo';
import { Truck } from './truck';
import { TruckLoading } from './truckLoading';

@Table
export class Route extends Model {
  @BelongsToMany(() => Truck, () => TruckLoading)
  trucks!: Truck[];

  @BelongsToMany(() => Cargo, () => TruckLoading)
  cargos!: Cargo[];

  @HasMany(() => TruckLoading)
  truckLoadings!: TruckLoading[];
}
