import { Column, Model, Table, HasMany, ForeignKey, BelongsTo, DataType, Index } from 'sequelize-typescript';
import { CargoSeq } from './cargo';
import { OrderSeq } from './order';
import { Route } from './route';
import { Truck } from './truck';

@Table
export class TruckLoading extends Model {

  @Index
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Truck)
  @Column
  truckId!: number;

  @BelongsTo(() => Truck)
  truck!: Truck;

  @ForeignKey(() => CargoSeq)
  @Column
  cargoId!: number;

  @BelongsTo(() => CargoSeq)
  cargo!: CargoSeq;

  @ForeignKey(() => Route)
  @Column
  routeId!: number;

  @BelongsTo(() => Route)
  route!: Route;

  
}
