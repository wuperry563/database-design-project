import { Component } from '@angular/core';
import { LibraryService } from './library.service';
import { Book } from './book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library'
  searchString: String
  results: Book[]
  isbn: String
  error: String
  shouldShowCheckout: Boolean

  constructor(private libraryService: LibraryService) { }

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
    this.libraryService.checkout(this.isbn,cardNo).subscribe(
      (data)=>{
      console.log(data)},
      error => {
        console.log(this.error)
        this.error = error }// error path
      )
  }

}
