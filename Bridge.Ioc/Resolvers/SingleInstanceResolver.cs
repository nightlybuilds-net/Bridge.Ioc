using System;

namespace Bridge.Ioc
{
    public class SingleInstanceResolver : IResolver
    {
        private object _singleInstance;

        public Func<object> Resolve { get; private set; }

        public SingleInstanceResolver(IIoc ioc, Type type)
        {
            Resolve = () =>
            {
                // first resolve. Using transient resolver
                if (_singleInstance == null)
                {
                    var transientResolver = new TransientResolver(ioc, type);
                    _singleInstance = transientResolver.Resolve();
                }

                return _singleInstance;
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