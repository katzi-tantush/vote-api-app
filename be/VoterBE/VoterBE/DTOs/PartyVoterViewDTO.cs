using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VoterBE.Contracts
{
    public class PartyVoterViewDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ImageId { get; set; }
        public int Id { get; set; }
    }
}
