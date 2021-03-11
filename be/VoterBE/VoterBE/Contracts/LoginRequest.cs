using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VoterBE.Contracts
{
    public class LoginRequest
    {
        public int Id { get; set; }
        public DateTime IdIssueDate { get; set; }
    }
}
