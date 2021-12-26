import { DateTime } from 'luxon'
import Book from "App/Models/Book"
import { column,  BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Genre extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Book, {
    foreignKey: 'genreId',
  })
  public ownerBooks: HasMany<typeof Book>;
}
