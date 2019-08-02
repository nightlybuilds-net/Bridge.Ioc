namespace Bridge.EasyTests.Exceptions
{
    public class ThrowsException : EasyTestBaseException
    {
        public ThrowsException(string message) : base(message)
        {
        }
    }
}