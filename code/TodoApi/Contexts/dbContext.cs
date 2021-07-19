using System;
using Microsoft.EntityFrameworkCore;
// using MySql.EntityFrameworkCore;
// using MySQL.EntityFrameworkCore.Extensions;
// using MySQL.Data.EntityFrameworkCore;
using TodoApi.Models;
using Models;

namespace TodoApi.Contexts
{
  public class TodoContext : DbContext
  {
    public TodoContext() { }
    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TodoItem> TodoItems { get; set; }
    public virtual DbSet<User> Users { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      //optionsBuilder.UseMySQL("server=localhost;database=Project;user=myuser;password=mypass");
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<TodoItem>(entity =>
      {
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Name);
        entity.Property(e => e.IsComplete);

      });

    }
  }




}