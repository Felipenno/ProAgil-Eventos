using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebApi.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage = "Campo Obrigatório")]
        [StringLength (100, MinimumLength = 5, ErrorMessage = "Local é entre 5 e 100 caracteres")]
        public string Local { get; set; }
        public string DataEvento { get; set; }
        
        [Required (ErrorMessage = "O Tema deve ser preenchido")]
        public string Tema { get; set; }

        [Range(20, 5000, ErrorMessage = "Quantidade de pessoas deve estar entre 20 e 5000" )]
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }

        public List<LoteDto> Lotes { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }
    }
}