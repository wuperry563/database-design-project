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
  error: String
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

  checkout(cardNo: String){
    console.log(this.isbn)
    console.log(cardNo)
    this.error = null
    this.libraryService.checkout(this.isbn,cardNo).subscribe(
      (data)=>{
      console.log(data)},
      error => {
        console.log(this.error)
        this.error = error }
      )
  }

}
