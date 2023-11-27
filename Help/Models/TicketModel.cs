namespace Ticket.Models
{
    public class TicketModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Status { get; set; }
        public string Problem { get; set; }
        public string? Answer { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
        public string? Admin { get; set; }
    }
}