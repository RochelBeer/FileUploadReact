using System.Collections.Generic;
using System;
using Microsoft.EntityFrameworkCore;

namespace CSVParsing65.Data
{
    public class Context:DbContext
    {
        private readonly string _connectionString;
        public Context(string connectionString)
        {
            _connectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        public DbSet<Person> People { get; set; }
    }
}