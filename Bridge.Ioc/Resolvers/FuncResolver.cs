using System;
using Bridge.Ioc.Abstract;

namespace Bridge.Ioc.Resolvers
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