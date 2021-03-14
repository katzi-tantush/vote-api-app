import { AbstractControl, ValidatorFn } from "@angular/forms";
import * as moment from "moment";

// validates wether the control value is in DD/MM/YYYY format
export function dateValidator(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
        
        if (!(control && control.value))
            return { invalidDateFormat: 'Date must be supplied in the following format: DD/MM/YYYY' };
        
        // moment checks if the date format is as the date string argument it is passed        
        return moment(control.value,'DD/MM/YYYY', true).isValid() ?
            null :
            { invalidDateFormat: 'Date must be supplied in the following format: DD/MM/YYYY' };
    }
}
