# Bridge.Ioc
A simple IOC Container for Bridge.Net
Nuget package avaiable [www.nuget.org/packages/Bridge.Ioc](www.nuget.org/packages/Bridge.Ioc)

## Fast usage
See example app.
###Example of registrations:

  var secondContainer = new BridgeIoc();
  secondContainer.RegisterFunc<ISum>(() => new Adder()); 
  secondContainer.RegisterInstance<ISubtract>(new Subtractor()); 
  secondContainer.RegisterSingleInstance<ICalc, Calculator>(); 
  secondContainer.Register<IFoo, Foo>(); 
  secondContainer.Register<AConcreteFoo>(); 

###Resolve

  secondContainer.Resolve<IFoo>();

Have fun!

##Follow Me

Twitter: @markjackmilian
MyBlog: markjackmilian.net
Linkedin: [profile](https://www.linkedin.com/in/marco-giacomo-milani)

