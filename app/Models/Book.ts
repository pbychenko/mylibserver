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
  public author_id: number

  @column()
  public holder_id: number

  @column()
  public owner_id: number

  @column()
  public genre_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

   // Relationship
  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>

  @belongsTo(() => User)
  public holder: BelongsTo<typeof User>

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>

  @manyToMany(() => Genre)
  public genres: ManyToMany<typeof Genre>
}
