import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBook} from './ibook';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly API_URL = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }
  getBooks(count = 5): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL).pipe(
      map(response => response.filter((book, i) => i < count))
    );
  }
  getBookById(id: number): Observable<IBook> {
    return this.http.get<IBook>(`${this.API_URL}/${id}`);
  }
  createBook(book: Partial<IBook>): Observable<IBook> {
    return this.http.post<IBook>(this.API_URL, book);
  }
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  updateBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.API_URL}/${book.id}`, book);
  }
}
