using System;

namespace Bridge.Ioc.ExampleApp.Abstract
{
    public interface ICalc
    {
        Guid Id { get; }
        int Add(int a, int b);
        int Subtract(int a, int b);
    }
}