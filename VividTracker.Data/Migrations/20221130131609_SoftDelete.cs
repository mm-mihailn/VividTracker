using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VividTracker.Data.Migrations
{
    public partial class SoftDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b4166639-a9a8-4e55-84aa-739a77ef101f", "8de3e420-8028-4c1c-8652-d04892bcd322", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "IsDelete", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TenantId", "TwoFactorEnabled", "UserName" },
                values: new object[] { "d0e93f59-c19a-4767-ac05-d97ed5fd8837", 0, "2e1e3669-c2a8-4687-992e-d6090cf946e3", "admin@vividtracker.net", true, false, false, null, "John Smith", "ADMIN@VIVIDTRACKER.NET", "ADMIN@VIVIDTRACKER.NET", "AQAAAAEAACcQAAAAEL36VMzAAZ4n5cqTuw8zXL5KelyaZfG8bxpHvLtk9b0xOXSQpVk+ym7zoazpo1iCVQ==", "1234567890", false, "a32c20ea-39e3-4fe8-a87d-600d8a94bc2a", null, false, "admin@vividtracker.net" });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "b4166639-a9a8-4e55-84aa-739a77ef101f", "d0e93f59-c19a-4767-ac05-d97ed5fd8837" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "b4166639-a9a8-4e55-84aa-739a77ef101f", "d0e93f59-c19a-4767-ac05-d97ed5fd8837" });

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b4166639-a9a8-4e55-84aa-739a77ef101f");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "d0e93f59-c19a-4767-ac05-d97ed5fd8837");

            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Users");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4a02c4c7-a194-4132-b733-a0090bc91cc2", "e6d56812-46e4-40b8-bfcd-411d579bd48a", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TenantId", "TwoFactorEnabled", "UserName" },
                values: new object[] { "8f1fda19-72ec-446f-9119-fb73b1f4be55", 0, "51d6bd86-b9b7-459e-8491-6a458d78b1bd", "admin@vividtracker.net", true, false, null, "John Smith", "ADMIN@VIVIDTRACKER.NET", "ADMIN@VIVIDTRACKER.NET", "AQAAAAEAACcQAAAAEANslzroSitEW/uAX14uHE/Ssba/BagkTNWpNmyQWGxb+Aii6QMxHD0i08mzhxUbKw==", "1234567890", false, "3806bb4e-8ad6-4f19-8763-520687c5250f", null, false, "admin@vividtracker.net" });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "4a02c4c7-a194-4132-b733-a0090bc91cc2", "8f1fda19-72ec-446f-9119-fb73b1f4be55" });
        }
    }
}
