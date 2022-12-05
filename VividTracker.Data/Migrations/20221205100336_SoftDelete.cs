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
                keyValues: new object[] { "b4166639-a9a8-4e55-84aa-739a77ef101f", "d0e93f59-c19a-4767-ac05-d97ed5fd8837" });

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b4166639-a9a8-4e55-84aa-739a77ef101f");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "d0e93f59-c19a-4767-ac05-d97ed5fd8837");

            migrationBuilder.RenameColumn(
                name: "IsDelete",
                table: "Users",
                newName: "IsDeleted");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "600dec57-b2e2-4ec7-9e08-7e16ca63532f", "fd250967-5b5e-4cbe-9192-5e54e63bc4df", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "IsDeleted", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TenantId", "TwoFactorEnabled", "UserName" },
                values: new object[] { "0ae24a77-1055-4f38-84ca-a72a3d146794", 0, "376a08d4-e662-4214-b211-0ab9ebc5a8a6", "admin@vividtracker.net", true, false, false, null, "John Smith", "ADMIN@VIVIDTRACKER.NET", "ADMIN@VIVIDTRACKER.NET", "AQAAAAEAACcQAAAAECJI7fOFQCDD/VRBBTeYK9I1Osc6IZMif7Vb21rUR+ht7UIEqcNLSRcDIt4+/wXH/g==", "1234567890", false, "9d6d4953-cf26-4718-9de9-62adef74056d", null, false, "admin@vividtracker.net" });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "600dec57-b2e2-4ec7-9e08-7e16ca63532f", "0ae24a77-1055-4f38-84ca-a72a3d146794" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "600dec57-b2e2-4ec7-9e08-7e16ca63532f", "0ae24a77-1055-4f38-84ca-a72a3d146794" });

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "600dec57-b2e2-4ec7-9e08-7e16ca63532f");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "0ae24a77-1055-4f38-84ca-a72a3d146794");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Users",
                newName: "IsDelete");

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
    }
}
