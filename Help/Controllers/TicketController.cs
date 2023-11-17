using Microsoft.AspNetCore.Mvc;

namespace Ticket.Controllers
{
    [Route("api/tickets")]
    public class TicketsController : ControllerBase
    {
        [HttpPost]
        public ActionResult CreateTicket(TicketsController ticket)
        {
            _questionsRepository.Add(ticket);
            _questionsRepository.SaveChanges();

            return Ok();
        }
    }

    [Route("api/questions")]
    public class QuestionsListController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetQuestions()
        {
            return Ok(_questionsRepository.GetAll());
        }
    }

    [Route("api/questions/{id}")]
    public class QuestionController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetQuestion(int id)
        {
            return Ok(_questionsRepository.GetById(id));
        }
    }

    [Route("api/questions/{id}/answer")]
    public class AnswerController : ControllerBase
    {
        [HttpPost]
        public ActionResult CreateAnswer(int id, AnswerController answer)
        {
            var question = _questionsRepository.GetById(id);
            question.Answers.Add(answer);
            _questionsRepository.SaveChanges();

            return Ok();
        }
    }
}
