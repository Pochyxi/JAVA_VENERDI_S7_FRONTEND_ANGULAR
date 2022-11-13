import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackEndService} from "../back-end.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-sonde',
  templateUrl: './add-sonde.component.html',
  styleUrls: ['./add-sonde.component.scss']
})
export class AddSondeComponent implements OnInit {

  form!: FormGroup;
  hide = true;
  errorFlag = false;

  constructor(
    private backEnd$: BackEndService,
    public fb: FormBuilder,

    private router: Router,
  ) {
    this.form = this.fb.group({
      nomeSonda: ['', [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
      ]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  login() {
    if (!this.form.valid) {
      console.log('not valid');
    } else {

      console.log(this.form.value);
    }
  }

  getFormControl(name: string) {
    return this.form.get(name);
  }

  getErrorMessage(param: string) {
    if (this.getFormControl(param)?.hasError('required')) {
      return 'Questo campo deve essere compilato';
    }
    return '';
  }

  getEmailError() {
    if (this.getFormControl('email')?.hasError('required')) {
      return 'Questo campo deve essere compilato';
    }
    return this.getFormControl('email')?.hasError('email')
      ? 'Email non valida'
      : '';
  }

}
