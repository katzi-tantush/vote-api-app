using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VoterBE.Helpers;
using VoterBE.Model;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using VoterBE.Contracts;

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
        [HttpGet("{id}")]
        public IActionResult Get()
        {
            return Ok(VoterDb.Voters);
        }

        // GET api/<VoterController>/5
        // TODO: do i need this?
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
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

                using (var connection = VoterDb.Database.GetDbConnection())
                {
                    await connection.OpenAsync();
                    await VoterDb.Database.ExecuteSqlRawAsync($"SET IDENTITY_INSERT [dbo].[Voters] ON");
                    await VoterDb.SaveChangesAsync();
                    await VoterDb.Database.ExecuteSqlRawAsync($"SET IDENTITY_INSERT [dbo].[Voters] OFF");
                }

                return Ok(newVoter);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> GetToken([FromBody] LoginRequest loginRequest)
        {
            var existingVoter = await VoterDb.Voters.FindAsync(loginRequest.Id);

            if (existingVoter != null &&
                loginRequest.IdIssueDate == loginRequest.IdIssueDate)
            {
                try
                {
                    var token = Utils.GenTokenString(Config, existingVoter);

                    return Ok(new { responseToken = token, voter = existingVoter });
                }
                catch (Exception e)
                {
                    return StatusCode(500, e);
                }
            }
            return Unauthorized();
        }

    }
}
