using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using VoterBE.Contracts;
using VoterBE.Model;

namespace VoterBE.Helpers
{
    public static class Factory
    {
        public static Voter GenVoter(IVoter voterValues)
        {
            var newVoter = new Voter()
            {
                FName = voterValues.FName,
                LName = voterValues.LName,
                Id = voterValues.Id,
                Gender = voterValues.Gender,
                PhoneNum = voterValues.PhoneNum,
                Email = voterValues.Email,
                IdIssueDate = voterValues.IdIssueDate,
                City = voterValues.City,
                Role = voterValues.Role
            };

            return newVoter;
        }

        public static string GenTokenString(IConfiguration config, Voter authorizedVoter)
        {
            SymmetricSecurityKey secretKey =
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                    config["jwtConfig:SecretKey"])
                    );

            SigningCredentials tokenCredentials =
                new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            Claim[] tokenClaims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, "clientClaims"),
                new Claim(ClaimTypes.Name, $"{authorizedVoter.FName} {authorizedVoter.LName}"),
                new Claim(ClaimTypes.Role, authorizedVoter.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            JwtSecurityToken tokenValues = new JwtSecurityToken(
                issuer: config["jwtConfig:Issuer"],
                audience: config["jwtConfig:Audience"],
                claims: tokenClaims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: tokenCredentials
                );

            string token = new JwtSecurityTokenHandler().WriteToken(tokenValues);

            return token;
        }
    }
}
