import {
    Model,
    Column,
    Table,
    ForeignKey,
  } from "sequelize-typescript";
  import  Meeting  from "./Meeting";
  import  Contact  from "./Contact";
  
  @Table({
    timestamps: false,
    tableName: "meeting_contacts",
  })
  export class MeetingContacts extends Model<MeetingContacts> {
    @ForeignKey(() => Meeting)
    @Column
    meetingId!: number;
  
    @ForeignKey(() => Contact)
    @Column
    contactId!: number;
  }
  