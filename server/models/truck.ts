import { Schema } from 'mongoose';
import { Column, Model, Table, HasMany, BelongsToMany } from 'sequelize-typescript';
import { CargoSeq } from '.';
import { ITruck } from '../interfaces/ITruck';
import { Route } from './route';
import { TruckLoading } from './truckLoading';

export const truckSchema = new Schema<ITruck>({
  vehicleIdentifier: { type: String, required: true },
  loadingTime: { type: Number, required: true },
  dischargeTime: { type: Number, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  maxWeight: { type: Number, required: true },
});

@Table
export class Truck extends Model {
  @Column vehicleIdentifier!: string;
  @Column loadingTime!: number;
  @Column dischargeTime!: number;
  @Column height!: number;
  @Column width!: number;
  @Column length!: number;
  @Column maxWeight!: number;

  @BelongsToMany(() => Route, () => TruckLoading)
  routes!: Route[];

  @BelongsToMany(() => CargoSeq, () => TruckLoading)
  cargos!: CargoSeq[];

  @HasMany(() => TruckLoading)
  truckLoadings!: TruckLoading[];
}
