import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class RegisterPageForm {

    private formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    createForm() : FormGroup {
        let form =  this.formBuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
        });

        form.get('confirmPassword').setValidators(checkPasswordMatch(form));
        
        return form;
    } 

}

function checkPasswordMatch(form: FormGroup): ValidatorFn {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    const validator = () => {
        return password.value === confirmPassword.value ? null : {isntMatching: true}
    };
    return validator;  
}