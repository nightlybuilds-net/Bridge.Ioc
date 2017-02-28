using System;

namespace Bridge.Ioc
{
    [Reflectable]
    public class Gino : IHaveName
        {
            private string pippo;
            private int _age;
            public string Name { get; set; }


            public Gino(IPippo pippo)
            {
                Console.WriteLine("Gino is alive!");
                this.Name = "Gino";
                this._age = pippo.PippoAge;
            }

           
            public void PrintName()
            {
                Console.WriteLine($"Hello my name is {this.Name}!");
                Console.WriteLine($"Pippo is injected and his age is {this._age}");

            }

    }

    [Reflectable]
    public class Pippo : IPippo
    {
        public int PippoAge { get; set; }

        public Pippo()
        {
            this.PippoAge = 50;
        }
    }

    public interface IPippo
    {
        int PippoAge { get; set; }
    }
}