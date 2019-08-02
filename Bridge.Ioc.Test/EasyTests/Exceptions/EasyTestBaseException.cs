using System;

namespace Bridge.EasyTests.Exceptions
{
    public class EasyTestBaseException : Exception
    {
        public EasyTestBaseException(string message) : base(message) 
        {
        }
    }
}