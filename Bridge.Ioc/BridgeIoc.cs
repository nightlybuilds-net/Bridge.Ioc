using System;
using System.Collections.Generic;
using Bridge.Ioc.Abstract;
using Bridge.Ioc.Resolvers;

namespace Bridge.Ioc
{
        public class BridgeIoc : IIoc
        {
            private readonly Dictionary<Type, IResolver> _resolvers = new Dictionary<Type, IResolver>();

            public void Register<TType, TImplementation>() where TImplementation : class, TType
            {
                CheckAlreadyAdded<TType>();

                var resolver = new TransientResolver<TImplementation>(this);
                _resolvers.Add(typeof(TType), resolver);
            }

            public void RegisterSingleInstance<TType, TImplementation>() where TImplementation : class, TType
            {
                CheckAlreadyAdded<TType>();

                var resolver = new SingleInstanceResolver<TImplementation>(this);
                _resolvers.Add(typeof(TType), resolver);
            }

            public void RegisterFunc<TType>(Func<TType> func)
            {
                CheckAlreadyAdded<TType>();

                var resolver = new FuncResolver<TType>(func);
                _resolvers.Add(typeof(TType), resolver);
            }

            public void RegisterInstance<TType>(TType instance)
            {
                CheckAlreadyAdded<TType>();

                var resolver = new InstanceResolver<TType>(instance);
                _resolvers.Add(typeof(TType), resolver);
            }



            public TType Resolve<TType>() where TType : class
            {
                CheckNotRegistered<TType>();

                var resolver = _resolvers[typeof(TType)];
                return (TType)resolver.Resolve();
            }

            public object Resolve(Type type)
            {
                CheckNotRegistered(type);

                var resolver = _resolvers[type];
                return resolver.Resolve();
            }

            private void CheckAlreadyAdded<TType>()
            {
                if (_resolvers.ContainsKey(typeof(TType)))
                    throw new Exception($"{typeof(TType).FullName} is already registered!");
            }

            private void CheckNotRegistered(Type type)
            {
                if (!_resolvers.ContainsKey(type))
                    throw new Exception($"Cannot resolve {type.FullName}, it's not registered!");
            }

            private void CheckNotRegistered<TType>()
            {
                CheckNotRegistered(typeof(TType));
            }
        }


}