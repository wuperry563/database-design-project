import { Component, OnInit } from '@angular/core';
import { Borrower } from '../borrower';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.css']
})
export class BorrowerComponent {
  model = new Borrower("","","","","","","","","");
  message: String

  submitted = false;

  constructor(private libraryService: LibraryService) { }

  onSubmit() { 
  const borrowerQuery ={
    query: `insert into borrower(ssn,phone)
    values('${this.model.ssn}','${this.model.phone}')
    `
  }

  const addressQuery ={
    query: `insert into address (address, city, state, borrower_id ) VALUES
    ( '${this.model.address1}','${this.model.city}','${this.model.state}', (SELECT borrower_id from borrower WHERE ssn='${this.model.ssn}') );
    `
  }
  
  const nameQuery ={
    query: `INSERT INTO bname (first_name, last_name, email, borrower_id ) VALUES
    ( '${this.model.firstName}','${this.model.lastName}','${this.model.email}', (SELECT borrower_id from borrower WHERE ssn='${this.model.ssn}') );
    `
  }

  this.libraryService.executeQuery(borrowerQuery).subscribe(
    (data)=>{
      this.libraryService.executeQuery(addressQuery).subscribe(
        (data)=>{
          this.libraryService.executeQuery(nameQuery).subscribe(
            (data)=>{
              this.message="Success!"
            }
          )
        },
        )
    },
    (error)=>{
      this.message= "cannot create borrower because: "+ error.error.constraint
    }
    )

 
  }

  isAbleToCheckout(borrower_id: String){


    /*
    INSERT INTO bname (first_name, last_name, email, borrower_id ) VALUES
    ( 'bob','saget','a@a.com', (SELECT borrower_id from borrower WHERE ssn='123-123-123') );

    INSERT INTO address (address, city, state, borrower_id ) VALUES
    ( '123 Main Street','plano','tx', (SELECT borrower_id from borrower WHERE ssn='123-123-123') );

    */

  }
  
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
