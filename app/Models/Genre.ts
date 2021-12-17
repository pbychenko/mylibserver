import { DateTime } from 'luxon'
import Book from "App/Models/Book"
import { column,  BaseModel, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

export default class Genre extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Book)
  public books: ManyToMany<typeof Book>
}
