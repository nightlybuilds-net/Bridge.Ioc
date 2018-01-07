using System;

namespace Bridge.Ioc.Test.Classes.Impl
{
    class TheTest : ITest
    {
        public Guid Id { get; } = Guid.NewGuid();
    }
}