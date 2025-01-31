import { Optional } from "sequelize";
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
import Project from "./Project";
import User from "./User";
import Contact from "./Contact";
import {MeetingContacts} from "./MeetingContacts";

interface MeetingAttributes {
  id: number;
  date: Date;
  userId: number;
  projectId: number;
}

interface MeetingCreationAttributes extends Optional<MeetingAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "meetings",
  modelName: "Meeting",
})
export default class Meeting extends Model<MeetingAttributes, MeetingCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare date: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare projectId: number;

  @BelongsTo(() => Project)
  project!: Project;

  @BelongsToMany(() => Contact, () => MeetingContacts)
  contacts?: Contact[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
