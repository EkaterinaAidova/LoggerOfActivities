using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

using System.Web.Mvc;

namespace ActivityLogger.Models
{
    public class RegistrationModel
    {
        [Required(ErrorMessage = "Поле Email должно быть обязательно заполнено")]
        [Display(Name = "Адрес электронной почты")]
        [RegularExpression(@"^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$", ErrorMessage = "Невалидный адрес эелектронной почты")]
        [Remote("CheckEmail", "Account", ErrorMessage = "Пользователь с таким адроесом электронной почты уже существует")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Поле пароль должно быть обязательно заполнено")]
        [StringLength(18, ErrorMessage = "Пароль не может быть меньше 6 и больше 18 символов", MinimumLength = 6)]
        [RegularExpression(@"^[\w_]{6,18}$", ErrorMessage = "В пароле используются постронние символы. Подсказка: в пороле могут быть использованы буквы латинского алфавита (заглавные и строчные), цифры, _, -.")]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Поле подтверждения пароля должно быть обязательно заполнено")]
        [DataType(DataType.Password)]
        [Display(Name = "Подтвердите пароль")]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "пароли не совпадают")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Поле ФИО должно быть обязательно заполнено")]
        [Display(Name = "Фамилия Имя Отчество")]
        public string Name { get; set; }
    }
}