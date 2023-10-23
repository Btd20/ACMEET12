using System.ComponentModel.DataAnnotations;

namespace Users.Models
{
    public class ChangePassword
    {
        
        [Display(Name = "Contraseña actual")]
        public string ContraseñaActual { get; set; }

        [Display(Name = "Nueva contraseña")]
        public string NuevaContraseña { get; set; }

        
        [DataType(DataType.Password)]
        [Display(Name = "Confirmar nueva contraseña")]
        [Compare("NuevaContraseña", ErrorMessage = "Las contraseñas no coinciden.")]
        public string ConfirmarNuevaContraseña { get; set; }

    }
}
