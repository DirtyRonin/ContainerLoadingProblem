import { Column, Model, Table, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Cargo } from './cargo';
import { Truck } from './truck';

@Table
export class TruckLoading extends Model {
  @ForeignKey(() => Truck)
  @Column
  truckId!: number;

  @BelongsTo(() => Truck)
  truck!: Truck;

  @ForeignKey(() => Cargo)
  @Column
  cargoId!: number;

  @BelongsTo(() => Cargo)
  cargo!: Cargo;

  @Column
  loadingMeter!: number;
}
