import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { GoodsOrder, Order } from './';

@Table
export class Goods extends Model {
  @BelongsToMany(() => Goods, () => GoodsOrder)
  orders!: Order[];

  @Column name!: string;
  @Column width!: number;
  @Column length!: number;
  @Column weight!: number;
  @Column static!: boolean;
  
}
