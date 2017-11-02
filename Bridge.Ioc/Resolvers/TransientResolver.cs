using System;
using System.Collections.Generic;
using System.Linq;

namespace Bridge.Ioc
{
    public class TransientResolver : IResolver
    {
        public Func<object> Resolve { get; set; }

        public TransientResolver(IIoc ioc, Type toresolveType)
        {
            this.Resolve = () =>
            {
                // get ctor
                var ctor = toresolveType.GetConstructors().FirstOrDefault();
                if (ctor == null)
                    throw new Exception($"No ctor found for type {toresolveType.FullName}!");

                // get ctor params
                var ctorParams = ctor.GetParameters();
                if (!ctorParams.Any())
                    return Activator.CreateInstance(toresolveType);
                else
                {
                    // recursive resolve
                    var parameters = new List<object>(ctorParams.Length);

                    foreach (var parameterInfo in ctorParams)
                        parameters.Add(ioc.Resolve(parameterInfo.ParameterType));

                    return ctor.Invoke(parameters.ToArray());
                }
            };
        }
    }

    public class TransientResolver<T> : TransientResolver
    {

        public TransientResolver(IIoc ioc) : base(ioc, typeof(T))
        {

        }
    }

}