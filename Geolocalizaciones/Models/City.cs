using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class City
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        
        //Foreign Key
        public int CountryId { get; set; }

    }
}
