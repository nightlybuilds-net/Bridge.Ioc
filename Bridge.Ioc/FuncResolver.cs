using System;

namespace Bridge.Ioc
{
    public class FuncResolver<T> : IResolver
    {
        public Func<object> Resolve { get; set; }

        public FuncResolver(Func<T> resolveFunc)
        {
            this.Resolve = () => resolveFunc();
        }

    }

}