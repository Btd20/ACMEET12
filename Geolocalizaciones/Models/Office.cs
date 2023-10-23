namespace Backend.Models
{
    public class Office
    {
        public int OfficeId { get; set; }
        public string NameOffice { get; set; }

        //Foreign Key City
        public int CityId { get; set; }
    }
}
