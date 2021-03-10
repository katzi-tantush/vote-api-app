using Microsoft.EntityFrameworkCore.Migrations;

namespace VoterBE.Migrations
{
    public partial class fullnameSplit_Voters_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FName",
                table: "Voters",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LName",
                table: "Voters",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FName",
                table: "Voters");

            migrationBuilder.DropColumn(
                name: "LName",
                table: "Voters");
        }
    }
}
