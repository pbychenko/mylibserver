import { DateTime } from 'luxon'
import Author from 'App/Models/Author'
import User from 'App/Models/User'
import Genre from 'App/Models/Genre'
import {
  BaseModel,
  column,
  BelongsTo,
  belongsTo,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'

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

  @column()
  public genreId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'ownerId',
  })
  public owner: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'holderId',
  })
  public holder: BelongsTo<typeof User>

  @belongsTo(() => Genre, {
    foreignKey: 'genreId',
  })
  public genre: BelongsTo<typeof Genre>

  @manyToMany(() => Author)
  public authors: ManyToMany<typeof Author>
}
