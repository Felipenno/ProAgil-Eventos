using System.Threading.Tasks;
using ProAgil.Dominio;

namespace ProAgil.Repositorio
{
    public interface IProAgilRepositorio
    {
         void Add<T>(T entity) where T: class;
         void Update<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         void DeleteRange<T>(T[] entity) where T : class;
         Task<bool> SaveChangesAsync();

         Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrante);
         Task<Evento[]> GetAllEventoAsync(bool includePalestrante);
         Task<Evento> GetEventoAsyncById(int EventoId, bool includePalestrante);

         Task<Palestrante[]> GetAllPalestranteAsyncByName( string name, bool includeEventos);
         Task<Palestrante> GetPalestranteAsync(int PalestranteId, bool includeEventos);
    }
}