using System;
using Bridge;
using Bridge.Html5;
using System.Reflection;

namespace Bridge.Ioc
{
    public class App
    {
        public static void Main()
        {
            try
            {
                var ioc = new BridgeIoc();

                ioc.Register<IPippo, Pippo>();
                //ioc.Register<IHaveName, Gino>();

                

                //ioc.RegisterFunc<IHaveName>(() => { return new Gino(ioc.Resolve<IPippo>()); });

                ioc.RegisterInstance<IHaveName>(new Gino(new Pippo()));

                //ioc.RegisterSingleInstance<IHaveName,Gino>();


                var obj = ioc.Resolve<IHaveName>();
                obj.PrintName();

                var obj2 = ioc.Resolve<IHaveName>();
                Console.WriteLine(obj.Equals(obj2));

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

        }




    }
}