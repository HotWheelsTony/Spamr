import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class ComposePageForm {

    private formBuilder: FormBuilder;

    
    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    createForm() : FormGroup {
        let form =  this.formBuilder.group({
            room: ['', [Validators.required]],
        });
        
        return form;
    }

}