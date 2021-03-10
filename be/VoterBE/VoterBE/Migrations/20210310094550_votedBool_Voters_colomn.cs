using Microsoft.EntityFrameworkCore.Migrations;

namespace VoterBE.Migrations
{
    public partial class votedBool_Voters_colomn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Voted",
                table: "Voters",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Voted",
                table: "Voters");
        }
    }
}
