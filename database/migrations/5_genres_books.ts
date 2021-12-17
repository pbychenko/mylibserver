import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GenresBooks extends BaseSchema {
  protected tableName = 'genres_books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('genre_id').unsigned().references('genres.id')
      table.integer('book_id').unsigned().references('books.id')
      table.unique(['genre_id', 'book_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
