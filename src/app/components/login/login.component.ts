import { routes } from './../../app.routes';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

private readonly _fb = inject(FormBuilder);
private readonly routes = inject(Router);

loginForm = this._fb.group({
  email: [''],
  password: ['']
});

public onSubmit() {
  console.log(this.loginForm.value);

  this.routes.navigate(['sistema_recursos_humanos/empleados']);
}

}
