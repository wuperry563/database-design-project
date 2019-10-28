import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  results: any
  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
    this.libraryService.search('Bradbury').subscribe((data)=>{
      console.log(data)
      this.results = data;
    })
  }

}
