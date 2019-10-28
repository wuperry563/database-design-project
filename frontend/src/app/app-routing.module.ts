import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInComponent } from './check-in/check-in.component'
import { SearchBookComponent } from './search-book/search-book.component'

const routes: Routes = [
  { path: 'check-in', component: CheckInComponent },
  { path: 'search', component: SearchBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }