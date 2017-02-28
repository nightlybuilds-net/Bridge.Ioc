using System;
using System.Collections.Generic;
using System.Linq;

namespace Bridge.Ioc
{
        public class TransientResolver<T> : IResolver
        {
            public Func<object> Resolve { get; set; }

            public TransientResolver(IIoc ioc)
            {
                this.Resolve = () =>
                {
                    var toresolveType = typeof(T);

                    // get ctor
                    var ctor = toresolveType.GetConstructors().FirstOrDefault();
                    if (ctor == null)
                        throw new Exception($"No ctor found for type {toresolveType.FullName}!");

                    // get ctor params
                    var ctorParams = ctor.GetParameters();
                    if (!ctorParams.Any())
                        return (T)Activator.CreateInstance(typeof(T));
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


}