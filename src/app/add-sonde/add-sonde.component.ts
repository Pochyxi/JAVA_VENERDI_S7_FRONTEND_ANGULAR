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
  spanFlag: boolean = false;

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
      username: ['', [
        Validators.required,
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
      conferma: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      latitudine: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],
      longitudine: [
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

  registra() {
    if (!this.form.valid) {
      console.log('not valid');
    } else {
      this.backEnd$.postSonda(
        this.getFormControl('nomeSonda')?.value,
        this.getFormControl('username')?.value,
        this.getFormControl('password')?.value,
        this.getFormControl('latitudine')?.value,
        this.getFormControl('longitudine')?.value,
      ).then(r => {
        console.log(r)
        this.router.navigate(['/'])
      })
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

  getPassError() {
    if (this.getFormControl('conferma')?.hasError('required')) {
      return 'Il campo non può essere vuoto';
    }
    return '';
  }

  getSpanError() {
    if (
      this.getFormControl('conferma')?.value ===
      this.getFormControl('password')?.value
    ) {
      return '';
    }
    return 'Le password non corrispondono';
  }

}
