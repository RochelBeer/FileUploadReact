using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSVParsing65.Data
{
    public class Repository
    {
        private readonly string _connectionString;
        public Repository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person> GetPeople()
        {
            using var context = new Context(_connectionString);
            return context.People.ToList();
        }
        public List<Person> GeneratePeople(int amount)
        {
            return Enumerable.Range(1, amount).Select(_ => new Person
            {
                FirstName = Faker.Name.First(),
                LastName = Faker.Name.Last(),
                Age = Faker.RandomNumber.Next(20, 100),
                Address = Faker.Address.StreetAddress(),
                Email = Faker.Internet.Email()

            }).ToList();
        }
        public void UploadPeople(List<Person> people)
        {
            using var context = new Context(_connectionString);
            context.AddRange(people);
            context.SaveChanges();
        }
        public void DeleteAll()
        {
            using var context = new Context(_connectionString);
            List<Person> people = GetPeople();
            context.People.RemoveRange(people);
            context.SaveChanges();
        }
    }
}
