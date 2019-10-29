import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Book } from '../book';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  title = 'Search for a book'
  searchString: String
  results: Book[]
  isbn: String
  message: String
  shouldShowCheckout: Boolean

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
  }

  search(searchString: String){
    console.log(searchString)
    this.libraryService.search(searchString).subscribe((data)=>{
      console.log(data)
      this.results = data;
  })
}

  showCheckout(isbn: String){
    this.shouldShowCheckout = true
    this.isbn = isbn
  }

  isAbleToCheckout(borrower_id: String){
    const query ={
      query: `select count(*)
      from book_loan
      where borrower_id = ${borrower_id}
      and date_in is null`
    }

    this.libraryService.executeQuery(query).subscribe(
      (data)=>{
      console.log(data)
      if(data[0].count>3)
      {
        console.log("TOO MANY LOANS")
        this.message = "There are too many active loans under this user."
      }
      else{
        this.checkout(borrower_id)
      }
    }
      )
  }
  checkout(cardNo: String){
    console.log(this.isbn)
    console.log(cardNo)
    this.libraryService.checkout(this.isbn,cardNo).subscribe(
      (data)=>{
      console.log(data)
      this.message = "checkout successful!"
    },
      error => {
        console.log(error.error.constraint)
        this.message = "Error because " + error.error.constraint
      }
      )
  }

}
