using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VoterBE.Validators;

namespace VoterBE.Contracts
{
    public class LoginRequest
    {
        public int Id { get; set; }
        public DateTime IdIssueDate { get; set; }
    }
}
