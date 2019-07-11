import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../core/services/firebase.service';
import {Router} from '@angular/router';
import { validateCounterRange } from 'src/app/shared/components/counter-input/counter-input.component';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {
  // email: string;
  // password: string;

  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private router: Router
  ) {
    /*
    this.signInForm = new FormGroup({
      email: new FormControl('demo@demo.com', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl()
    });
    */
    this.signInForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      counter: [0, validateCounterRange]
    });
  }

  get email() {
    return this.signInForm.get('email');
  }

  ngOnInit() {
  }

  save() {
    if (this.signInForm.invalid) { return; }
    this.firebase.signIn(this.signInForm.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.idToken);
          this.router.navigate(['/home']);
        },
        err => {
          console.log(err);
          alert(err.error.error.message);
        }
      );
  }

}
