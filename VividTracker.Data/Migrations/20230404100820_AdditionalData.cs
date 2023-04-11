using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VividTracker.Data.Migrations
{
    public partial class AdditionalData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "TrackingGroups",
                columns: new[] { "Id", "Label", "Name", "TenantId" },
                values: new object[,]
                {
                    { 1, "Work", "DB Department", 2 },
                    { 2, "Backend", ".NET Backend", 2 }
                });

            migrationBuilder.InsertData(
                table: "TrackingItems",
                columns: new[] { "Id", "DefaultValue", "IrrelevantAllowed", "IrrelevantColor", "MandatoryComment", "MaxValueColor", "MaxValueType", "MinValueColor", "MinValueType", "Name", "Target", "TenantId", "Type" },
                values: new object[,]
                {
                    { 1, 10m, true, "#FFFFF", false, "#FFFFF", 1m, "#FFFFF", 0m, "Code coverage", 20m, 2, 0 },
                    { 2, 69m, true, "#FFFFF", false, "#FFFFF", 1m, "#FFFFF", 0m, "Branch Strategy", 100m, 2, 0 }
                });

            migrationBuilder.InsertData(
                table: "TrackingGroupRecords",
                columns: new[] { "Id", "Disabled", "Name", "ParentId", "TrackingGroupId" },
                values: new object[,]
                {
                    { 1, false, "VividTracker", null, 1 },
                    { 2, false, "Google", null, 2 }
                });

            migrationBuilder.InsertData(
                table: "TrackingGroupTrackingItems",
                columns: new[] { "TrackingGroupId", "TrackingItemId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 }
                });

            migrationBuilder.InsertData(
                table: "TrackingItemsValues",
                columns: new[] { "Id", "TimeStamp", "TrackingGroupRecordId", "TrackingItemId", "Value" },
                values: new object[] { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1, 15m });

            migrationBuilder.InsertData(
                table: "TrackingItemsValues",
                columns: new[] { "Id", "TimeStamp", "TrackingGroupRecordId", "TrackingItemId", "Value" },
                values: new object[] { 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 2, 69m });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TrackingGroupTrackingItems",
                keyColumns: new[] { "TrackingGroupId", "TrackingItemId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "TrackingGroupTrackingItems",
                keyColumns: new[] { "TrackingGroupId", "TrackingItemId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "TrackingItemsValues",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TrackingItemsValues",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TrackingGroupRecords",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TrackingGroupRecords",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TrackingItems",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TrackingItems",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "46c4287e-1b0c-411d-8c29-1daba308bdc8");

            migrationBuilder.DeleteData(
                table: "TrackingGroups",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TrackingGroups",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
