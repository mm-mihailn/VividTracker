using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;

namespace VividTracker.Areas.Identity.Pages.Account
{
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var client = new SmtpClient("smtp.mailtrap.io", 2525)
            {
                Credentials = new NetworkCredential("9c0941fbfd2382", "40ed75ce310914"),
                EnableSsl = true
            };
            MailMessage mailMessage = new MailMessage("VividTracker@gmail.com", $"{email}", $"{subject}", $"{htmlMessage}");
            mailMessage.IsBodyHtml = true;
            client.Send(mailMessage);
            return Task.CompletedTask;
        }
    }
}
