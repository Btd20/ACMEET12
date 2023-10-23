using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class Reserve
    {
        public int ReserveId { get; set; }

        //Foreign Key MeetingRoomId
        public int MeetingRoomId { get; set; }
        public DateTime ReserveDate { get; set; }


        [NotMapped] [JsonIgnore] public string[] Time { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

        //Foreign Key MeetingRoomId
        public string UserId { get; set; }
        public string hours { get; set; }
        public Reserve()
        {
            // Initialize the array inside the constructor
            Time = new string[]
            {
                "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
                "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
            };
        }
    }
}
