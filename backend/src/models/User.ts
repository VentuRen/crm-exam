import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  HasMany,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  DataType
} from "sequelize-typescript";
import Client from "./Client";
import  Project  from "./Project";
import  Meeting  from "./Meeting";
import  Contact  from "./Contact";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "User",
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
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
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare role: string; // "admin", "user"

  @HasMany(() => Client)
  clients?: Client[];

  @HasMany(() => Project)
  projects?: Project[];

  @HasMany(() => Meeting)
  meetings?: Meeting[];

  @HasMany(() => Contact)
  contacts?: Contact[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
