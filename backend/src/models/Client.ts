import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from "sequelize-typescript";
import User from "./User";
import { Optional } from "sequelize";

interface ClientAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  userId: number;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "clients",
  modelName: "Client",
})
export default class Client extends Model<ClientAttributes, ClientCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @BelongsTo(() => User)
  user!: User;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
