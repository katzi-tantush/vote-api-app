import { AbstractControl, ValidatorFn } from "@angular/forms";

// validates wether the control value is in DD/MM/YYYY format
export function nubmberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        
        if (!(control && control.value))
            return { invalidIdFormat: 'Id must be a number' };
        
        let isNumber = !isNaN(control.value);

        return (isNumber) ?
            null :
            { invalidDateFormat: 'Id must be a number' };
    }
}