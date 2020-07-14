import { Component, OnInit } from '@angular/core';
import {IBook} from '../ibook';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  bookList: IBook[] = [];
  postForm: FormGroup;

  constructor(private bookService: BookService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(300)]]
    });
    this.bookService.getBooks().subscribe(next => (this.bookList = next),
        error => (this.bookList = []));
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.postForm.valid) {
      const {value} = this.postForm;
      this.bookService.createBook(value).subscribe(next => {
        this.bookList.unshift(next);
        this.postForm.reset({
          title: '',
          author: '',
          description: ''
        });
      },
        error => console.log(error));
    }
  }
  // tslint:disable-next-line:typedef
  deleteBook(i) {
    const book = this.bookList[i];
    this.bookService.deleteBook(book.id).subscribe(() => {
      this.bookList = this.bookList.filter(t => t.id !== book.id);
    });
  }

}
