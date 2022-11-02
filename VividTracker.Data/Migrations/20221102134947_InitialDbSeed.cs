using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VividTracker.Data.Migrations
{
    public partial class InitialDbSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4a02c4c7-a194-4132-b733-a0090bc91cc2", "e6d56812-46e4-40b8-bfcd-411d579bd48a", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Tenants",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Mentormate" },
                    { 2, "HardSoft Inc." },
                    { 3, "Dream Corp" },
                    { 4, "PM Corse Racing Team" },
                    { 5, "Low Peak High School" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TenantId", "TwoFactorEnabled", "UserName" },
                values: new object[] { "8f1fda19-72ec-446f-9119-fb73b1f4be55", 0, "51d6bd86-b9b7-459e-8491-6a458d78b1bd", "admin@vividtracker.net", true, false, null, "John Smith", "ADMIN@VIVIDTRACKER.NET", "ADMIN@VIVIDTRACKER.NET", "AQAAAAEAACcQAAAAEANslzroSitEW/uAX14uHE/Ssba/BagkTNWpNmyQWGxb+Aii6QMxHD0i08mzhxUbKw==", "1234567890", false, "3806bb4e-8ad6-4f19-8763-520687c5250f", null, false, "admin@vividtracker.net" });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "4a02c4c7-a194-4132-b733-a0090bc91cc2", "8f1fda19-72ec-446f-9119-fb73b1f4be55" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Tenants",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tenants",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tenants",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Tenants",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Tenants",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "4a02c4c7-a194-4132-b733-a0090bc91cc2", "8f1fda19-72ec-446f-9119-fb73b1f4be55" });

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "4a02c4c7-a194-4132-b733-a0090bc91cc2");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "8f1fda19-72ec-446f-9119-fb73b1f4be55");
        }
    }
}
