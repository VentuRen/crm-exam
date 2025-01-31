import { Optional  } from "sequelize";
import {
  Table,
  Model,
  Column,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  DataType
} from "sequelize-typescript";
import User from "./User";
import Meeting from "./Meeting";
import {MeetingContacts} from "./MeetingContacts";

interface ContactAttributes {
  id: number;
  name: string;
  email: string;
  userId: number;
}

interface ContactCreationAttributes extends Optional<ContactAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "contacts",
  modelName: "Contact",
})
export default class Contact extends Model<ContactAttributes, ContactCreationAttributes> {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Meeting, () => MeetingContacts)
  meetings?: Meeting[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
