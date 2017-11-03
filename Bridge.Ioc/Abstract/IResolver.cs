using System;

namespace Bridge.Ioc
{
    public interface IResolver
    {
        Func<object> Resolve { get; }
    }
}