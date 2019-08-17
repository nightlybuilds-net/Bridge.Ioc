using System;
using System.Collections.Generic;
using System.Linq;

namespace Bridge.Ioc
{
    public class TransientResolver : IResolver
    {
        private static Stack<Type> resolved = new Stack<Type>();
        private static HashSet<Type> resolving = new HashSet<Type>();

        public Func<object> Resolve { get; private set; }

        public TransientResolver(IIoc ioc, Type toresolveType)
        {
            Resolve = () =>
            {
                // get ctor
                var ctor = toresolveType.GetConstructors().FirstOrDefault();
                if (ctor == null)
                    throw new Exception($"No ctor found for type {toresolveType.FullName}!");

                resolved.Push(toresolveType);
                if (!resolving.Add(toresolveType))
                {
                    var message = $"Recursive error in type resolving {toresolveType.FullName}! \n {string.Join(" -> ", resolved.Reverse().Select(a => a.FullName))}";
                    resolved.Pop();
                    throw new Exception(message);
                }

                try
                {
                    // get ctor params
                    var ctorParams = ctor.GetParameters();
                    if (!ctorParams.Any())
                        return Activator.CreateInstance(toresolveType);
                    else
                    {
                        // recursive resolve
                        var parameters = new List<object>(ctorParams.Length);

                        foreach (var parameterInfo in ctorParams)
                        {
                            parameters.Add(ioc.Resolve(parameterInfo.ParameterType));
                        }

                        return ctor.Invoke(parameters.ToArray());
                    }
                }
                finally
                {
                    resolved.Pop();
                    resolving.Remove(toresolveType);
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