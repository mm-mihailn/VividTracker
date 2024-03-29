﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VividTracker.Data.Migrations
{
    public partial class AddedNewColumnInTrackingItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "MinValueType",
                table: "TrackingItems",
                type: "decimal(5,2)",
                precision: 5,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MaxValueType",
                table: "TrackingItems",
                type: "decimal(5,2)",
                precision: 5,
                scale: 2,
                nullable: true);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MinValueType",
                table: "TrackingItems");

            migrationBuilder.DropColumn(
                name: "MaxValueType",
                table: "TrackingItems");

        }
    }
}
