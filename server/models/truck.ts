import { Column, Model, Table, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Cargo } from '.';
import { Route } from './route';
import { TruckLoading } from './truckLoading';

@Table
export class Truck extends Model {
  @Column vehicleIdentifier!: string;
  @Column loadingTime!: number;
  @Column dischargeTime!: number;
  @Column height!: number;
  @Column width!: number;
  @Column length!: number;
  @Column maxWeight!: number;


  @BelongsToMany(()=> Route, ()=> TruckLoading)
  routes!:Route[]

  @BelongsToMany(() => Cargo, () => TruckLoading)
  cargos!: Cargo[];

  @HasMany(()=> TruckLoading)
  truckLoadings!:TruckLoading[]
  
}
