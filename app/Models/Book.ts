import { DateTime } from 'luxon'
import User from "App/Models/User"
import Genre from "App/Models/Genre"
import { BaseModel, column, BelongsTo, belongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public about: string

  @column()
  public picture: string

  @column()
  public ownerId: number

  @column()
  public holderId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

   // Relationship
  @belongsTo(() => User, {
    foreignKey: 'ownerId', // defaults to userId
  })
  public owner: BelongsTo<typeof User>

  @belongsTo(() => User)
  public holder: BelongsTo<typeof User>

  @manyToMany(() => User)
  public author: ManyToMany<typeof User>

  @manyToMany(() => Genre)
  public genres: ManyToMany<typeof Genre>
}
