using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Ioc.ExampleApp.Abstract;
using Bridge.Ioc.ExampleApp.Calculators;

namespace Bridge.Ioc.ExampleApp
{
    public class App
    {
        public static void Main()
        {
            // simple all transient registration
            var firstContainer = new BridgeIoc();
            firstContainer.Register<ISum,Adder>();
            firstContainer.Register<ISubtract,Subtractor>();
            firstContainer.Register<ICalc,Calculator>();

            var secondContainer = new BridgeIoc();
            secondContainer.RegisterFunc<ISum>(() => new Adder()); // can register func
            secondContainer.RegisterInstance<ISubtract>(new Subtractor()); // instance
            secondContainer.RegisterSingleInstance<ICalc, Calculator>(); // or single instance (singleton)

            // transient resolving 
            var calc1 = firstContainer.Resolve<ICalc>();
            var calc2 = firstContainer.Resolve<ICalc>();
            Console.WriteLine($"Calc1 Id: {calc1.Id}");
            Console.WriteLine($"Calc2 Id: {calc2.Id}");

            Console.WriteLine($"Same id? : {calc2.Id == calc1.Id}");


            // single instance resolving
            var calc3 = secondContainer.Resolve<ICalc>();
            var calc4 = secondContainer.Resolve<ICalc>();
            Console.WriteLine($"Calc1 Id: {calc3.Id}");
            Console.WriteLine($"Calc2 Id: {calc4.Id}");

            Console.WriteLine($"Same id? : {calc3.Id == calc4.Id}");

            Console.WriteLine($"3+4={calc1.Add(3,4)}");
            Console.WriteLine($"7-2={calc1.Subtract(7,2)}");

        }
    }
}
