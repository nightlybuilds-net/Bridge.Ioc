using System;

namespace Bridge.Ioc.Abstract
{
    internal interface IResolver
    {
        Func<object> Resolve { get; set; }
    }
}