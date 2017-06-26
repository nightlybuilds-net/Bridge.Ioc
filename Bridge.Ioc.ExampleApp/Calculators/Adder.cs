using Bridge.Ioc.ExampleApp.Abstract;

namespace Bridge.Ioc.ExampleApp.Calculators
{
    [Reflectable]
    public class Adder : ISum
    {
        public int Sum(int a, int b)
        {
            return a + b;
        }
    }
}