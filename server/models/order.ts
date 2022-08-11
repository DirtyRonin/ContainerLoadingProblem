import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Cargo } from '.';

@Table
export class Order extends Model {
  @HasMany(() => Cargo)
  cargos!:Cargo[]
  
  @Column orderName!: string;
}
