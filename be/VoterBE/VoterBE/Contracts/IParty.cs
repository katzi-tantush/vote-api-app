using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VoterBE.Contracts
{
    interface IParty
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ImageId { get; set; }
        public int Id { get; set; }
        public int VoteCount { get; set; }
    }
}
