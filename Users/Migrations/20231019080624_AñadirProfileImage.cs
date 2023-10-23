using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Users.Migrations
{
    /// <inheritdoc />
    public partial class AñadirProfileImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProfileImage",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ImageId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    imagePath = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProfileImage_AppUsers_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProfileImage");
        }
    }
}
