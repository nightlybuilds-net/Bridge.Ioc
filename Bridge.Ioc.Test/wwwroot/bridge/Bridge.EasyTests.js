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

                        var testDescr = ($t = new Bridge.EasyTests.TestDescriptor(), $t.Type = f, $t.Method = method, $t.Group = Bridge.Reflection.getTypeName(f), $t.GroupDescription = System.String.isNullOrEmpty(testAtt.Description) ? "" : System.String.format("[{0}]", [testAtt.Description]), $t.Name = method.n, $t.NameDescription = System.String.isNullOrEmpty(attr.Description) ? "" : System.String.format("[{0}]", [attr.Description]), $t);

                        this._internalTests.add(testDescr);
                    }));

                }));
            }
        }
    });

    Bridge.define("Bridge.EasyTests.TestDescriptor", {
        fields: {
            Name: null,
            NameDescription: null,
            Group: null,
            GroupDescription: null,
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuRWFzeVRlc3RzLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBc3NlcnRzL0Vhc3lBc3NlcnRzLmNzIiwiQXNzZXJ0cy9TaG91bGRFeHRlbnNpb25zLmNzIiwiQXR0cmlidXRlcy9UZXN0QXR0cmlidXRlLmNzIiwiQXR0cmlidXRlcy9UZXN0TWV0aG9kQXR0cmlidXRlLmNzIiwiRXhjZXB0aW9ucy9FYXN5VGVzdEJhc2VFeGNlcHRpb24uY3MiLCJSdW5uZXIuY3MiLCJUZXN0RGVzY3JpcHRvci5jcyIsIkV4Y2VwdGlvbnMvQmVGYWxzZUV4Y2VwdGlvbi5jcyIsIkV4Y2VwdGlvbnMvQmVUcnVlRXhjZXB0aW9uLmNzIiwiRXhjZXB0aW9ucy9FcXVhbEV4Y2VwdGlvbi5jcyIsIkV4Y2VwdGlvbnMvTm90RXF1YWxFeGNlcHRpb24uY3MiLCJFeGNlcHRpb25zL1Rocm93c0V4Y2VwdGlvbi5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7WUFRWUEsYUFBYUEsSUFBSUE7WUFDakJBLGlCQUEwQkE7WUFDMUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ0dzQkEsR0FBR0E7b0JBRXpCQTt3QkFFSUE7d0JBQ0FBLE1BQU1BLElBQUlBLDRDQUFnQkEsd0VBQStEQSw4QkFBT0E7Ozs7Ozs7Ozs7NEJBUWhHQSxNQUFNQSxJQUFJQSw0Q0FBZ0JBLGtGQUEwRUEsa0RBQWlCQSw4QkFBT0E7Ozs7Ozs7Ozs7Ozs7OztvQ0FVeEdBLEtBQVlBO29CQUVoREEsd0VBQTZFQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozt1Q0FRMUNBLEtBQVlBO29CQUVuREEsMkVBQWdGQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozt3Q0FRNUNBO29CQUU1QkEsVUFBVUE7b0JBQ1ZBLElBQUdBLENBQUNBO3dCQUNBQSxNQUFNQSxJQUFJQSw0Q0FBZ0JBLHFCQUFjQTs7Ozs7Ozs7Ozs7Ozs7eUNBUWZBO29C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T0EsTUFBb0NBLG9CQUFhQSxPQUFLQSxnQkFBNkRBLEFBQVFBOzs7Ozs7O2dCQVN2SkEsZUFBZUE7Ozs7Ozs7Ozs7Ozs7O2dCQVNmQSxlQUFlQSxzQkFBeUJBOztnQkFFeENBLFlBQVlBLElBQUlBO2dCQUNoQkE7O2dCQUVBQTtvQkFFSUEscUNBQW1CQTs7OztvQkFJbkJBLGtCQUFrQkE7OztvQkFJbEJBO29CQUNBQSxZQUFZQSxvQkFBS0E7OztvQkFHakJBLGlCQUFpQkE7b0JBQ2pCQSxjQUFZQSxPQUFLQSxBQUFxQ0EsMENBQXNCQTs7Ozs7Ozs7OzRCQzNENURBOztrRkFBdUJBOzs7Ozs7Ozs0QkNBeEJBOztrRkFBdUJBOzs7Ozs7Ozs0QkNBeEJBOztrRkFBdUJBOzs7Ozs7Ozs0QkNBcEJBOztrRkFBdUJBOzs7Ozs7Ozs0QkNBekJBOztrRkFBdUJBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFJldHlwZWQ7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgcHVibGljIGNsYXNzIEFwcFxuICAgIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcnVubmVyID0gbmV3IFJ1bm5lcigpO1xuICAgICAgICAgICAga25vY2tvdXQua28uYXBwbHlCaW5kaW5ncyhydW5uZXIpO1xuICAgICAgICAgICAgcnVubmVyLlJ1bigpO1xuXG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzXG57XG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFYXN5QXNzZXJ0c1xuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgYWN0aW9uIG11c3QgdGhyb3cgYSBzcGVjaWZpYyBleGNlcHRpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWN0aW9uXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxleGNlcHRpb24gY3JlZj1cIkVhc3lUZXN0QmFzZUV4Y2VwdGlvblwiPjwvZXhjZXB0aW9uPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgVGhyb3dzPFQ+KEFjdGlvbiBhY3Rpb24pIHdoZXJlIFQgOiBFeGNlcHRpb25cbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRocm93c0V4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiRXhwZWN0ZWQgRXhjZXB0aW9uOiB7MH0uIE5vIEV4Y3BldGlvbiBUaHJvd2VkIVwiLHR5cGVvZihUKS5OYW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoVCBleHBlY3RlZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBva1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUaHJvd3NFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIkV4Y2VwdGlvbiBvZiB0eXBlOiB7MH0gaW5zdGVhZCBvZiBFeHBlY3RlZCBFeGNlcHRpb246IHsxfVwiLGUuR2V0VHlwZSgpLk5hbWUsdHlwZW9mKFQpLk5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgdHdvIG9iamVjdCBhcmUgZXF1YWxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2Vjb25kXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFyZUVxdWFsKG9iamVjdCBvYmosIG9iamVjdCBzZWNvbmQpXG4gICAgICAgIHtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPG9iamVjdD4oICAgICAgICAgICAgb2JqLHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFzc2VydCB0aGF0IHR3byBvYmplY3QgYXJlIG5vdCBlcXVhbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQXJlTm90RXF1YWwob2JqZWN0IG9iaiwgb2JqZWN0IHNlY29uZClcbiAgICAgICAge1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8b2JqZWN0PiggICAgICAgICAgICBvYmosc2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3QgYSBleHBlY3RlZCB0byBiZSB0cnVlIGNvbmRpdGlvblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJleHBlY3Rlc1RydWVDb25kaXRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiQmVUcnVlRXhjZXB0aW9uXCI+PC9leGNlcHRpb24+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZVRydWUoRnVuYzxib29sPiBleHBlY3Rlc1RydWVDb25kaXRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBleHBlY3Rlc1RydWVDb25kaXRpb24oKTtcbiAgICAgICAgICAgIGlmKCFyZXMpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJlVHJ1ZUV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJDb25kaXRpb24gZXhwZWN0ZWQgdG8gYmUgdHJ1ZSBidXQgcmVzdWx0IGlzIEZBTFNFLlwiKSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBUZXN0IGEgZXhwZWN0ZWQgdG8gYmUgZmFsc2UgY29uZGl0aW9uXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4cGVjdGVzRmFsc2VDb25kaXRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiQmVGYWxzZUV4Y2VwdGlvblwiPjwvZXhjZXB0aW9uPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2hvdWxkQmVGYWxzZShGdW5jPGJvb2w+IGV4cGVjdGVzRmFsc2VDb25kaXRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBleHBlY3Rlc0ZhbHNlQ29uZGl0aW9uKCk7XG4gICAgICAgICAgICBpZihyZXMpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJlRmFsc2VFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChzdHJpbmcuRm9ybWF0KFwiQ29uZGl0aW9uIGV4cGVjdGVkIHRvIGJlIGZhbHNlIGJ1dCByZXN1bHQgaXMgVFJVRS5cIikpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBDT21wYXJlIG9ialxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvMVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm8yXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIE9iamVjdEVxdWFsKG9iamVjdCBvMSwgb2JqZWN0IG8yKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAobzEgPT0gbnVsbCAmJiBvMiAhPSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAobzEgIT0gbnVsbCAmJiBvMiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBvMSA9PSBudWxsIHx8IG8xLkVxdWFscyhvMik7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBJZiBvYmogaXMgbnVsbCByZXR1cm4gJ251bGwnIGVsc2UgdG9zdHJpbmdcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgVG9Db21wYXJlU3RyaW5nKHRoaXMgb2JqZWN0IG9iailcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiA9PSBudWxsID8gXCJudWxsXCIgOiBvYmouVG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnM7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFNob3VsZEV4dGVuc2lvbnNcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3QgZXF1YWxzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZE9ialwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZUVxdWFsczxUPih0aGlzIFQgb2JqLCBUIHNlY29uZE9iailcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVxdWFsID0gRWFzeUFzc2VydHMuT2JqZWN0RXF1YWwob2JqLCBzZWNvbmRPYmopO1xuXG4gICAgICAgICAgICBpZiAoIWVxdWFsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcXVhbEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCB7MH0uIFZhbHVlOiB7MX1cIixzZWNvbmRPYmouVG9Db21wYXJlU3RyaW5nKCksb2JqLlRvQ29tcGFyZVN0cmluZygpKSkpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3Qgbm90IGVxdWFsc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRPYmpcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2hvdWxkQmVOb3RFcXVhbHM8VD4odGhpcyBUIG9iaiwgVCBzZWNvbmRPYmopXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcXVhbCA9IEVhc3lBc3NlcnRzLk9iamVjdEVxdWFsKG9iaiwgc2Vjb25kT2JqKTtcblxuICAgICAgICAgICAgaWYgKGVxdWFsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RFcXVhbEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCB7MH0gZGlmZmVyZW50IGZyb20gezF9LiBBcmUgRXF1YWwhXCIsc2Vjb25kT2JqLlRvQ29tcGFyZVN0cmluZygpLG9iai5Ub0NvbXBhcmVTdHJpbmcoKSkpKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzXG57XG4gICAgXG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBdHRyaWJ1dGUgZm9yIHRlc3QgY2xhc3NcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIFtTeXN0ZW0uQXR0cmlidXRlVXNhZ2UoU3lzdGVtLkF0dHJpYnV0ZVRhcmdldHMuQ2xhc3MpXSBcbiAgICBwdWJsaWMgY2xhc3MgVGVzdEF0dHJpYnV0ZSA6IEF0dHJpYnV0ZVxuICAgIHtcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvbiB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgVGVzdEF0dHJpYnV0ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRlc3RBdHRyaWJ1dGUoc3RyaW5nIGRlc2NyaXB0aW9uIClcbiAgICAgICAge1xuICAgICAgICAgICAgRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXNcbntcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIEF0dHJpYnV0ZSBmb3IgdGVzdCBNZXRob2RcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIFtTeXN0ZW0uQXR0cmlidXRlVXNhZ2UoU3lzdGVtLkF0dHJpYnV0ZVRhcmdldHMuTWV0aG9kKV0gXG4gICAgcHVibGljIGNsYXNzIFRlc3RNZXRob2RBdHRyaWJ1dGUgOiBBdHRyaWJ1dGVcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFRlc3RNZXRob2RBdHRyaWJ1dGUoc3RyaW5nIGRlc2NyaXB0aW9uID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcbntcbiAgICBwdWJsaWMgY2xhc3MgRWFzeVRlc3RCYXNlRXhjZXB0aW9uIDogRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBwdWJsaWMgRWFzeVRlc3RCYXNlRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSkgXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIGludGVybmFsIGNsYXNzIFJ1bm5lclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBMaXN0PFRlc3REZXNjcmlwdG9yPiBfaW50ZXJuYWxUZXN0cyA9IG5ldyBMaXN0PFRlc3REZXNjcmlwdG9yPigpO1xuICAgICAgICBcbiAgICAgICAgcHVibGljIHN0cmluZyBCcm93c2VySW5mbyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+VGVzdHM7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PlRvdGFsVGVzdHM7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PkZhaWxlZFRlc3RzO1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5QYXNzZWRUZXN0cztcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+VG90YWxUaW1lO1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+UnVubmluZztcbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5IaWRlUGFzc2VkO1xuXG5cbiAgICAgICAgcHVibGljIFJ1bm5lcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuVGVzdHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPFRlc3REZXNjcmlwdG9yPigpO1xuICAgICAgICAgICAgdGhpcy5Ub3RhbFRlc3RzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigpO1xuICAgICAgICAgICAgdGhpcy5GYWlsZWRUZXN0cyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuUGFzc2VkVGVzdHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLlRvdGFsVGltZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oKTtcbiAgICAgICAgICAgIHRoaXMuUnVubmluZyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuQnJvd3NlckluZm8gPSBHbG9iYWwuTmF2aWdhdG9yLkFwcFZlcnNpb247XG5cbiAgICAgICAgICAgIC8vIGhpZGUgcGFzc2VkIHRlc3QgbWFuYWdlbWVudFxuICAgICAgICAgICAgdGhpcy5IaWRlUGFzc2VkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5IaWRlUGFzc2VkLnN1YnNjcmliZSgoZ2xvYmFsOjpSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0U3Vic2NyaWJhYmxlPGJvb2w+LnN1YnNjcmliZUZuKSh2YWx1ZSA9PlxuICAgICAgICAgICAge1xuU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KCAgICAgICAgICAgICAgICB0aGlzLlRlc3RzLlNlbGYoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGJvb2w+KSh3PT53LlN1Y2Nlc3MpKS5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPikoZj0+Zi5WaXNpYmxlLlNlbGYoIXZhbHVlKSkpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgXG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gUnVuIHRlc3RzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyB2b2lkIFJ1bigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuUnVubmluZy5TZWxmKHRydWUpO1xuXG4gICAgICAgICAgICB0aGlzLkRpc2NvdmVyVGVzdCgpOyAvLyBkaXNjb3ZlcnkgYWxsIHRlc3RzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuVG90YWxUZXN0cy5TZWxmKHRoaXMuX2ludGVybmFsVGVzdHMuQ291bnQpOyAvLyB0b3RhbCB0ZXN0cyBmb3VuZFxuICAgICAgICAgICAgdGhpcy5SdW5UZXN0cygpOyAvLyBydW4gYWxsIHRlc3QgZm9yIGVhY2ggZ3JvdXBcblxuICAgICAgICAgICAgdGhpcy5GYWlsZWRUZXN0cy5TZWxmKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQ291bnQ8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPih0aGlzLl9pbnRlcm5hbFRlc3RzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgYm9vbD4pKGM9PiFjLlN1Y2Nlc3MpKSk7IC8vIGZhaWxlZCB0ZXN0c1xuICAgICAgICAgICAgdGhpcy5QYXNzZWRUZXN0cy5TZWxmKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQ291bnQ8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPih0aGlzLl9pbnRlcm5hbFRlc3RzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgYm9vbD4pKGM9PmMuU3VjY2VzcykpKTsgLy8gcGFzc2VkIFRlc3RzXG4gICAgICAgICAgICB0aGlzLlRvdGFsVGltZS5TZWxmKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU3VtPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4odGhpcy5UZXN0cy5TZWxmKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBpbnQ+KShzID0+IHMuVGltZSkpKTtcblxuICAgICAgICAgICAgdGhpcy5SdW5uaW5nLlNlbGYoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biBcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJ1blRlc3RzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxUZXN0cy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPikoZiA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGYuUnVuVGVzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuVGVzdHMucHVzaChmKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIERpc2NvdmVyeSBhbGwgdGVzdHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIERpc2NvdmVyVGVzdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0eXBlcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0TWFueTxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLkFzc2VtYmx5LGdsb2JhbDo6U3lzdGVtLlR5cGU+KEFwcERvbWFpbi5DdXJyZW50RG9tYWluLkdldEFzc2VtYmxpZXMoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLkFzc2VtYmx5LCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLklFbnVtZXJhYmxlPGdsb2JhbDo6U3lzdGVtLlR5cGU+PikocyA9PiBzLkdldFR5cGVzKCkpKVxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodz0+IXcuRnVsbE5hbWUuVG9Mb3dlcigpLlN0YXJ0c1dpdGgoXCJzeXN0ZW1cIikpKVxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodz0+IXcuSXNJbnRlcmZhY2UgJiYgIXcuSXNBYnN0cmFjdCkpXG4gICAgICAgICAgICAgICAgLldoZXJlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR5cGUsIGJvb2w+KSh3PT5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxvYmplY3Q+KHcuR2V0Q3VzdG9tQXR0cmlidXRlcyh0eXBlb2YoVGVzdEF0dHJpYnV0ZSksdHJ1ZSkpKSlcbiAgICAgICAgICAgICAgICAuVG9MaXN0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHJ1biBhbGwgdGVzdHMgbWV0aG9kXG4gICAgICAgICAgICB0eXBlcy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uVHlwZT4pKGYgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVzdEF0dCA9IChUZXN0QXR0cmlidXRlKVN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8b2JqZWN0PihmLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RBdHRyaWJ1dGUpLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB2YXIgdGVzdE1ldGhvZHMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbz4oZi5HZXRNZXRob2RzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5NZXRob2RJbmZvLCBib29sPikodyA9PiB3LklzUHVibGljKSlcbiAgICAgICAgICAgICAgICAgICAgLldoZXJlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbywgYm9vbD4pKHcgPT4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8b2JqZWN0Pih3LkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RNZXRob2RBdHRyaWJ1dGUpLCB0cnVlKSkpKS5Ub0xpc3QoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0ZXN0TWV0aG9kcy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5NZXRob2RJbmZvPikobWV0aG9kID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IChUZXN0TWV0aG9kQXR0cmlidXRlKSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PG9iamVjdD4obWV0aG9kLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RNZXRob2RBdHRyaWJ1dGUpLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdERlc2NyID0gbmV3IFRlc3REZXNjcmlwdG9yXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFR5cGUgPSBmLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWV0aG9kID0gbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgR3JvdXAgPSBmLk5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBHcm91cERlc2NyaXB0aW9uID0gc3RyaW5nLklzTnVsbE9yRW1wdHkodGVzdEF0dC5EZXNjcmlwdGlvbikgPyBzdHJpbmcuRW1wdHkgOiBzdHJpbmcuRm9ybWF0KFwiW3swfV1cIix0ZXN0QXR0LkRlc2NyaXB0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE5hbWUgPSBtZXRob2QuTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE5hbWVEZXNjcmlwdGlvbiA9IHN0cmluZy5Jc051bGxPckVtcHR5KGF0dHIuRGVzY3JpcHRpb24pID8gc3RyaW5nLkVtcHR5IDogc3RyaW5nLkZvcm1hdChcIlt7MH1dXCIsYXR0ci5EZXNjcmlwdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcm5hbFRlc3RzLkFkZCh0ZXN0RGVzY3IpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uRGlhZ25vc3RpY3M7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzO1xudXNpbmcgUmV0eXBlZC5QcmltaXRpdmU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgaW50ZXJuYWwgY2xhc3MgVGVzdERlc2NyaXB0b3JcbiAgICB7XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lRGVzY3JpcHRpb24geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdyb3VwIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIHN0cmluZyBHcm91cERlc2NyaXB0aW9uIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgVHlwZSBUeXBlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIE1ldGhvZEluZm8gTWV0aG9kIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBFeGNlcHRpb24gRmFpbEFzc2VydCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBib29sIFN1Y2Nlc3Mge2dldHtyZXR1cm4gRmFpbEFzc2VydCA9PSBudWxsO319XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBFcnJvciB7Z2V0e3JldHVybiBGYWlsQXNzZXJ0ID09IG51bGwgPyBzdHJpbmcuRW1wdHkgOiBzdHJpbmcuRm9ybWF0KFwiezB9OiB7MX1cIixGYWlsQXNzZXJ0LkdldFR5cGUoKS5OYW1lLEZhaWxBc3NlcnQuTWVzc2FnZSk7fX1cbiAgICAgICAgcHVibGljIHN0cmluZyBTdGFjayB7Z2V0e3JldHVybiBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLEZhaWxBc3NlcnQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxFeGNlcHRpb24+KFwia2V5MVwiKS5TdGFja1RyYWNlOihzdHJpbmcpbnVsbDt9fVxuICAgICAgICBcbiAgICAgICAgcHVibGljIGludCBUaW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+VmlzaWJsZSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFRlc3REZXNjcmlwdG9yKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5WaXNpYmxlID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4odHJ1ZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biB0ZXN0LlxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBSdW5UZXN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gQWN0aXZhdG9yLkNyZWF0ZUluc3RhbmNlKHRoaXMuVHlwZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB3YXRjaCA9IG5ldyBTdG9wd2F0Y2goKTtcbiAgICAgICAgICAgIHdhdGNoLlN0YXJ0KCk7XG5cbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuTWV0aG9kLkludm9rZShpbnN0YW5jZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5GYWlsQXNzZXJ0ID0gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3YXRjaC5TdG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5UaW1lID0gKGludCl3YXRjaC5FbGFwc2VkTWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIG9mIHR5cGUgaXMgZGlzcG9zYWJsZVxuICAgICAgICAgICAgICAgIHZhciBkaXNwb3NhYmxlID0gaW5zdGFuY2UgYXMgSURpc3Bvc2FibGU7XG4gICAgICAgICAgICAgICAgZGlzcG9zYWJsZSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+ZGlzcG9zYWJsZS5EaXNwb3NlKCkpOm51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXG57XG4gICAgcHVibGljIGNsYXNzIEJlRmFsc2VFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBCZUZhbHNlRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcbntcbiAgICBwdWJsaWMgY2xhc3MgQmVUcnVlRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBwdWJsaWMgQmVUcnVlRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcbntcbiAgICBwdWJsaWMgY2xhc3MgRXF1YWxFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBFcXVhbEV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXG57XG4gICAgcHVibGljIGNsYXNzIE5vdEVxdWFsRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBwdWJsaWMgTm90RXF1YWxFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKVxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xue1xuICAgIHB1YmxpYyBjbGFzcyBUaHJvd3NFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBUaHJvd3NFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKVxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG59Il0KfQo=
