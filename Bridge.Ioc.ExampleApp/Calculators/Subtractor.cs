using Bridge.Ioc.ExampleApp.Abstract;

namespace Bridge.Ioc.ExampleApp.Calculators
{
    [Reflectable]
    public class Subtractor : ISubtract
    {
        public int Subtract(int a, int b)
        {
            return a - b;
        }
    }
}
