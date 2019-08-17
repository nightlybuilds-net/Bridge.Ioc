using System;

namespace Bridge.Ioc
{
    public class InstanceResolver : IResolver
    {
        public Func<object> Resolve { get; private set; }

        public InstanceResolver(object resolvedObj)
        {
            Resolve = () => resolvedObj;
        }
    }

    public class InstanceResolver<T> : InstanceResolver
    {

        public InstanceResolver(T resolvedObj) : base(resolvedObj)
        {

        }
    }
}