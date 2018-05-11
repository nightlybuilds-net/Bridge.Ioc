using Bridge.EasyTests.Asserts;
using Bridge.EasyTests.Attributes;
using Bridge.Ioc.Test.Classes;
using Bridge.Ioc.Test.Classes.Impl;

namespace Bridge.Ioc.Test
{
    [Test("Single Instance Resolving")]
    public class SingleInstance
    {
        [TestMethod("RegisterSingleInstance<ITest,TheTest>()")]
        public void GenericInterface()
        {
            var container = new BridgeIoc();
            
            container.RegisterSingleInstance<ITest,TheTest>();

            var first = container.Resolve<ITest>();
            var second = container.Resolve<ITest>();

            first.ShouldBeEquals(second);
            first.Id.ShouldBeEquals(second.Id);
        }
        
        [TestMethod("RegisterSingleInstance(typeof(ITest),typeof(TheTest))")]
        public void NonGenericInterface()
        {
            var container = new BridgeIoc();
            
            container.RegisterSingleInstance(typeof(ITest),typeof(TheTest));

            var first = container.Resolve<ITest>();
            var second = container.Resolve<ITest>();
            
            first.ShouldBeEquals(second);
            first.Id.ShouldBeEquals(second.Id);
        }
        
        [TestMethod("container.RegisterSingleInstance<TheTest>()")]
        public void GenericClass()
        {
            var container = new BridgeIoc();
            
            container.RegisterSingleInstance<TheTest>();

            var first = container.Resolve<TheTest>();
            var second = container.Resolve<TheTest>();
            
            first.ShouldBeEquals(second);
            first.Id.ShouldBeEquals(second.Id);
            
        }
        
        [TestMethod("container.RegisterSingleInstance(typeof(TheTest))")]
        public void NonGenericClass()
        {
            var container = new BridgeIoc();
            
            container.RegisterSingleInstance(typeof(TheTest));

            var first = container.Resolve<TheTest>();
            var second = container.Resolve<TheTest>();
            
            first.ShouldBeEquals(second);
            first.Id.ShouldBeEquals(second.Id);
        }
        
        [TestMethod("RegisterInstance(new TheTest())")]
        public void InstanceResolve()
        {
            var container = new BridgeIoc();
            
            container.RegisterInstance(new TheTest());

            var first = container.Resolve<TheTest>();
            var second = container.Resolve<TheTest>();
            
            first.ShouldBeEquals(second);
            first.Id.ShouldBeEquals(second.Id);
        }
        
        [TestMethod("RegisterFunc(()=> theTest)")]
        public void FuncResolve()
        {
            var container = new BridgeIoc();
            var theTest = new TheTest();
            container.RegisterFunc(()=> theTest);

            var first = container.Resolve<TheTest>();
            var second = container.Resolve<TheTest>();
            
            first.ShouldBeEquals(second);
            first.Id.ShouldBeEquals(second.Id);
        }
    }
}