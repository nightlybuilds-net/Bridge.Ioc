/**
 * @compiler Bridge.NET 16.6.0
 */
Bridge.assembly("Bridge.Ioc.Test", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Ioc.Test.Classes.ITest", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Ioc.Test.SingleInstance", {
        methods: {
            GenericInterface: function () {
                var container = new Bridge.Ioc.BridgeIoc();

                container.RegisterSingleInstance$3(Bridge.Ioc.Test.Classes.ITest, Bridge.Ioc.Test.Classes.Impl.TheTest);

                var first = container.Resolve(Bridge.Ioc.Test.Classes.ITest);
                var second = container.Resolve(Bridge.Ioc.Test.Classes.ITest);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.Ioc.Test.Classes.ITest, first, second);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.global.System.Guid, first.Bridge$Ioc$Test$Classes$ITest$Id, second.Bridge$Ioc$Test$Classes$ITest$Id);
            },
            NonGenericInterface: function () {
                var container = new Bridge.Ioc.BridgeIoc();

                container.RegisterSingleInstance$1(Bridge.Ioc.Test.Classes.ITest, Bridge.Ioc.Test.Classes.Impl.TheTest);

                var first = container.Resolve(Bridge.Ioc.Test.Classes.ITest);
                var second = container.Resolve(Bridge.Ioc.Test.Classes.ITest);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.Ioc.Test.Classes.ITest, first, second);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.global.System.Guid, first.Bridge$Ioc$Test$Classes$ITest$Id, second.Bridge$Ioc$Test$Classes$ITest$Id);
            },
            GenericClass: function () {
                var container = new Bridge.Ioc.BridgeIoc();

                container.RegisterSingleInstance$2(Bridge.Ioc.Test.Classes.Impl.TheTest);

                var first = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                var second = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.Ioc.Test.Classes.Impl.TheTest, first, second);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.global.System.Guid, first.Id, second.Id);

            },
            NonGenericClass: function () {
                var container = new Bridge.Ioc.BridgeIoc();

                container.RegisterSingleInstance(Bridge.Ioc.Test.Classes.Impl.TheTest);

                var first = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                var second = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.Ioc.Test.Classes.Impl.TheTest, first, second);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.global.System.Guid, first.Id, second.Id);
            },
            InstanceResolve: function () {
                var container = new Bridge.Ioc.BridgeIoc();

                container.RegisterInstance$2(Bridge.Ioc.Test.Classes.Impl.TheTest, new Bridge.Ioc.Test.Classes.Impl.TheTest());

                var first = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                var second = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.Ioc.Test.Classes.Impl.TheTest, first, second);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.global.System.Guid, first.Id, second.Id);
            },
            FuncResolve: function () {
                var container = new Bridge.Ioc.BridgeIoc();
                var theTest = new Bridge.Ioc.Test.Classes.Impl.TheTest();
                container.RegisterFunc(Bridge.Ioc.Test.Classes.Impl.TheTest, function () {
                    return theTest;
                });

                var first = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                var second = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.Ioc.Test.Classes.Impl.TheTest, first, second);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(Bridge.global.System.Guid, first.Id, second.Id);
            }
        }
    });

    Bridge.define("Bridge.Ioc.Test.TransientInstance", {
        methods: {
            GenericInterface: function () {
                var container = new Bridge.Ioc.BridgeIoc();

                container.Register$4(Bridge.Ioc.Test.Classes.ITest, Bridge.Ioc.Test.Classes.Impl.TheTest);

                var first = container.Resolve(Bridge.Ioc.Test.Classes.ITest);
                var second = container.Resolve(Bridge.Ioc.Test.Classes.ITest);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.Ioc.Test.Classes.ITest, first, second);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.global.System.Guid, first.Bridge$Ioc$Test$Classes$ITest$Id, second.Bridge$Ioc$Test$Classes$ITest$Id);
            },
            NonGenericInterface: function () {
                var container = new Bridge.Ioc.BridgeIoc();

                container.Register$2(Bridge.Ioc.Test.Classes.ITest, Bridge.Ioc.Test.Classes.Impl.TheTest);

                var first = container.Resolve(Bridge.Ioc.Test.Classes.ITest);
                var second = container.Resolve(Bridge.Ioc.Test.Classes.ITest);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.Ioc.Test.Classes.ITest, first, second);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.global.System.Guid, first.Bridge$Ioc$Test$Classes$ITest$Id, second.Bridge$Ioc$Test$Classes$ITest$Id);
            },
            GenericClass: function () {
                var container = new Bridge.Ioc.BridgeIoc();

                container.Register$3(Bridge.Ioc.Test.Classes.Impl.TheTest);

                var first = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                var second = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.Ioc.Test.Classes.Impl.TheTest, first, second);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.global.System.Guid, first.Id, second.Id);

            },
            NonGenericClass: function () {
                var container = new Bridge.Ioc.BridgeIoc();

                container.Register(Bridge.Ioc.Test.Classes.Impl.TheTest);

                var first = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                var second = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.Ioc.Test.Classes.Impl.TheTest, first, second);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.global.System.Guid, first.Id, second.Id);
            },
            FuncResolve: function () {
                var container = new Bridge.Ioc.BridgeIoc();
                container.RegisterFunc(Bridge.Ioc.Test.Classes.Impl.TheTest, function () {
                    return new Bridge.Ioc.Test.Classes.Impl.TheTest();
                });

                var first = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                var second = container.Resolve(Bridge.Ioc.Test.Classes.Impl.TheTest);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.Ioc.Test.Classes.Impl.TheTest, first, second);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.global.System.Guid, first.Id, second.Id);
            }
        }
    });

    Bridge.define("Bridge.Ioc.Test.Classes.Impl.TheTest", {
        inherits: [Bridge.Ioc.Test.Classes.ITest],
        fields: {
            Id: null
        },
        alias: ["Id", "Bridge$Ioc$Test$Classes$ITest$Id"],
        ctors: {
            init: function () {
                this.Id = new System.Guid();
                this.Id = System.Guid.newGuid();
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuSW9jLlRlc3QuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIlNpbmdsZUluc3RhbmNlLmNzIiwiVHJhbnNpZW50SW5zdGFuY2UuY3MiLCJDbGFzc2VzL0ltcGwvVGhlVGVzdC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7OztnQkFhWUEsZ0JBQWdCQSxJQUFJQTs7Z0JBRXBCQTs7Z0JBRUFBLFlBQVlBO2dCQUNaQSxhQUFhQTtnQkFDekJBLHdGQUNZQSxPQUFNQTtnQkFDbEJBLG9GQUEwRkEsd0NBQVNBOzs7Z0JBTXZGQSxnQkFBZ0JBLElBQUlBOztnQkFFcEJBLG1DQUFpQ0EsQUFBT0EsK0JBQU9BLEFBQU9BOztnQkFFdERBLFlBQVlBO2dCQUNaQSxhQUFhQTtnQkFDekJBLHdGQUNZQSxPQUFNQTtnQkFDbEJBLG9GQUEwRkEsd0NBQVNBOzs7Z0JBTXZGQSxnQkFBZ0JBLElBQUlBOztnQkFFcEJBOztnQkFFQUEsWUFBWUE7Z0JBQ1pBLGFBQWFBO2dCQUN6QkEsK0ZBQ1lBLE9BQU1BO2dCQUNsQkEsb0ZBQTBGQSxVQUFTQTs7OztnQkFPdkZBLGdCQUFnQkEsSUFBSUE7O2dCQUVwQkEsaUNBQWlDQSxBQUFPQTs7Z0JBRXhDQSxZQUFZQTtnQkFDWkEsYUFBYUE7Z0JBQ3pCQSwrRkFDWUEsT0FBTUE7Z0JBQ2xCQSxvRkFBMEZBLFVBQVNBOzs7Z0JBTXZGQSxnQkFBZ0JBLElBQUlBOztnQkFFcEJBLG1FQUF5RUEsSUFBSUE7O2dCQUU3RUEsWUFBWUE7Z0JBQ1pBLGFBQWFBO2dCQUN6QkEsK0ZBQ1lBLE9BQU1BO2dCQUNsQkEsb0ZBQTBGQSxVQUFTQTs7O2dCQU12RkEsZ0JBQWdCQSxJQUFJQTtnQkFDcEJBLGNBQWNBLElBQUlBO2dCQUNsQkEsNkRBQXFFQSxBQUFvRUE7MkJBQUtBOzs7Z0JBRTlJQSxZQUFZQTtnQkFDWkEsYUFBYUE7Z0JBQ3pCQSwrRkFDWUEsT0FBTUE7Z0JBQ2xCQSxvRkFBMEZBLFVBQVNBOzs7Ozs7OztnQkMvRXZGQSxnQkFBZ0JBLElBQUlBOztnQkFFcEJBOztnQkFFQUEsWUFBWUE7Z0JBQ1pBLGFBQWFBO2dCQUN6QkEsMkZBQ1lBLE9BQU1BO2dCQUNsQkEsdUZBQTZGQSx3Q0FBU0E7OztnQkFNMUZBLGdCQUFnQkEsSUFBSUE7O2dCQUVwQkEscUJBQW1CQSxBQUFPQSwrQkFBT0EsQUFBT0E7O2dCQUV4Q0EsWUFBWUE7Z0JBQ1pBLGFBQWFBO2dCQUN6QkEsMkZBQ1lBLE9BQU1BO2dCQUNsQkEsdUZBQTZGQSx3Q0FBU0E7OztnQkFNMUZBLGdCQUFnQkEsSUFBSUE7O2dCQUVwQkE7O2dCQUVBQSxZQUFZQTtnQkFDWkEsYUFBYUE7Z0JBQ3pCQSxrR0FDWUEsT0FBTUE7Z0JBQ2xCQSx1RkFBNkZBLFVBQVNBOzs7O2dCQU8xRkEsZ0JBQWdCQSxJQUFJQTs7Z0JBRXBCQSxtQkFBbUJBLEFBQU9BOztnQkFFMUJBLFlBQVlBO2dCQUNaQSxhQUFhQTtnQkFDekJBLGtHQUNZQSxPQUFNQTtnQkFDbEJBLHVGQUE2RkEsVUFBU0E7OztnQkFNMUZBLGdCQUFnQkEsSUFBSUE7Z0JBQ3BCQSw2REFBcUVBLEFBQW9FQTsyQkFBS0EsSUFBSUE7OztnQkFFbEpBLFlBQVlBO2dCQUNaQSxhQUFhQTtnQkFDekJBLGtHQUNZQSxPQUFNQTtnQkFDbEJBLHVGQUE2RkEsVUFBU0E7Ozs7Ozs7Ozs7Ozs7OzBCQ25FN0RBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cztcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcbnVzaW5nIEJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzO1xudXNpbmcgQnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSW1wbDtcblxubmFtZXNwYWNlIEJyaWRnZS5Jb2MuVGVzdFxue1xuICAgIFtUZXN0KFwiU2luZ2xlIEluc3RhbmNlIFJlc29sdmluZ1wiKV1cbiAgICBwdWJsaWMgY2xhc3MgU2luZ2xlSW5zdGFuY2VcbiAgICB7XG4gICAgICAgIFtUZXN0TWV0aG9kKFwiUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJVGVzdCxUaGVUZXN0PigpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBHZW5lcmljSW50ZXJmYWNlKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBCcmlkZ2VJb2MoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8SVRlc3QsVGhlVGVzdD4oKTtcblxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gY29udGFpbmVyLlJlc29sdmU8SVRlc3Q+KCk7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gY29udGFpbmVyLlJlc29sdmU8SVRlc3Q+KCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLklUZXN0PihcbiAgICAgICAgICAgIGZpcnN0LHNlY29uZCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxnbG9iYWw6OlN5c3RlbS5HdWlkPiggICAgICAgICAgICBmaXJzdC5JZCxzZWNvbmQuSWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZChcIlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UodHlwZW9mKElUZXN0KSx0eXBlb2YoVGhlVGVzdCkpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBOb25HZW5lcmljSW50ZXJmYWNlKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBCcmlkZ2VJb2MoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UodHlwZW9mKElUZXN0KSx0eXBlb2YoVGhlVGVzdCkpO1xuXG4gICAgICAgICAgICB2YXIgZmlyc3QgPSBjb250YWluZXIuUmVzb2x2ZTxJVGVzdD4oKTtcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBjb250YWluZXIuUmVzb2x2ZTxJVGVzdD4oKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGdsb2JhbDo6QnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSVRlc3Q+KCAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyc3Qsc2Vjb25kKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGdsb2JhbDo6U3lzdGVtLkd1aWQ+KCAgICAgICAgICAgIGZpcnN0LklkLHNlY29uZC5JZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFtUZXN0TWV0aG9kKFwiY29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8VGhlVGVzdD4oKVwiKV1cbiAgICAgICAgcHVibGljIHZvaWQgR2VuZXJpY0NsYXNzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBCcmlkZ2VJb2MoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8VGhlVGVzdD4oKTtcblxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gY29udGFpbmVyLlJlc29sdmU8VGhlVGVzdD4oKTtcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBjb250YWluZXIuUmVzb2x2ZTxUaGVUZXN0PigpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8Z2xvYmFsOjpCcmlkZ2UuSW9jLlRlc3QuQ2xhc3Nlcy5JbXBsLlRoZVRlc3Q+KCAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyc3Qsc2Vjb25kKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGdsb2JhbDo6U3lzdGVtLkd1aWQ+KCAgICAgICAgICAgIGZpcnN0LklkLHNlY29uZC5JZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2QoXCJjb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZSh0eXBlb2YoVGhlVGVzdCkpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBOb25HZW5lcmljQ2xhc3MoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZSh0eXBlb2YoVGhlVGVzdCkpO1xuXG4gICAgICAgICAgICB2YXIgZmlyc3QgPSBjb250YWluZXIuUmVzb2x2ZTxUaGVUZXN0PigpO1xuICAgICAgICAgICAgdmFyIHNlY29uZCA9IGNvbnRhaW5lci5SZXNvbHZlPFRoZVRlc3Q+KCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLkltcGwuVGhlVGVzdD4oICAgICAgICAgICAgXG4gICAgICAgICAgICBmaXJzdCxzZWNvbmQpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8Z2xvYmFsOjpTeXN0ZW0uR3VpZD4oICAgICAgICAgICAgZmlyc3QuSWQsc2Vjb25kLklkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2QoXCJSZWdpc3Rlckluc3RhbmNlKG5ldyBUaGVUZXN0KCkpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBJbnN0YW5jZVJlc29sdmUoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXJJbnN0YW5jZTxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLkltcGwuVGhlVGVzdD4obmV3IFRoZVRlc3QoKSk7XG5cbiAgICAgICAgICAgIHZhciBmaXJzdCA9IGNvbnRhaW5lci5SZXNvbHZlPFRoZVRlc3Q+KCk7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gY29udGFpbmVyLlJlc29sdmU8VGhlVGVzdD4oKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGdsb2JhbDo6QnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSW1wbC5UaGVUZXN0PiggICAgICAgICAgICBcbiAgICAgICAgICAgIGZpcnN0LHNlY29uZCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxnbG9iYWw6OlN5c3RlbS5HdWlkPiggICAgICAgICAgICBmaXJzdC5JZCxzZWNvbmQuSWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZChcIlJlZ2lzdGVyRnVuYygoKT0+IHRoZVRlc3QpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBGdW5jUmVzb2x2ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBuZXcgQnJpZGdlSW9jKCk7XG4gICAgICAgICAgICB2YXIgdGhlVGVzdCA9IG5ldyBUaGVUZXN0KCk7XG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXJGdW5jPGdsb2JhbDo6QnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSW1wbC5UaGVUZXN0PigoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLkltcGwuVGhlVGVzdD4pKCgpPT4gdGhlVGVzdCkpO1xuXG4gICAgICAgICAgICB2YXIgZmlyc3QgPSBjb250YWluZXIuUmVzb2x2ZTxUaGVUZXN0PigpO1xuICAgICAgICAgICAgdmFyIHNlY29uZCA9IGNvbnRhaW5lci5SZXNvbHZlPFRoZVRlc3Q+KCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLkltcGwuVGhlVGVzdD4oICAgICAgICAgICAgXG4gICAgICAgICAgICBmaXJzdCxzZWNvbmQpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8Z2xvYmFsOjpTeXN0ZW0uR3VpZD4oICAgICAgICAgICAgZmlyc3QuSWQsc2Vjb25kLklkKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHM7XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXM7XG51c2luZyBCcmlkZ2UuSW9jLlRlc3QuQ2xhc3NlcztcbnVzaW5nIEJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLkltcGw7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuSW9jLlRlc3RcbntcbiAgICBbVGVzdChcIlRyYW5zaWVudCBSZXNvbHZpbmdcIildXG4gICAgcHVibGljIGNsYXNzIFRyYW5zaWVudEluc3RhbmNlXG4gICAge1xuICAgICAgICBbVGVzdE1ldGhvZChcIlJlZ2lzdGVyPElUZXN0LFRoZVRlc3Q+KClcIildXG4gICAgICAgIHB1YmxpYyB2b2lkIEdlbmVyaWNJbnRlcmZhY2UoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXI8SVRlc3QsVGhlVGVzdD4oKTtcblxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gY29udGFpbmVyLlJlc29sdmU8SVRlc3Q+KCk7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gY29udGFpbmVyLlJlc29sdmU8SVRlc3Q+KCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLklUZXN0PihcbiAgICAgICAgICAgIGZpcnN0LHNlY29uZCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxnbG9iYWw6OlN5c3RlbS5HdWlkPiggICAgICAgICAgICBmaXJzdC5JZCxzZWNvbmQuSWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZChcIlJlZ2lzdGVyKHR5cGVvZihJVGVzdCksdHlwZW9mKFRoZVRlc3QpKVwiKV1cbiAgICAgICAgcHVibGljIHZvaWQgTm9uR2VuZXJpY0ludGVyZmFjZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBuZXcgQnJpZGdlSW9jKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnRhaW5lci5SZWdpc3Rlcih0eXBlb2YoSVRlc3QpLHR5cGVvZihUaGVUZXN0KSk7XG5cbiAgICAgICAgICAgIHZhciBmaXJzdCA9IGNvbnRhaW5lci5SZXNvbHZlPElUZXN0PigpO1xuICAgICAgICAgICAgdmFyIHNlY29uZCA9IGNvbnRhaW5lci5SZXNvbHZlPElUZXN0PigpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8Z2xvYmFsOjpCcmlkZ2UuSW9jLlRlc3QuQ2xhc3Nlcy5JVGVzdD4oICAgICAgICAgICAgXG4gICAgICAgICAgICBmaXJzdCxzZWNvbmQpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8Z2xvYmFsOjpTeXN0ZW0uR3VpZD4oICAgICAgICAgICAgZmlyc3QuSWQsc2Vjb25kLklkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2QoXCJSZWdpc3RlcjxUaGVUZXN0PigpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBHZW5lcmljQ2xhc3MoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXI8VGhlVGVzdD4oKTtcblxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gY29udGFpbmVyLlJlc29sdmU8VGhlVGVzdD4oKTtcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBjb250YWluZXIuUmVzb2x2ZTxUaGVUZXN0PigpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8Z2xvYmFsOjpCcmlkZ2UuSW9jLlRlc3QuQ2xhc3Nlcy5JbXBsLlRoZVRlc3Q+KCAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyc3Qsc2Vjb25kKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlTm90RXF1YWxzPGdsb2JhbDo6U3lzdGVtLkd1aWQ+KCAgICAgICAgICAgIGZpcnN0LklkLHNlY29uZC5JZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2QoXCJSZWdpc3Rlcih0eXBlb2YoVGhlVGVzdCkpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBOb25HZW5lcmljQ2xhc3MoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXIodHlwZW9mKFRoZVRlc3QpKTtcblxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gY29udGFpbmVyLlJlc29sdmU8VGhlVGVzdD4oKTtcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBjb250YWluZXIuUmVzb2x2ZTxUaGVUZXN0PigpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8Z2xvYmFsOjpCcmlkZ2UuSW9jLlRlc3QuQ2xhc3Nlcy5JbXBsLlRoZVRlc3Q+KCAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyc3Qsc2Vjb25kKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlTm90RXF1YWxzPGdsb2JhbDo6U3lzdGVtLkd1aWQ+KCAgICAgICAgICAgIGZpcnN0LklkLHNlY29uZC5JZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFtUZXN0TWV0aG9kKFwiUmVnaXN0ZXJGdW5jKCgpPT4gbmV3IFRoZVRlc3QoKSlcIildXG4gICAgICAgIHB1YmxpYyB2b2lkIEZ1bmNSZXNvbHZlKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBCcmlkZ2VJb2MoKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5SZWdpc3RlckZ1bmM8Z2xvYmFsOjpCcmlkZ2UuSW9jLlRlc3QuQ2xhc3Nlcy5JbXBsLlRoZVRlc3Q+KChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSW1wbC5UaGVUZXN0PikoKCk9PiBuZXcgVGhlVGVzdCgpKSk7XG5cbiAgICAgICAgICAgIHZhciBmaXJzdCA9IGNvbnRhaW5lci5SZXNvbHZlPFRoZVRlc3Q+KCk7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gY29udGFpbmVyLlJlc29sdmU8VGhlVGVzdD4oKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlTm90RXF1YWxzPGdsb2JhbDo6QnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSW1wbC5UaGVUZXN0PiggICAgICAgICAgICBcbiAgICAgICAgICAgIGZpcnN0LHNlY29uZCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxnbG9iYWw6OlN5c3RlbS5HdWlkPiggICAgICAgICAgICBmaXJzdC5JZCxzZWNvbmQuSWQpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcblxubmFtZXNwYWNlIEJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLkltcGxcbntcbiAgICBjbGFzcyBUaGVUZXN0IDogSVRlc3RcbiAgICB7XG4gICAgICAgIHB1YmxpYyBHdWlkIElkIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXG5cbiAgICBcbnByaXZhdGUgR3VpZCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fSWQ9R3VpZC5OZXdHdWlkKCk7fVxufSJdCn0K
