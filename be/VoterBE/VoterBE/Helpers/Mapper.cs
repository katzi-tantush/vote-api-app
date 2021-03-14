using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VoterBE.Model;
using VoterBE.Contracts;

namespace VoterBE.Helpers
{
    public static class Mapper
    {
        public static PartyVoterViewDTO PartyToVoterView(Party party)
        {
            PartyVoterViewDTO partyVoterView = new PartyVoterViewDTO()
            {
                Id = party.Id,
                Name = party.Name,
                ImageId = party.ImageId,
                Description = party.Description
            };
            return partyVoterView;
        }
    }
}
