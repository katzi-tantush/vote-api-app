import { AbstractControl, ValidatorFn } from "@angular/forms";

// validates wether the control value is in DD/MM/YYYY format
export function charCountValidator(charCount:number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        
        if (!(control && control.value))
            return { invalidIdFormat: `must be ${charCount} characters long` };
        
        let valueDigitCount = (control.value as string).length;

        return (valueDigitCount == charCount) ?
            null :
            { invalidDateFormat: `must be ${charCount} characters long` };
    }
}