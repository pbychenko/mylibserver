import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AuthorsBooks extends BaseSchema {
  protected tableName = 'author_book'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('author_id').unsigned().references('authors.id')
      table.integer('book_id').unsigned().references('books.id')
      table.unique(['author_id', 'book_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
