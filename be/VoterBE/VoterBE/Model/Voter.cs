using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using VoterBE.Helpers;
using VoterBE.Validators;

#nullable disable

namespace VoterBE.Model
{
    [Keyless]
    public partial class Voter
        //: IDataModel, IVoter
    {
        [Key]
        [Required]
        [IdValidator]
        public int Id { get; set; }
        [StringLength(20)]
        public string FName { get; set; }
        [StringLength(20)]
        public string LName { get; set; }
        public string Gender { get; set; }
        public int PhoneNum { get; set; }
        [StringLength(50)]
        [EmailAddress]
        public string Email { get; set; }
        [Column(TypeName = "date")]
        [Required]
        public DateTime IdIssueDate { get; set; }
        [StringLength(50)]
        public string City { get; set; }
        public string Role { get; set; }
        public bool Voted { get; set; }
    }
}
