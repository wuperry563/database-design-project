import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.css']
})
export class FinesComponent implements OnInit {
  markResult: String
  message : String
  results: any
  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
  }

  /**
   *update fines
  set fine_amount = case
    when date_in is null then cast (0.25*(DATE_PART('day',  now() - due_date) ::numeric) as money)
    else cast (0.25*(date_in - due_date) as money)
    end
  from book_loan
  where fines.loan_id = book_loan.loan_id and paid=false
   */
  updateAllFines(){
    const query ={
      query: `update fines
      set fine_amount = case
        when date_in is null then cast (0.25*(DATE_PART('day',  now() - due_date) ::numeric) as money)
        else cast (0.25*(date_in - due_date) as money)
        end
      from book_loan
      where fines.loan_id = book_loan.loan_id and paid=false`
    }
    this.libraryService.executeQuery(query).subscribe(
      (data)=>{
        this.message = "done"
      }
      )
  }

  getFines(){
    const query ={
      query: `select sum(fine_amount), borrower_id, paid
      from fines
      join book_loan on fines.loan_id = book_loan.loan_id
      group by borrower_id, paid
      `
    }
    this.libraryService.executeQuery(query).subscribe(
      (data)=>{
        console.log(data)
        this.results = data
        this.message = "done"
      }
      )
  }

  markAsPaid(loanId:String){
    const query ={
      query: `select date_in
      from fines
      join book_loan on book_loan.loan_id = fines.loan_id and fines.loan_id=${loanId}
      `
    }
    const markQuery ={
      query: `update fines
      set paid=true
      where loan_id = ${loanId}
      `
    }
    this.libraryService.executeQuery(query).subscribe(
      (data)=>{
        if(data[0].date_in==null){
          this.markResult = "ERROR: Book is not checked in yet."
        }        
        else{
          this.libraryService.executeQuery(markQuery).subscribe(
            (data)=>{
              this.markResult = "Marked as Paid!"
            })
        }
      }
      )
  }

  getUnpaidFines(){
    const query ={
      query: `select sum(fine_amount), borrower_id, paid
      from fines
      join book_loan on fines.loan_id = book_loan.loan_id
      group by borrower_id, paid
      having paid=false
      `
    }
    this.libraryService.executeQuery(query).subscribe(
      (data)=>{
        console.log(data)
        this.results = data
        this.message = "done"
      }
      )
  }
}
