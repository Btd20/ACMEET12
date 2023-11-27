using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Emails.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        //Foreign Key MeetingRoomId
        public string Title { get; set; }
        public string Problem { get; set; }
        public string? Answer { get; set; }
        public string? Admin { get; set; }
    }
}
