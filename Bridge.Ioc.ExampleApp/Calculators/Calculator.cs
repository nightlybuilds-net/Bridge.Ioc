using System;
using Bridge.Ioc.ExampleApp.Abstract;

namespace Bridge.Ioc.ExampleApp.Calculators
{
    [Reflectable]
    public class Calculator : ICalc
    {
        private readonly ISum _adder;
        private readonly ISubtract _subtractor;

        public Calculator(ISum adder, ISubtract subtractor)
        {
            _adder = adder;
            _subtractor = subtractor;

            this.Id = Guid.NewGuid();
        }

        public Guid Id { get; }
        public int Add(int a, int b)
        {
            return this._adder.Sum(a, b);
        }

        public int Subtract(int a, int b)
        {
            return this._subtractor.Subtract(a, b);
        }
    }
}