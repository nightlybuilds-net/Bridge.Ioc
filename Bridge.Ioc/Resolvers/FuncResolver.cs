using System;

namespace Bridge.Ioc
{
    public class FuncResolver<T> : IResolver
    {
        public Func<object> Resolve { get; private set; }

        public FuncResolver(Func<T> resolveFunc)
        {
            Resolve = () => resolveFunc();
        }
    }
}