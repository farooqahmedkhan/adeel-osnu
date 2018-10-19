import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { CustomFormGroup } from "src/app/modules/core/custom_controls/CustomFormGroup.control";

export const DashboardFormGroupMockup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    os: new FormControl('1', Validators.required),
    notification_delivery: new FormControl(''),
    message: new FormControl('', Validators.required),
    additional_fields: new FormArray([
        new CustomFormGroup({ key: new FormControl('app-name'), value: new FormControl('')}, null, null, true)
    ]),    
    owner_app: new FormControl('', Validators.required),
    receiver_apps: new FormArray([], []),
    selectedTemplate: new FormControl('-1', []),
    big_picture: new FormControl('')
});

export const TemplateDetailFormGroupMockup: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    os: new FormControl('1', Validators.required),
    message: new FormControl('', Validators.required),
    additional_fields: new FormArray([
        new CustomFormGroup({ key: new FormControl('app-name'), value: new FormControl('')}, null, null, true)
    ]),
    // launch_url: new FormControl('', Validators.required)
    big_picture: new FormControl('')
});

export const TemplateEditFormGroupMockup: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    os: new FormControl('1', Validators.required),
    message: new FormControl('', Validators.required),
    additional_fields: new FormArray([
        // new CustomFormGroup({ key: new FormControl('app-name'), value: new FormControl('')}, null, null, true)
    ]),
    // launch_url: new FormControl('', Validators.required)
    big_picture: new FormControl('')
});

export const IOSMandatoryFormGroups = [
    new CustomFormGroup({ key: new FormControl('app-id'), value: new FormControl('')}, null, null, true),
    new CustomFormGroup({ key: new FormControl('app-icon'), value: new FormControl('')}, null, null, true),
    new CustomFormGroup({ key: new FormControl('app-image'), value: new FormControl('')}, null, null, true),
    new CustomFormGroup({ key: new FormControl('app-name'), value: new FormControl('')}, null, null, true),
    new CustomFormGroup({ key: new FormControl('app-url'), value: new FormControl('')}, null, null, true)
];

export const AndroidMandatoryFormGroups = [    
    new CustomFormGroup({ key: new FormControl('app-name'), value: new FormControl('')}, null, null, true)
];  

export const ApplicationDetailFormGroupMockup = new FormGroup({
    name: new FormControl('', Validators.required),
    os: new FormControl('1', Validators.required),
    one_signal_key: new FormControl('', Validators.required),
    one_signal_rest_api_key: new FormControl('', Validators.required)    
});