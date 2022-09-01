import { BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { CargoSeq } from './cargo';
import { Truck } from './truck';
import { TruckLoading } from './truckLoading';

@Table
export class Route extends Model {
  @BelongsToMany(() => Truck, () => TruckLoading)
  trucks!: Truck[];

  @BelongsToMany(() => CargoSeq, () => TruckLoading)
  cargos!: CargoSeq[];

  @HasMany(() => TruckLoading)
  truckLoadings!: TruckLoading[];

  @Column
  from!:string
  @Column
  to!:string
}
