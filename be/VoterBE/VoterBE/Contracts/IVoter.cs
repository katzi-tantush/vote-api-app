using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VoterBE.Contracts
{
    public interface IVoter
    {
        public string FName { get; set; }
        public string LName { get; set; }
        public int Id { get; set; }
        public string Gender { get; set; }
        public int PhoneNum { get; set; }
        public string Email { get; set; }
        public DateTime IdIssueDate { get; set; }
        public string City { get; set; }
        public string Role { get; set; }
    }
}
