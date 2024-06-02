import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    this.authService.signUp(this.signUpForm.value).subscribe(
      (res) => {
        console.log(res);
        alert("Inscription réussie");
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        console.log(err);
        alert("Inscription échouée");
      }
    )
  }

}
