import { NgModule } from '@angular/core';
import { InscriptionComponent } from './inscription.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: '', component: InscriptionComponent}
    ])
    
  ],
  exports: [RouterModule]
})
export class InscriptionRoutingModule { }
