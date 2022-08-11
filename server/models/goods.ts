// import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
// import { Cargo, GoodsOrderTruck, Order, Truck } from './';

// @Table
// export class Goods extends Model {
//   @BelongsToMany(() => Order, () => Cargo)
//   orders!: Order[];

//   @BelongsToMany(() => Order, () => GoodsOrderTruck)
//   assignedOrders!: Order[];

//   @BelongsToMany(() => Truck, () => GoodsOrderTruck)
//   assignedTrucks!: Truck[];

//   @Column name!: string;
//   @Column width!: number;
//   @Column length!: number;
//   @Column weight!: number;
//   @Column isReadonly!: boolean;
  
// }
