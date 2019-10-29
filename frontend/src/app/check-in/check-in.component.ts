import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

 results: any
 constructor(private libraryService: LibraryService) { }

  ngOnInit() {
  }

  search(searchString: String){
    const query ={
      query: `
      select book.isbn, borrower.borrower_id, bname.first_name, bname.last_name, loan_id
      from book
      join book_loan on book.isbn = book_loan.isbn
      join borrower on book_loan.borrower_id = borrower.borrower_id
      join bname on bname.borrower_id = borrower.borrower_id

      where
      to_tsvector(bname.first_name) ||
      to_tsvector(bname.last_name) ||
      to_tsvector(book.isbn) @@
      to_tsquery(\'${searchString}\') AND
      book_loan.date_in is null
      `
    }

    this.libraryService.executeQuery(query).subscribe((data)=>{
      console.log(data)
      this.results = data;
  })
  }

  checkIn(loan_id: String){
    const query ={
      query: `update book_loan
    set date_in = now()
    where loan_id=${loan_id}`
    }

    this.libraryService.executeQuery(query).subscribe((data)=>{
      console.log(data)
      this.results = data;
    })
  }
}
