using System.ComponentModel.DataAnnotations;

namespace ActivityLogger.Models
{
    public class AuthorizationModel
    {
        [Required]
        [Display(Name = "Адрес электронной почты")]
        [RegularExpression(@"^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$", ErrorMessage = "Невалидный адрес электронной почты")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        [StringLength(18, ErrorMessage = "Неверная длина пароля", MinimumLength = 6)]
        public string Password { get; set; }

        [Display(Name = "Запомнить")]
        public bool RememberMe { get; set; }
    }
}