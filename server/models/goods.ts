import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Goods extends Model {
  @Column name!: string;
  @Column height!: number;
  @Column width!: number;
  @Column length!: number;
  @Column weight!: number;
}