namespace ActivityLogger.Models.Repositories.Contracts
{
     public interface IAutorizationRepository
    {
        Autorization Get(string login, string password);
        void Update(Autorization autorisation);
    }
}
