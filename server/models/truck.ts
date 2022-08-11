import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Cargo } from './cargo';

@Table
export class Truck extends Model {
  @Column vehicleIdentifier!: string;
  @Column loadingTime!: number;
  @Column dischargeTime!: number;
  @Column height!: number;
  @Column width!: number;
  @Column length!: number;
  @Column maxWeight!: number;

  @HasMany(() => Cargo)
  cargos!: Cargo[];
}
