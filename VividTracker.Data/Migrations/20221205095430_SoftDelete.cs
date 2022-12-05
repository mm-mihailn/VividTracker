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
                values: new object[] { "87df1b20-a697-4982-b41d-b8a3e0443220", "22e57268-1e87-492b-a88a-7714a197bbcf", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "IsDeleted", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TenantId", "TwoFactorEnabled", "UserName" },
                values: new object[] { "a597272e-481d-4142-bfab-30174106a598", 0, "80d6add5-cc16-4fe4-a122-87d49fa78557", "admin@vividtracker.net", true, false, false, null, "John Smith", "ADMIN@VIVIDTRACKER.NET", "ADMIN@VIVIDTRACKER.NET", "AQAAAAEAACcQAAAAEG7WY3jDJ0rf/A50jh+xWnWWuo0lSSztGYvN0DCeg62xnxPzqMik9GI7xuap40hgVw==", "1234567890", false, "27f41efe-7ab4-41ce-be90-4c1c1c931095", null, false, "admin@vividtracker.net" });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "87df1b20-a697-4982-b41d-b8a3e0443220", "a597272e-481d-4142-bfab-30174106a598" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "87df1b20-a697-4982-b41d-b8a3e0443220", "a597272e-481d-4142-bfab-30174106a598" });

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "87df1b20-a697-4982-b41d-b8a3e0443220");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "a597272e-481d-4142-bfab-30174106a598");

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
