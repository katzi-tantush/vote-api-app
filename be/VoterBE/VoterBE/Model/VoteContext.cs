using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace VoterBE.Model
{
    public partial class VoteContext : DbContext
    {
        public VoteContext()
        {
        }

        public VoteContext(DbContextOptions<VoteContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Party> Parties { get; set; }
        public virtual DbSet<Voter> Voters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Data Source=desktop-erbrhmc\\sqlexpress;Initial Catalog=vote;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Hebrew_CI_AS");

            modelBuilder.Entity<Party>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });
            
            modelBuilder.Entity<Voter>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
