using CSVParsing65.Data;
using CSVParsing65.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace CSVParsing65.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            Repository repo = new(_connectionString);
            return repo.GetPeople();
        }
        [HttpGet]
        [Route("generatepeople")]
        public IActionResult GeneratePeople(int amount)
        {
            Repository repo = new(_connectionString);
            List<Person> people = repo.GeneratePeople(amount);
            var csv = CSV.BuildPeopleCsv(people);
            return File(Encoding.UTF8.GetBytes(csv), "text/csv", "people.csv");
        }
        [HttpPost]
        [Route("upload")]
        public void Upload(UploadViewModel viewModel)
        {      
            string base64 = viewModel.Base64.Substring(viewModel.Base64.IndexOf(",") + 1);
            byte[] bytes = Convert.FromBase64String(base64);
            List<Person> people = CSV.GetCsvFromBytes(bytes);
            Repository repo = new(_connectionString);
            repo.UploadPeople(people);
        }
        [HttpPost]
        [Route("delete")]
        public void Delete()
        {
            Repository repo = new(_connectionString);
            repo.DeleteAll();
        }
    }
}
