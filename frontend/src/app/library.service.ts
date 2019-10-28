import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private httpClient: HttpClient) { }
  
  public search(searchString: String){
    return this.httpClient.get<Book[]>(`http://localhost:3000/api/search?searchString=${searchString}`)
  }

  public checkout(isbn: String, cardNo: String){
    return this.httpClient.get(`http://localhost:3000/api/checkout?isbn=${isbn}&cardId=${cardNo}`)
  }
}
