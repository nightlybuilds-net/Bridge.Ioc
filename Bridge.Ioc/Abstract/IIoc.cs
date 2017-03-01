using System;

namespace Bridge.Ioc.Abstract
{
    public interface IIoc
    {
        void RegisterFunc<TType>(Func<TType> func);
        void Register<TType, TImplementation>() where TImplementation : class, TType;
        void RegisterSingleInstance<TType, TImplementation>() where TImplementation : class, TType;
        void RegisterInstance<TType>(TType instance);
        TType Resolve<TType>() where TType : class;
        object Resolve(Type type);
    }
}