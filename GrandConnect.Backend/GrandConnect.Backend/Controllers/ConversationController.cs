using Microsoft.AspNetCore.Mvc;

namespace GrandConnect.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversationController : ControllerBase
    {
        private static readonly string[] Starters = new[]
        {
            "What’s your favorite childhood memory?",
            "What hobby have you always wanted to try?",
            "What’s the best advice you’ve ever received?",
            "Which old movie do you love?",
            "What’s your favorite food from childhood?"
        };

        [HttpGet("starter")]
        public IActionResult GetRandomStarter()
        {
            var rnd = new Random();
            var pick = Starters[rnd.Next(Starters.Length)];
            return Ok(new { question = pick });
        }
    }
}
