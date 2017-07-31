using System;

namespace Bridge.Ioc
{
    public class SingleInstanceResolver<T> : IResolver
    {
        private static T _singleInstance;

        public Func<object> Resolve { get; set; }

        public SingleInstanceResolver(IIoc ioc)
        {
            this.Resolve = () =>
            {
                // first resolve. Using transient resolver
                if (_singleInstance == null)
                {
                    var transientResolver = new TransientResolver<T>(ioc);
                    _singleInstance = (T)transientResolver.Resolve();
                }

                return _singleInstance;
            };
        }

    }
}