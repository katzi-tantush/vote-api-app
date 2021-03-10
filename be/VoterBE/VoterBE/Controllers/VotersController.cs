using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VoterBE.Contracts;
using VoterBE.Extentions;
using VoterBE.Helpers;
using VoterBE.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VoterBE.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VotersController : ControllerBase
    {
        VoteContext VoterDb;
        IConfiguration Config;

        public VotersController(IConfiguration config)
        {
            VoterDb = new VoteContext();
            Config = config;
        }

        // GET: api/<VoterController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(VoterDb.Voters);
        }

        // GET api/<VoterController>/5
        // TODO: do i need this?
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var voter = await VoterDb.Voters.FindAsync(id);
            if (voter == null)
            {
                return NotFound();
            }
            return Ok(voter);
        }

        // POST api/<VoterController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Voter newVoter)
        {
            try
            {
                await VoterDb.Voters.AddAsync(newVoter);
                await VoterDb.SaveChangesAsync();
                return Ok(newVoter);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> GetToken([FromBody] IVoter requestingVoter)
        {
            IActionResult response = Unauthorized();
            var existingVoter = await VoterDb.Voters.FindAsync(requestingVoter.Id);

            if (existingVoter != null &&
                requestingVoter.IdIssueDate == requestingVoter.IdIssueDate)
            {
                try
                {
                    var token = Factory.GenTokenString(Config, existingVoter);
                    // TODO: add an interface?
                    response = Ok(new { responseToken = token, vote = requestingVoter });
                }
                catch (Exception e)
                {
                    response = StatusCode(500, e);
                }
                return response;
            }

            return response;
        }

        // PUT api/<VoterController>/5
        //[HttpPut("{id}")]
        //public void Put(int id)
        //{

        //}

        //// DELETE api/<VoterController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
