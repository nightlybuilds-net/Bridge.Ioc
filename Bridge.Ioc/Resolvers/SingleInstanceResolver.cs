using System;
using System.Collections.Generic;

namespace Bridge.Ioc
{
    public class SingleInstanceResolver : IResolver
    {
        private static Dictionary<Type, object> _singleInstances = new Dictionary<Type, object>();

        public Func<object> Resolve { get; private set; }

        public SingleInstanceResolver(IIoc ioc, Type type)
        {
            Resolve = () =>
            {
                object singleInstance;
                // first resolve. Using transient resolver
                if (!_singleInstances.TryGetValue(type, out singleInstance))
                {
                    var transientResolver = new TransientResolver(ioc, type);
                    singleInstance = transientResolver.Resolve();
                    _singleInstances.Add(type, singleInstance);
                }
                return singleInstance;
            };
        }
    }

    public class SingleInstanceResolver<T> : SingleInstanceResolver
    {

        public SingleInstanceResolver(IIoc ioc) : base(ioc, typeof(T))
        {
        }

    }
}