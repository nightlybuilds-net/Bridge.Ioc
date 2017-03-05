using System;
using Bridge.Ioc.Abstract;

namespace Bridge.Ioc.Resolvers
{
    public class InstanceResolver<T> : IResolver
    {
        public Func<object> Resolve { get; set; }

        public InstanceResolver(T resolvedObj)
        {
            this.Resolve = () => resolvedObj;
        }
    }
}