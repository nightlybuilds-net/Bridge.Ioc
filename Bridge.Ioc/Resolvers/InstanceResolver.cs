using System;

namespace Bridge.Ioc
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