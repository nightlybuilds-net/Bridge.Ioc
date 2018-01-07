/**
 * @compiler Bridge.NET 16.6.0
 */
Bridge.assembly("Bridge.EasyTests", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.EasyTests.App", {
        main: function Main () {
            var runner = new Bridge.EasyTests.Runner();
            ko.applyBindings(runner);
            runner.Run();

        }
    });

    /**
     * @memberof System
     * @callback System.Func
     * @return  {boolean}
     */

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Action
     * @return  {void}
     */

    Bridge.define("Bridge.EasyTests.Asserts.EasyAsserts", {
        statics: {
            methods: {
                /**
                 * Assert that action must throw a specific exception
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @throws 
                 * @param   {Function}         T         
                 * @param   {System.Action}    action
                 * @return  {void}
                 */
                Throws: function (T, action) {
                    try {
                        action();
                        throw new Bridge.EasyTests.Exceptions.ThrowsException(System.String.format("Expected Exception: {0}. No Excpetion Throwed!", [Bridge.Reflection.getTypeName(T)]));
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);
                        var expected, e;
                        if (Bridge.is($e1, T)) {
                            expected = $e1;
                            // ok
                        } else {
                            e = $e1;
                            throw new Bridge.EasyTests.Exceptions.ThrowsException(System.String.format("Exception of type: {0} instead of Expected Exception: {1}", Bridge.Reflection.getTypeName(Bridge.getType(e)), Bridge.Reflection.getTypeName(T)));
                        }
                    }
                },
                /**
                 * Assert that two object are equal
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    obj       
                 * @param   {System.Object}    second
                 * @return  {void}
                 */
                AreEqual: function (obj, second) {
                    Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Object, obj, second);
                },
                /**
                 * Assert that two object are not equal
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    obj       
                 * @param   {System.Object}    second
                 * @return  {void}
                 */
                AreNotEqual: function (obj, second) {
                    Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(System.Object, obj, second);
                },
                /**
                 * Test a expected to be true condition
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @throws 
                 * @param   {System.Func}    expectesTrueCondition
                 * @return  {void}
                 */
                ShouldBeTrue: function (expectesTrueCondition) {
                    var res = expectesTrueCondition();
                    if (!res) {
                        throw new Bridge.EasyTests.Exceptions.BeTrueException(System.String.format(System.String.format("Condition expected to be true but result is FALSE.", null), null));
                    }
                },
                /**
                 * Test a expected to be false condition
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @throws 
                 * @param   {System.Func}    expectesFalseCondition
                 * @return  {void}
                 */
                ShouldBeFalse: function (expectesFalseCondition) {
                    var res = expectesFalseCondition();
                    if (res) {
                        throw new Bridge.EasyTests.Exceptions.BeFalseException(System.String.format(System.String.format("Condition expected to be false but result is TRUE.", null), null));
                    }
                },
                /**
                 * COmpare obj
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    o1    
                 * @param   {System.Object}    o2
                 * @return  {boolean}
                 */
                ObjectEqual: function (o1, o2) {
                    if (o1 == null && o2 != null) {
                        return false;
                    }
                    if (o1 != null && o2 == null) {
                        return false;
                    }

                    return o1 == null || Bridge.equals(o1, o2);
                },
                /**
                 * If obj is null return 'null' else tostring
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    obj
                 * @return  {string}
                 */
                ToCompareString: function (obj) {
                    return obj == null ? "null" : obj.toString();
                }
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Asserts.ShouldExtensions", {
        statics: {
            methods: {
                /**
                 * Test equals
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.ShouldExtensions
                 * @memberof Bridge.EasyTests.Asserts.ShouldExtensions
                 * @param   {Function}    T            
                 * @param   {T}           obj          
                 * @param   {T}           secondObj
                 * @return  {void}
                 */
                ShouldBeEquals: function (T, obj, secondObj) {
                    var equal = Bridge.EasyTests.Asserts.EasyAsserts.ObjectEqual(obj, secondObj);

                    if (!equal) {
                        throw new Bridge.EasyTests.Exceptions.EqualException(System.String.format(System.String.format("Expected {0}. Value: {1}", Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(secondObj), Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(obj)), null));
                    }

                },
                /**
                 * Test not equals
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.ShouldExtensions
                 * @memberof Bridge.EasyTests.Asserts.ShouldExtensions
                 * @param   {Function}    T            
                 * @param   {T}           obj          
                 * @param   {T}           secondObj
                 * @return  {void}
                 */
                ShouldBeNotEquals: function (T, obj, secondObj) {
                    var equal = Bridge.EasyTests.Asserts.EasyAsserts.ObjectEqual(obj, secondObj);

                    if (equal) {
                        throw new Bridge.EasyTests.Exceptions.NotEqualException(System.String.format(System.String.format("Expected {0} different from {1}. Are Equal!", Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(secondObj), Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(obj)), null));
                    }

                }
            }
        }
    });

    /** @namespace Bridge.EasyTests.Attributes */

    /**
     * Attribute for test class
     *
     * @public
     * @class Bridge.EasyTests.Attributes.TestAttribute
     * @augments System.Attribute
     */
    Bridge.define("Bridge.EasyTests.Attributes.TestAttribute", {
        inherits: [System.Attribute],
        fields: {
            Description: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Attribute.ctor.call(this);

            },
            $ctor1: function (description) {
                this.$initialize();
                System.Attribute.ctor.call(this);
                this.Description = description;
            }
        }
    });

    /**
     * Attribute for test Method
     *
     * @public
     * @class Bridge.EasyTests.Attributes.TestMethodAttribute
     * @augments System.Attribute
     */
    Bridge.define("Bridge.EasyTests.Attributes.TestMethodAttribute", {
        inherits: [System.Attribute],
        fields: {
            Description: null
        },
        ctors: {
            ctor: function (description) {
                if (description === void 0) { description = null; }

                this.$initialize();
                System.Attribute.ctor.call(this);
                this.Description = description;
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.EasyTestBaseException", {
        inherits: [System.Exception],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                System.Exception.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Runner", {
        fields: {
            _internalTests: null,
            BrowserInfo: null,
            Tests: null,
            TotalTests: null,
            FailedTests: null,
            PassedTests: null,
            TotalTime: null,
            Running: null,
            HidePassed: null
        },
        ctors: {
            init: function () {
                this._internalTests = new (System.Collections.Generic.List$1(Bridge.EasyTests.TestDescriptor)).ctor();
            },
            ctor: function () {
                this.$initialize();
                this.Tests = ko.observableArray();
                this.TotalTests = ko.observable();
                this.FailedTests = ko.observable();
                this.PassedTests = ko.observable();
                this.TotalTime = ko.observable();
                this.Running = ko.observable();

                this.BrowserInfo = Bridge.global.navigator.appVersion;

                // hide passed test management
                this.HidePassed = ko.observable(false);
                this.HidePassed.subscribe(Bridge.fn.bind(this, function (value) {
                    System.Linq.Enumerable.from(this.Tests()).where(function (w) {
                            return w.Success;
                        }).forEach(function (f) {
                        f.Visible(!value);
                    });
                }));
            }
        },
        methods: {
            /**
             * Run tests
             *
             * @instance
             * @public
             * @this Bridge.EasyTests.Runner
             * @memberof Bridge.EasyTests.Runner
             * @return  {void}
             */
            Run: function () {
                this.Running(true);

                this.DiscoverTest(); // discovery all tests

                this.TotalTests(this._internalTests.Count); // total tests found
                this.RunTests(); // run all test for each group

                this.FailedTests(System.Linq.Enumerable.from(this._internalTests).count(function (c) {
                            return !c.Success;
                        })); // failed tests
                this.PassedTests(System.Linq.Enumerable.from(this._internalTests).count(function (c) {
                            return c.Success;
                        })); // passed Tests
                this.TotalTime(System.Linq.Enumerable.from(this.Tests()).sum(function (s) {
                            return s.Time;
                        }));

                this.Running(false);
            },
            /**
             * Run
             *
             * @instance
             * @private
             * @this Bridge.EasyTests.Runner
             * @memberof Bridge.EasyTests.Runner
             * @return  {void}
             */
            RunTests: function () {
                this._internalTests.forEach(Bridge.fn.bind(this, function (f) {
                    f.RunTest();
                    this.Tests.push(f);
                }));
            },
            /**
             * Discovery all tests
             *
             * @instance
             * @private
             * @this Bridge.EasyTests.Runner
             * @memberof Bridge.EasyTests.Runner
             * @return  {void}
             */
            DiscoverTest: function () {
                var types = System.Linq.Enumerable.from(System.AppDomain.getAssemblies()).selectMany(function (s) {
                        return Bridge.Reflection.getAssemblyTypes(s);
                    }).where(function (w) {
                    return !System.String.startsWith(Bridge.Reflection.getTypeFullName(w).toLowerCase(), "system");
                }).where(function (w) {
                    return !Bridge.Reflection.isInterface(w) && !((Bridge.Reflection.getMetaValue(w, "att", 0)  & 128)  != 0);
                }).where(function (w) {
                    return System.Linq.Enumerable.from(Bridge.Reflection.getAttributes(w, Bridge.EasyTests.Attributes.TestAttribute, true)).any();
                }).toList(Function);

                // run all tests method
                types.forEach(Bridge.fn.bind(this, function (f) {
                    var testAtt = Bridge.cast(System.Linq.Enumerable.from(Bridge.Reflection.getAttributes(f, Bridge.EasyTests.Attributes.TestAttribute, true)).first(), Bridge.EasyTests.Attributes.TestAttribute);


                    var testMethods = System.Linq.Enumerable.from(Bridge.Reflection.getMembers(f, 8, 28)).where(function (w) {
                            return (w.a === 2);
                        }).where(function (w) {
                        return System.Linq.Enumerable.from(System.Attribute.getCustomAttributes(w, Bridge.EasyTests.Attributes.TestMethodAttribute, true)).any();
                    }).toList(System.Reflection.MethodInfo);

                    testMethods.forEach(Bridge.fn.bind(this, function (method) {
                        var $t;
                        var attr = Bridge.cast(System.Linq.Enumerable.from(System.Attribute.getCustomAttributes(method, Bridge.EasyTests.Attributes.TestMethodAttribute, true)).first(), Bridge.EasyTests.Attributes.TestMethodAttribute);

                        var testDescr = ($t = new Bridge.EasyTests.TestDescriptor(), $t.Type = f, $t.Method = method, $t.Group = System.String.isNullOrEmpty(testAtt.Description) ? Bridge.Reflection.getTypeName(f) : testAtt.Description, $t.Name = System.String.isNullOrEmpty(attr.Description) ? method.n : attr.Description, $t);

                        this._internalTests.add(testDescr);
                    }));

                }));
            }
        }
    });

    Bridge.define("Bridge.EasyTests.TestDescriptor", {
        fields: {
            Name: null,
            Group: null,
            Type: null,
            Method: null,
            FailAssert: null,
            Time: 0,
            Visible: null
        },
        props: {
            Success: {
                get: function () {
                    return this.FailAssert == null;
                }
            },
            Error: {
                get: function () {
                    return this.FailAssert == null ? "" : System.String.format("{0}: {1}", Bridge.Reflection.getTypeName(Bridge.getType(this.FailAssert)), this.FailAssert.Message);
                }
            },
            Stack: {
                get: function () {
                    var $t;
                    return ($t = this.FailAssert) != null ? $t.StackTrace : null;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Visible = ko.observable(true);
            }
        },
        methods: {
            /**
             * Run test.
             *
             * @instance
             * @public
             * @this Bridge.EasyTests.TestDescriptor
             * @memberof Bridge.EasyTests.TestDescriptor
             * @return  {void}
             */
            RunTest: function () {
                var instance = Bridge.createInstance(this.Type);

                var watch = new System.Diagnostics.Stopwatch();
                watch.start();

                try {
                    Bridge.Reflection.midel(this.Method, Bridge.unbox(instance))(null);
                }
                catch (e) {
                    e = System.Exception.create(e);
                    this.FailAssert = e;
                }
                finally {
                    watch.stop();
                    this.Time = System.Int64.clip32(watch.milliseconds());

                    // check of type is disposable
                    var disposable = Bridge.as(instance, System.IDisposable);
                    disposable != null ? disposable.System$IDisposable$dispose() : null;
                }
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.BeFalseException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.BeTrueException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.EqualException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.NotEqualException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.ThrowsException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuRWFzeVRlc3RzLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBc3NlcnRzL0Vhc3lBc3NlcnRzLmNzIiwiQXNzZXJ0cy9TaG91bGRFeHRlbnNpb25zLmNzIiwiQXR0cmlidXRlcy9UZXN0QXR0cmlidXRlLmNzIiwiQXR0cmlidXRlcy9UZXN0TWV0aG9kQXR0cmlidXRlLmNzIiwiRXhjZXB0aW9ucy9FYXN5VGVzdEJhc2VFeGNlcHRpb24uY3MiLCJSdW5uZXIuY3MiLCJUZXN0RGVzY3JpcHRvci5jcyIsIkV4Y2VwdGlvbnMvQmVGYWxzZUV4Y2VwdGlvbi5jcyIsIkV4Y2VwdGlvbnMvQmVUcnVlRXhjZXB0aW9uLmNzIiwiRXhjZXB0aW9ucy9FcXVhbEV4Y2VwdGlvbi5jcyIsIkV4Y2VwdGlvbnMvTm90RXF1YWxFeGNlcHRpb24uY3MiLCJFeGNlcHRpb25zL1Rocm93c0V4Y2VwdGlvbi5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7WUFRWUEsYUFBYUEsSUFBSUE7WUFDakJBLGlCQUEwQkE7WUFDMUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ0dzQkEsR0FBR0E7b0JBRXpCQTt3QkFFSUE7d0JBQ0FBLE1BQU1BLElBQUlBLDRDQUFnQkEsd0VBQStEQSw4QkFBT0E7Ozs7Ozs7Ozs7NEJBUWhHQSxNQUFNQSxJQUFJQSw0Q0FBZ0JBLGtGQUEwRUEsa0RBQWlCQSw4QkFBT0E7Ozs7Ozs7Ozs7Ozs7OztvQ0FVeEdBLEtBQVlBO29CQUVoREEsd0VBQTZFQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozt1Q0FRMUNBLEtBQVlBO29CQUVuREEsMkVBQWdGQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozt3Q0FRNUNBO29CQUU1QkEsVUFBVUE7b0JBQ1ZBLElBQUdBLENBQUNBO3dCQUNBQSxNQUFNQSxJQUFJQSw0Q0FBZ0JBLHFCQUFjQTs7Ozs7Ozs7Ozs7Ozs7eUNBUWZBO29C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QUFBUUE7Ozs7Ozs7Z0JBU3ZKQSxlQUFlQTs7Ozs7Ozs7Ozs7Ozs7Z0JBU2ZBLGVBQWVBLHNCQUF5QkE7O2dCQUV4Q0EsWUFBWUEsSUFBSUE7Z0JBQ2hCQTs7Z0JBRUFBO29CQUVJQSxxQ0FBbUJBOzs7O29CQUluQkEsa0JBQWtCQTs7O29CQUlsQkE7b0JBQ0FBLFlBQVlBLG9CQUFLQTs7O29CQUdqQkEsaUJBQWlCQTtvQkFDakJBLGNBQVlBLE9BQUtBLEFBQXFDQSwwQ0FBc0JBOzs7Ozs7Ozs7NEJDekQ1REE7O2tGQUF1QkE7Ozs7Ozs7OzRCQ0F4QkE7O2tGQUF1QkE7Ozs7Ozs7OzRCQ0F4QkE7O2tGQUF1QkE7Ozs7Ozs7OzRCQ0FwQkE7O2tGQUF1QkE7Ozs7Ozs7OzRCQ0F6QkE7O2tGQUF1QkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgUmV0eXBlZDtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBwdWJsaWMgY2xhc3MgQXBwXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBydW5uZXIgPSBuZXcgUnVubmVyKCk7XG4gICAgICAgICAgICBrbm9ja291dC5rby5hcHBseUJpbmRpbmdzKHJ1bm5lcik7XG4gICAgICAgICAgICBydW5uZXIuUnVuKCk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnM7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEVhc3lBc3NlcnRzXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBc3NlcnQgdGhhdCBhY3Rpb24gbXVzdCB0aHJvdyBhIHNwZWNpZmljIGV4Y2VwdGlvblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhY3Rpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiRWFzeVRlc3RCYXNlRXhjZXB0aW9uXCI+PC9leGNlcHRpb24+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBUaHJvd3M8VD4oQWN0aW9uIGFjdGlvbikgd2hlcmUgVCA6IEV4Y2VwdGlvblxuICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVGhyb3dzRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCBFeGNlcHRpb246IHswfS4gTm8gRXhjcGV0aW9uIFRocm93ZWQhXCIsdHlwZW9mKFQpLk5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChUIGV4cGVjdGVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIG9rXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRocm93c0V4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiRXhjZXB0aW9uIG9mIHR5cGU6IHswfSBpbnN0ZWFkIG9mIEV4cGVjdGVkIEV4Y2VwdGlvbjogezF9XCIsZS5HZXRUeXBlKCkuTmFtZSx0eXBlb2YoVCkuTmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBc3NlcnQgdGhhdCB0d28gb2JqZWN0IGFyZSBlcXVhbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQXJlRXF1YWwob2JqZWN0IG9iaiwgb2JqZWN0IHNlY29uZClcbiAgICAgICAge1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8b2JqZWN0PiggICAgICAgICAgICBvYmosc2Vjb25kKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgdHdvIG9iamVjdCBhcmUgbm90IGVxdWFsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZFwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBcmVOb3RFcXVhbChvYmplY3Qgb2JqLCBvYmplY3Qgc2Vjb25kKVxuICAgICAgICB7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxvYmplY3Q+KCAgICAgICAgICAgIG9iaixzZWNvbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gVGVzdCBhIGV4cGVjdGVkIHRvIGJlIHRydWUgY29uZGl0aW9uXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4cGVjdGVzVHJ1ZUNvbmRpdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8ZXhjZXB0aW9uIGNyZWY9XCJCZVRydWVFeGNlcHRpb25cIj48L2V4Y2VwdGlvbj5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNob3VsZEJlVHJ1ZShGdW5jPGJvb2w+IGV4cGVjdGVzVHJ1ZUNvbmRpdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlcyA9IGV4cGVjdGVzVHJ1ZUNvbmRpdGlvbigpO1xuICAgICAgICAgICAgaWYoIXJlcylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmVUcnVlRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChcIkNvbmRpdGlvbiBleHBlY3RlZCB0byBiZSB0cnVlIGJ1dCByZXN1bHQgaXMgRkFMU0UuXCIpKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3QgYSBleHBlY3RlZCB0byBiZSBmYWxzZSBjb25kaXRpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXhwZWN0ZXNGYWxzZUNvbmRpdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8ZXhjZXB0aW9uIGNyZWY9XCJCZUZhbHNlRXhjZXB0aW9uXCI+PC9leGNlcHRpb24+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZUZhbHNlKEZ1bmM8Ym9vbD4gZXhwZWN0ZXNGYWxzZUNvbmRpdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlcyA9IGV4cGVjdGVzRmFsc2VDb25kaXRpb24oKTtcbiAgICAgICAgICAgIGlmKHJlcylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmVGYWxzZUV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJDb25kaXRpb24gZXhwZWN0ZWQgdG8gYmUgZmFsc2UgYnV0IHJlc3VsdCBpcyBUUlVFLlwiKSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIENPbXBhcmUgb2JqXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm8xXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibzJcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgT2JqZWN0RXF1YWwob2JqZWN0IG8xLCBvYmplY3QgbzIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChvMSA9PSBudWxsICYmIG8yICE9IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChvMSAhPSBudWxsICYmIG8yID09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIG8xID09IG51bGwgfHwgbzEuRXF1YWxzKG8yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIElmIG9iaiBpcyBudWxsIHJldHVybiAnbnVsbCcgZWxzZSB0b3N0cmluZ1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBUb0NvbXBhcmVTdHJpbmcodGhpcyBvYmplY3Qgb2JqKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gb2JqID09IG51bGwgPyBcIm51bGxcIiA6IG9iai5Ub1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9ucztcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0c1xue1xuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgU2hvdWxkRXh0ZW5zaW9uc1xuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gVGVzdCBlcXVhbHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2Vjb25kT2JqXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNob3VsZEJlRXF1YWxzPFQ+KHRoaXMgVCBvYmosIFQgc2Vjb25kT2JqKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXF1YWwgPSBFYXN5QXNzZXJ0cy5PYmplY3RFcXVhbChvYmosIHNlY29uZE9iaik7XG5cbiAgICAgICAgICAgIGlmICghZXF1YWwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVxdWFsRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChcIkV4cGVjdGVkIHswfS4gVmFsdWU6IHsxfVwiLHNlY29uZE9iai5Ub0NvbXBhcmVTdHJpbmcoKSxvYmouVG9Db21wYXJlU3RyaW5nKCkpKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gVGVzdCBub3QgZXF1YWxzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZE9ialwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZU5vdEVxdWFsczxUPih0aGlzIFQgb2JqLCBUIHNlY29uZE9iailcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVxdWFsID0gRWFzeUFzc2VydHMuT2JqZWN0RXF1YWwob2JqLCBzZWNvbmRPYmopO1xuXG4gICAgICAgICAgICBpZiAoZXF1YWwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEVxdWFsRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChcIkV4cGVjdGVkIHswfSBkaWZmZXJlbnQgZnJvbSB7MX0uIEFyZSBFcXVhbCFcIixzZWNvbmRPYmouVG9Db21wYXJlU3RyaW5nKCksb2JqLlRvQ29tcGFyZVN0cmluZygpKSkpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXNcbntcbiAgICBcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIEF0dHJpYnV0ZSBmb3IgdGVzdCBjbGFzc1xuICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgW1N5c3RlbS5BdHRyaWJ1dGVVc2FnZShTeXN0ZW0uQXR0cmlidXRlVGFyZ2V0cy5DbGFzcyldIFxuICAgIHB1YmxpYyBjbGFzcyBUZXN0QXR0cmlidXRlIDogQXR0cmlidXRlXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBUZXN0QXR0cmlidXRlKClcbiAgICAgICAge1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGVzdEF0dHJpYnV0ZShzdHJpbmcgZGVzY3JpcHRpb24gKVxuICAgICAgICB7XG4gICAgICAgICAgICBEZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlc1xue1xuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gQXR0cmlidXRlIGZvciB0ZXN0IE1ldGhvZFxuICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgW1N5c3RlbS5BdHRyaWJ1dGVVc2FnZShTeXN0ZW0uQXR0cmlidXRlVGFyZ2V0cy5NZXRob2QpXSBcbiAgICBwdWJsaWMgY2xhc3MgVGVzdE1ldGhvZEF0dHJpYnV0ZSA6IEF0dHJpYnV0ZVxuICAgIHtcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvbiB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgVGVzdE1ldGhvZEF0dHJpYnV0ZShzdHJpbmcgZGVzY3JpcHRpb24gPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBEZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xue1xuICAgIHB1YmxpYyBjbGFzcyBFYXN5VGVzdEJhc2VFeGNlcHRpb24gOiBFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBFYXN5VGVzdEJhc2VFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKSBcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXM7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgaW50ZXJuYWwgY2xhc3MgUnVubmVyXG4gICAge1xuICAgICAgICBwcml2YXRlIExpc3Q8VGVzdERlc2NyaXB0b3I+IF9pbnRlcm5hbFRlc3RzID0gbmV3IExpc3Q8VGVzdERlc2NyaXB0b3I+KCk7XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJyb3dzZXJJbmZvIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj5UZXN0cztcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+VG90YWxUZXN0cztcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+RmFpbGVkVGVzdHM7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PlBhc3NlZFRlc3RzO1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5Ub3RhbFRpbWU7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5SdW5uaW5nO1xuICAgICAgICBcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPkhpZGVQYXNzZWQ7XG5cblxuICAgICAgICBwdWJsaWMgUnVubmVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5UZXN0cyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8VGVzdERlc2NyaXB0b3I+KCk7XG4gICAgICAgICAgICB0aGlzLlRvdGFsVGVzdHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLkZhaWxlZFRlc3RzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigpO1xuICAgICAgICAgICAgdGhpcy5QYXNzZWRUZXN0cyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuVG90YWxUaW1lID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigpO1xuICAgICAgICAgICAgdGhpcy5SdW5uaW5nID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5Ccm93c2VySW5mbyA9IEdsb2JhbC5OYXZpZ2F0b3IuQXBwVmVyc2lvbjtcblxuICAgICAgICAgICAgLy8gaGlkZSBwYXNzZWQgdGVzdCBtYW5hZ2VtZW50XG4gICAgICAgICAgICB0aGlzLkhpZGVQYXNzZWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPihmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLkhpZGVQYXNzZWQuc3Vic2NyaWJlKChnbG9iYWw6OlJldHlwZWQua25vY2tvdXQuS25vY2tvdXRTdWJzY3JpYmFibGU8Ym9vbD4uc3Vic2NyaWJlRm4pKHZhbHVlID0+XG4gICAgICAgICAgICB7XG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4oICAgICAgICAgICAgICAgIHRoaXMuVGVzdHMuU2VsZigpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgYm9vbD4pKHc9PncuU3VjY2VzcykpLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KShmPT5mLlZpc2libGUuU2VsZighdmFsdWUpKSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBSdW4gdGVzdHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZvaWQgUnVuKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5SdW5uaW5nLlNlbGYodHJ1ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuRGlzY292ZXJUZXN0KCk7IC8vIGRpc2NvdmVyeSBhbGwgdGVzdHNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5Ub3RhbFRlc3RzLlNlbGYodGhpcy5faW50ZXJuYWxUZXN0cy5Db3VudCk7IC8vIHRvdGFsIHRlc3RzIGZvdW5kXG4gICAgICAgICAgICB0aGlzLlJ1blRlc3RzKCk7IC8vIHJ1biBhbGwgdGVzdCBmb3IgZWFjaCBncm91cFxuXG4gICAgICAgICAgICB0aGlzLkZhaWxlZFRlc3RzLlNlbGYoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KHRoaXMuX2ludGVybmFsVGVzdHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBib29sPikoYz0+IWMuU3VjY2VzcykpKTsgLy8gZmFpbGVkIHRlc3RzXG4gICAgICAgICAgICB0aGlzLlBhc3NlZFRlc3RzLlNlbGYoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KHRoaXMuX2ludGVybmFsVGVzdHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBib29sPikoYz0+Yy5TdWNjZXNzKSkpOyAvLyBwYXNzZWQgVGVzdHNcbiAgICAgICAgICAgIHRoaXMuVG90YWxUaW1lLlNlbGYoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TdW08Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPih0aGlzLlRlc3RzLlNlbGYoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGludD4pKHMgPT4gcy5UaW1lKSkpO1xuXG4gICAgICAgICAgICB0aGlzLlJ1bm5pbmcuU2VsZihmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBSdW4gXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBSdW5UZXN0cygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsVGVzdHMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4pKGYgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmLlJ1blRlc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLlRlc3RzLnB1c2goZik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBEaXNjb3ZlcnkgYWxsIHRlc3RzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBEaXNjb3ZlclRlc3QoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdHlwZXMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSxnbG9iYWw6OlN5c3RlbS5UeXBlPihBcHBEb21haW4uQ3VycmVudERvbWFpbi5HZXRBc3NlbWJsaWVzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxnbG9iYWw6OlN5c3RlbS5UeXBlPj4pKHMgPT4gcy5HZXRUeXBlcygpKSlcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHc9PiF3LkZ1bGxOYW1lLlRvTG93ZXIoKS5TdGFydHNXaXRoKFwic3lzdGVtXCIpKSlcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHc9PiF3LklzSW50ZXJmYWNlICYmICF3LklzQWJzdHJhY3QpKVxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodz0+U3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8b2JqZWN0Pih3LkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RBdHRyaWJ1dGUpLHRydWUpKSkpXG4gICAgICAgICAgICAgICAgLlRvTGlzdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBydW4gYWxsIHRlc3RzIG1ldGhvZFxuICAgICAgICAgICAgdHlwZXMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlR5cGU+KShmID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHRlc3RBdHQgPSAoVGVzdEF0dHJpYnV0ZSlTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PG9iamVjdD4oZi5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0QXR0cmlidXRlKSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgdmFyIHRlc3RNZXRob2RzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8+KGYuR2V0TWV0aG9kcygpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbywgYm9vbD4pKHcgPT4gdy5Jc1B1YmxpYykpXG4gICAgICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8sIGJvb2w+KSh3ID0+IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PG9iamVjdD4ody5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0TWV0aG9kQXR0cmlidXRlKSwgdHJ1ZSkpKSkuVG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGVzdE1ldGhvZHMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbz4pKG1ldGhvZCA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSAoVGVzdE1ldGhvZEF0dHJpYnV0ZSkgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxvYmplY3Q+KG1ldGhvZC5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0TWV0aG9kQXR0cmlidXRlKSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3REZXNjciA9IG5ldyBUZXN0RGVzY3JpcHRvclxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBlID0gZixcbiAgICAgICAgICAgICAgICAgICAgICAgIE1ldGhvZCA9IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEdyb3VwID0gc3RyaW5nLklzTnVsbE9yRW1wdHkodGVzdEF0dC5EZXNjcmlwdGlvbikgPyBmLk5hbWUgOiB0ZXN0QXR0LkRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgTmFtZSA9IHN0cmluZy5Jc051bGxPckVtcHR5KGF0dHIuRGVzY3JpcHRpb24pID8gbWV0aG9kLk5hbWUgOiBhdHRyLkRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcm5hbFRlc3RzLkFkZCh0ZXN0RGVzY3IpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uRGlhZ25vc3RpY3M7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzO1xudXNpbmcgUmV0eXBlZC5QcmltaXRpdmU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgaW50ZXJuYWwgY2xhc3MgVGVzdERlc2NyaXB0b3JcbiAgICB7XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIHN0cmluZyBHcm91cCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFR5cGUgVHlwZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBNZXRob2RJbmZvIE1ldGhvZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgRXhjZXB0aW9uIEZhaWxBc3NlcnQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgYm9vbCBTdWNjZXNzIHtnZXR7cmV0dXJuIEZhaWxBc3NlcnQgPT0gbnVsbDt9fVxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRXJyb3Ige2dldHtyZXR1cm4gRmFpbEFzc2VydCA9PSBudWxsID8gc3RyaW5nLkVtcHR5IDogc3RyaW5nLkZvcm1hdChcInswfTogezF9XCIsRmFpbEFzc2VydC5HZXRUeXBlKCkuTmFtZSxGYWlsQXNzZXJ0Lk1lc3NhZ2UpO319XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU3RhY2sge2dldHtyZXR1cm4gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixGYWlsQXNzZXJ0KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8RXhjZXB0aW9uPihcImtleTFcIikuU3RhY2tUcmFjZTooc3RyaW5nKW51bGw7fX1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBpbnQgVGltZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPlZpc2libGUgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBUZXN0RGVzY3JpcHRvcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuVmlzaWJsZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KHRydWUpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBSdW4gdGVzdC5cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZvaWQgUnVuVGVzdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZSh0aGlzLlR5cGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgd2F0Y2ggPSBuZXcgU3RvcHdhdGNoKCk7XG4gICAgICAgICAgICB3YXRjaC5TdGFydCgpO1xuXG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLk1ldGhvZC5JbnZva2UoaW5zdGFuY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuRmFpbEFzc2VydCA9IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgd2F0Y2guU3RvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuVGltZSA9IChpbnQpd2F0Y2guRWxhcHNlZE1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBvZiB0eXBlIGlzIGRpc3Bvc2FibGVcbiAgICAgICAgICAgICAgICB2YXIgZGlzcG9zYWJsZSA9IGluc3RhbmNlIGFzIElEaXNwb3NhYmxlO1xuICAgICAgICAgICAgICAgIGRpc3Bvc2FibGUhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9PmRpc3Bvc2FibGUuRGlzcG9zZSgpKTpudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xue1xuICAgIHB1YmxpYyBjbGFzcyBCZUZhbHNlRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBwdWJsaWMgQmVGYWxzZUV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXG57XG4gICAgcHVibGljIGNsYXNzIEJlVHJ1ZUV4Y2VwdGlvbiA6IEVhc3lUZXN0QmFzZUV4Y2VwdGlvblxuICAgIHtcbiAgICAgICAgcHVibGljIEJlVHJ1ZUV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXG57XG4gICAgcHVibGljIGNsYXNzIEVxdWFsRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBwdWJsaWMgRXF1YWxFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKVxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xue1xuICAgIHB1YmxpYyBjbGFzcyBOb3RFcXVhbEV4Y2VwdGlvbiA6IEVhc3lUZXN0QmFzZUV4Y2VwdGlvblxuICAgIHtcbiAgICAgICAgcHVibGljIE5vdEVxdWFsRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcbntcbiAgICBwdWJsaWMgY2xhc3MgVGhyb3dzRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBwdWJsaWMgVGhyb3dzRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxufSJdCn0K
