import { FormGroup, ValidatorFn, AbstractControlOptions, AsyncValidatorFn, FormControl, FormArray, AbstractControl } from "@angular/forms";

export class CustomFormGroup extends FormGroup {
    public isMandatoryControl: boolean = false;

    constructor(
        controls: {[key: string]: any},
        validatorOrOpts?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|null,
        asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null,
        isMandatory: boolean = false
    ) {
        super(controls, validatorOrOpts, asyncValidator);                  
        this.isMandatoryControl = isMandatory;
    }
    
}