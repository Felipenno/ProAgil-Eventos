using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace ProAgil.Dominio.Identity
{
    public class Role : IdentityRole<int>
    {   
         public List<UserRole> UserRoles { get; set; }
    }
}