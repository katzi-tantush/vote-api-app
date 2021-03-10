using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public IActionResult Get()
        {
            return Ok(VoterDb.Parties);
        }

        //// GET api/<PartyController>/5
        [HttpGet("{id}")]
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
        [HttpPut("vote/{id}")]
        public async Task<IActionResult> Put(int id)
        {
            //TODO: add logic that verifies that a user has voted once only!
            var party = await VoterDb.Parties.FindAsync(id);
            if (party == null)
            {
                return NotFound();
            }

            party.VoteCount += 1;
            VoterDb.Parties.Attach(party);
            VoterDb.Entry(party).Property(p => p.VoteCount).IsModified = true;

            try
            {
                await VoterDb.SaveChangesAsync();
                return Ok(party);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
