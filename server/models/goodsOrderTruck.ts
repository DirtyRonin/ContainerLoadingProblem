// import { type } from 'os';
// import { Table, Model, ForeignKey, Column, PrimaryKey, DataType, BelongsTo } from 'sequelize-typescript';
// import { ModelAttributeColumnOptions } from 'sequelize/types';
// import { Goods } from './goods';
// import { Order } from './order';
// import { Truck } from './truck';

// const config: Partial<ModelAttributeColumnOptions> = { unique: false, allowNull: false };

// @Table
// export class GoodsOrderTruck extends Model {
//   @Column({
//     primaryKey: true,
//     type: DataType.Int,
//     autoIncrement: true,
//   })
//   id!: number;

//   @ForeignKey(() => Order)
//   @Column(config)
//   orderId!: number;

//   @BelongsTo(() => Order)
//   order!: Order;


//   @ForeignKey(() => Goods)
//   @Column({
//     type: DataType.INTEGER,
//     references: {
//       model: 'Truck',
//       key: 'id',
//     },
//     unique: false,
//     allowNull: false,
//   })
//   goodsId!: number;

//   @BelongsTo(() => Goods)
//   singleGoods!: Goods;


//   @ForeignKey(() => Truck)
//   @Column(config)
//   truckId!: number;

//   @BelongsTo(() => Truck)
//   truck!: Truck;

//   @Column({ allowNull: false })
//   loadingMeter!: number;
// }
