using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ActivityLogger.BusinessLogic.DataTransferObjects
{
    public class AuthorizationModel
    {
        [Required]
        [Display(Name = "Адрес электронной почты")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Display(Name = "Запомнить")]
        public bool RememberMe { get; set; }
    }
}