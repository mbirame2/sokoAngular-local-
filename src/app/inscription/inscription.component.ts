import { SokoService } from './../soko.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// import custom validator to validate that password and confirm password fields match

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  loginUserData = {}
  registerForm: FormGroup;
    submitted = false;
    phoneNumber = "^(\+\d{1,3}[- ]?)?\d{10}$";
    constructor(private formBuilder: FormBuilder,private _auth: SokoService) { }

    
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            numtel: ['', Validators.required ],
            firstName: ['', Validators.required],
            adresse: ['', Validators.required],
            lastName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        } ,{
          validator: this.MustMatch('password', 'confirmPassword')
      }
        );
      //  console.log(this.registerForm.value)
    }

    // convenience getter for easy access to form fields
inscrire(){
  console.log(this.registerForm.value)
  this._auth.inscripion(this.registerForm.value).subscribe(
    res => {console.log(res);
        
      Swal.fire(
    
        {
         // position: 'top-end',
          icon: 'success',
          title: 'Inscription reussie',
          text: 'Veillez vous rendre en haut à droite du menu pour vous connectez',
          showConfirmButton: true,

        }
       )
       
    
   },err=>{console.log(err);
    Swal.fire(
    
      {
       // position: 'top-end',
        icon: 'error',
        title: 'Echec inscription',
        text: 'Veillez verifier à nouveau les champs saisies',
        showConfirmButton: false,

      }
     )

  })

}

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        console.log(this.registerForm.value)

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    MustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
  
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // return if another validator has already found an error on the matchingControl
              return;
          }
  
          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
      }
  }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

}
