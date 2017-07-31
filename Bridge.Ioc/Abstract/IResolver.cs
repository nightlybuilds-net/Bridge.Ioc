using System;

namespace Bridge.Ioc
{
    internal interface IResolver
    {
        Func<object> Resolve { get; set; }
    }
}