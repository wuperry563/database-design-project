import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private httpClient: HttpClient) { }
  //http://localhost:3000/api/search?searchString=Bradbury
  public search(searchString: String){
    return this.httpClient.get(`http://localhost:3000/api/search?searchString=${searchString}`)
  }
}
