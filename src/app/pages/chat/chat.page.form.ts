import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ChatPageForm {

    private formBuilder: FormBuilder;

    
    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    createForm() : FormGroup {
        let form =  this.formBuilder.group({
            content: ['', [Validators.required]]
        });
        return form;
    }

}