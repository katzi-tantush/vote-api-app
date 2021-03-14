using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using VoterBE.Helpers;

#nullable disable

namespace VoterBE.Model
{
    public partial class Party
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        public string Description { get; set; }
        [Column("ImageID")]
        public int? ImageId { get; set; }
        [Key]
        [Column("ID")]
        public int Id { get; set; }
        public int VoteCount { get; set; }
    }
}
