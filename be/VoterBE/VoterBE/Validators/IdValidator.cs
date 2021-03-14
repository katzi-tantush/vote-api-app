using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VoterBE.Validators
{
    public class IdValidator: ValidationAttribute
    {
        public IdValidator()
        {
            ErrorMessage = "Id must be exactly 9 digits long";
        }

        public override bool IsValid(object value)
        {
            int digitCount = value.ToString().Length;
            return digitCount == 9;
        }
    }
}
