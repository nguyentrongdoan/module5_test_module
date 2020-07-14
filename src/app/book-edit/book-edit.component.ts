import { Component, OnInit } from '@angular/core';
import {IBook} from '../ibook';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  book: IBook;
  postForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(300)]]
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(id).subscribe(next => {
      this.book = next;
      this.postForm.patchValue(this.book);
    },
      error => {
      console.log(error);
      this.book = null;
      });
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.postForm.valid) {
      const {value} = this.postForm;
      const data = {
        ...this.book,
        ...value
      };
      this.bookService.updateBook(data).subscribe(next => {
        this.router.navigate(['/book']);
      },
        error => console.log(error));
    }
  }

}
