using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VoterBE.Contracts
{
    // I Realize that this really should be an interface: however I couldent use an interface directly in the controller
    public class Vote
    {
        public int PartyId { get; set; }
        public int VoterId { get; set; }
    }
}
