import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BooksComponent} from './books/books.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {BookEditComponent} from './book-edit/book-edit.component';
import {CreateBookComponent} from './create-book/create-book.component';


const routes: Routes = [
  {
    path: 'book',
    component: BooksComponent
  },
  {
    path: 'book/:id',
    component: BookDetailComponent
  },
  {
    path: 'book/:id/edit',
    component: BookEditComponent
  },
  {
    path: 'book/create',
    component: CreateBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
