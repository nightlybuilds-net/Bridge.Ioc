using System;

namespace Bridge.Ioc
{
    public interface IIoc
    {
        void RegisterFunc<TType>(Func<TType> func);
        void Register(Type type, IResolver resolver);
        void Register<TType, TImplementation>() where TImplementation : class, TType;
        void Register<TType>() where TType : class;
        void Register(Type type);
        void Register(Type type, Type impl);
        void RegisterSingleInstance<TType, TImplementation>() where TImplementation : class, TType;
        void RegisterSingleInstance<TType>() where TType : class;
        void RegisterSingleInstance(Type type);
        void RegisterSingleInstance(Type type, Type impl);
        void RegisterInstance<TType>(TType instance);
        void RegisterInstance(Type type, object instance);
        void RegisterInstance(object instance);
        TType Resolve<TType>() where TType : class;
        object Resolve(Type type);
    }
}