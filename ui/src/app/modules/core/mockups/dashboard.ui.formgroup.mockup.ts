import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

export const DashboardFormGroupMockup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    os: new FormControl('1', Validators.required),
    message: new FormControl('', Validators.required),
    additional_fields: new FormArray([
        new FormGroup({
        key: new FormControl(''),
        value: new FormControl('')
        })      
    ]),
    launch_url: new FormControl('', Validators.required),
    owner_app: new FormControl('', Validators.required),
    receiver_apps: new FormArray([], []),
    selectedTemplate: new FormControl('-1', []),
});