using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VoterBE.Contracts;
using VoterBE.Helpers;
using VoterBE.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VoterBE.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PartiesController : ControllerBase
    {
        VoteContext VoterDb = new VoteContext();

        // GET: api/<PartyController>
        [HttpGet]
        //[Authorize(Roles = "Admin")]
        public IActionResult Get()
        {
            return Ok(VoterDb.Parties);
        }

        [HttpGet("voter-view")]
        public IActionResult GetVoterView()
        {
            var parties = VoterDb.Parties;
            try
            {
                var partyVoterViews = parties.Select(p => Mapper.PartyToVoterView(p));
                return Ok(partyVoterViews);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        //// GET api/<PartyController>/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get(int id)
        {
            var party = await VoterDb.Parties.FindAsync(id);
            if (party == null)
            {
                return NotFound();
            }
            return Ok(party);
        }

        // PUT api/<PartyController>/5
        [HttpPut("vote")]
        //[Authorize(Roles = "Voter")]
        public async Task<IActionResult> Put([FromBody] Vote vote)
        {
            var voter = await VoterDb.Voters.FindAsync(vote.VoterId);

            if (voter == null)
            {
                return NotFound("A Voter with matching id could not be found");
            }
            if (voter.Voted == true)
            {
                return Unauthorized($"Voter {voter.Id} has already cast his/her ballot");
            }

            var party = await VoterDb.Parties.FindAsync(vote.PartyId);
            if (party == null)
            {
                return NotFound("A Party with matching id could not be found");
            }
            // add party vote count
            party.VoteCount += 1;
            VoterDb.Parties.Attach(party);
            VoterDb.Entry(party).Property(p => p.VoteCount).IsModified = true;

            // change voter voted bool
            voter.Voted = true;
            VoterDb.Voters.Attach(voter);
            VoterDb.Entry(voter).Property(v => v.Voted).IsModified = true;

            try
            {
                await VoterDb.SaveChangesAsync();
                return Ok(voter);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
