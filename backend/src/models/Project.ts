import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  DataType
} from "sequelize-typescript";
import Client from "./Client";
import User from "./User";

interface ProjectAttributes {
  id: number;
  name: string;
  clientId: number;
  userId: number;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "projects",
  modelName: "Project",
})
export default class Project extends Model<ProjectAttributes, ProjectCreationAttributes> {
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

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare clientId: number;

  @BelongsTo(() => Client)
  client!: Client;

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
