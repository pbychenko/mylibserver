/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.group(() => {
    Route.get('profile', 'AuthController.profile')
  }).middleware('auth')
}).prefix('api')

Route.group(() => {
  Route.get('users', 'UsersController.index')
  Route.get('users/:id/books', 'UsersController.books')
  Route.get('users/:id', 'UsersController.show')
  Route.group(() => {
    Route.post('users', 'UsersController.store')
    Route.patch('users/:id', 'UsersController.update')
    Route.delete('users/:id', 'UsersController.destroy')
  }).middleware('auth')

  Route.get('genres', 'GenresController.index')
  Route.group(() => {
    Route.post('genres', 'GenresController.store')
    Route.patch('genres/:id', 'GenresController.update')
    Route.delete('genres/:id', 'GenresController.destroy')
  }).middleware('auth')

  Route.get('authors', 'AuthorsController.index')
  Route.group(() => {
    Route.post('authors', 'AuthorsController.store')
    Route.patch('authors/:id', 'AuthorsController.update')
    Route.delete('authors/:id', 'AuthorsController.destroy')
  }).middleware('auth')

  Route.get('books', 'BooksController.index')
  Route.get('books/:id', 'BooksController.show')
  Route.group(() => {
    Route.post('books', 'BooksController.store')
    Route.patch('books/:id', 'BooksController.update')
    Route.delete('books/:id', 'BooksController.destroy')
  }).middleware('auth')
}).prefix('api')
