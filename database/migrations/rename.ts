import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GenresBooks extends BaseSchema {
  public up() {
    this.schema.renameTable('genres_books', 'genre_book')
  }
}
