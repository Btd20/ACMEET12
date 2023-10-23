using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Users.Migrations
{
    /// <inheritdoc />
    public partial class limpieza : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Users",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
