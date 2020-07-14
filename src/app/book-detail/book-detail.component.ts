import { Component, OnInit } from '@angular/core';
import {IBook} from '../ibook';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: IBook;

  constructor(private route: ActivatedRoute,
              private bookService: BookService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(id).subscribe(next => (this.book = next),
      error => {
      console.log(error);
      this.book = null;
      });
  }

}
