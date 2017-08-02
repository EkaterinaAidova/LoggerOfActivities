using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

using System.Web.Mvc;

namespace ActivityLogger.BusinessLogic.DataTransferObjects
{
    public class RegistrationModel
    {
        [Required(ErrorMessage = "Поле Email должно быть обязательно заполнено")]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Адрес электронной почты")]
        [Remote("CheckEmail", "Account", ErrorMessage = "Пользователь с таким адроесом электронной почты уже существует")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Поле пароль должно быть обязательно заполнено")]
        [StringLength(100, ErrorMessage = "Пароль не может быть меньше 6 и больше 100 символов", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Поле подтверждения пароля должно быть обязательно заполнено")]
        [DataType(DataType.Password)]
        [Display(Name = "Подтвердите пароль")]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "пароли не совпадают")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Поле ФИО должно быть обязательно заполнено")]
        [Display(Name = "ФИО")]
        public string Name { get; set; }
    }
}