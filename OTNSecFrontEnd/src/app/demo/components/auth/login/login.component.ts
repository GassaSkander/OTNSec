import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    valCheck: string[] = ['remember'];

    TOKEN_KEY: string = "token";



    constructor(public layoutService: LayoutService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }


    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        if (localStorage.getItem(this.TOKEN_KEY)) {
            this.router.navigate(['/']);
        }
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        this.authService.signIn(this.loginForm.value).pipe(
            tap(res => {
                this.onLoginSuccess(res.accessToken);
                alert("Authentification réussie, Bienvenu ");
                this.router.navigateByUrl('/');

            }),
            catchError(error => {
                console.log(error);
                alert('Login failed. Please check your credentials.');
                return of(); // Returning an empty observable to gracefully handle the error
            })
        ).subscribe();
    }

    onLoginSuccess(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        this.loginForm.reset(); // Clear form fields
    }

    onLogout(): void {
        if (confirm('Are you sure you want to log out?')) {
            this.authService.removeToken();
            this.router.navigateByUrl('/auth/login');
        }

    }

}


