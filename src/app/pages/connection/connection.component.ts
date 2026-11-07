import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [LoginFormComponent, SignUpComponent],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent {

}
