import { Component, OnInit } from '@angular/core';
import {IBook} from '../ibook';
import {FormGroup} from '@angular/forms';
import {BookService} from '../book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  bookList: IBook[] = [];
  postForm: FormGroup;
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
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

}
