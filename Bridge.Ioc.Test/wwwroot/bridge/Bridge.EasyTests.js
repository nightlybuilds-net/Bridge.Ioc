/**
 * @compiler Bridge.NET 16.6.0
 */
Bridge.assembly("Bridge.EasyTests", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.EasyTests.App", {
        main: function Main () {
            var $step = 0,
                $task1, 
                $jumpFromFinally, 
                runner, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    for (;;) {
                        $step = System.Array.min([0,1], $step);
                        switch ($step) {
                            case 0: {
                                runner = new Bridge.EasyTests.Runner();
                                $task1 = runner.Run();
                                $step = 1;
                                $task1.continueWith($asyncBody, true);
                                return;
                            }
                            case 1: {
                                $task1.getAwaitedResult();
                                return;
                            }
                            default: {
                                return;
                            }
                        }
                    }
                }, arguments);

            $asyncBody();
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

    /** @namespace Bridge.EasyTests */

    /**
     * Manage a collection of item
     Automatically sync collection with dom
     *
     * @abstract
     * @class Bridge.EasyTests.CollectionManager$1
     * @param   {Function}    [name]
     */
    Bridge.define("Bridge.EasyTests.CollectionManager$1", function (T) { return {
        fields: {
            /**
             * Items collection
             *
             * @instance
             * @public
             * @readonly
             * @memberof Bridge.EasyTests.CollectionManager$1
             * @type System.Collections.Generic.List$1
             */
            Items: null
        },
        props: {
            Count: {
                get: function () {
                    return this.Items.Count;
                }
            }
        },
        ctors: {
            init: function () {
                this.Items = new (System.Collections.Generic.List$1(System.Object)).ctor();
            }
        },
        methods: {
            getItem: function (index) {
                return this.Items.getItem(index);
            },
            setItem: function (index, value) {
                this.Items.setItem(index, value);
            },
            /**
             * Called when the new HTMLElement is generated.
             Default is AppendChild to Container.
             *
             * @instance
             * @protected
             * @this Bridge.EasyTests.CollectionManager$1
             * @memberof Bridge.EasyTests.CollectionManager$1
             * @param   {System.Object}    addedElement
             * @return  {void}
             */
            DomActionOnAdd: function (addedElement) {
                addedElement.item2.forEach(Bridge.fn.bind(this, function (f) {
                    this.Container.appendChild(f);
                }));
            },
            AddRange: function (items) {
                var $t;
                $t = Bridge.getEnumerator(items, T);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        this.Add(item);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            Add: function (item) {
                var internalItem = { item1: item, item2: this.GenerateElement(item) };
                this.Items.add(internalItem);

                this.DomActionOnAdd(internalItem);
            },
            Clear: function () {
                var $t;
                // remove all elements from dom
                $t = Bridge.getEnumerator(this.Items);
                try {
                    while ($t.moveNext()) {
                        var tuple = $t.Current;
                        // cannot use tuple.Item2.Remove(); ** not supported on EDGE/IE **
                        tuple.item2.forEach(Bridge.fn.bind(this, function (f) {
                            this.Container.removeChild(f);
                        }));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                this.Items.clear();
            },
            Contains: function (item) {
                return System.Linq.Enumerable.from(this.Items).select(function (s) {
                        return s.item1;
                    }).contains(item);
            },
            Remove: function (item) {
                if (!this.Contains(item)) {
                    return false;
                }

                var internalItem = System.Linq.Enumerable.from(this.Items).first(function (f) {
                        return Bridge.equals(f.item1, item);
                    });

                // cannot use tuple.Item2.Remove(); ** not supported on EDGE/IE **
                internalItem.item2.forEach(Bridge.fn.bind(this, function (f) {
                    this.Container.removeChild(f);
                }));

                var res = this.Items.remove(internalItem);

                return res;
            },
            IndexOf: function (item) {
                try {
                    return this.Items.indexOf(System.Linq.Enumerable.from(this.Items).first(function (f) {
                            return Bridge.equals(f.item1, item);
                        }));
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    return -1;
                }
            }
        }
    }; });

    Bridge.define("Bridge.EasyTests.Exceptions.EasyTestBaseException", {
        inherits: [System.Exception],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                System.Exception.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.PippoException", {
        inherits: [System.Exception]
    });

    Bridge.define("Bridge.EasyTests.prova2", {
        methods: {
            ShouldBeEquals_void: function () {
                var t = 2;
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Int32, t, 3);

            },
            ShouldBeEquals_task_delay_200: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    t, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = System.Threading.Tasks.Task.delay(200);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        t = 2;
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Int32, t, 3);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            AwaitError: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = System.Threading.Tasks.Task.delay(1500);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        throw new System.Exception("Error thorwed");
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            TestShouldBeTrue: function () {
                Bridge.EasyTests.Asserts.EasyAsserts.ShouldBeTrue(function () {
                    return false;
                });
            },
            NotEqual: function () {
                var t = 2;
                var c = 5;

                var r = (t + c) | 0;
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(System.Int32, r, 8);
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Int32, r, 7);

                Bridge.EasyTests.Asserts.EasyAsserts.Throws(Bridge.EasyTests.PippoException, function () {
                    throw new Bridge.EasyTests.PippoException();
                });

            }
        }
    });

    Bridge.define("Bridge.EasyTests.Runner", {
        fields: {
            _internalTests: null,
            _runnerViewModel: null
        },
        ctors: {
            init: function () {
                this._internalTests = new (System.Collections.Generic.List$1(Bridge.EasyTests.TestDescriptor)).ctor();
            },
            ctor: function () {
                this.$initialize();
                this._runnerViewModel = new Bridge.EasyTests.RunnerViewModel();
                this._runnerViewModel.BrowserInfo = Bridge.global.navigator.appVersion;
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
             * @return  {System.Threading.Tasks.Task}
             */
            Run: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this._runnerViewModel.Running = true;

                                        this.DiscoverTest(); // discovery all tests

                                        this._runnerViewModel.TotalTests = this._internalTests.Count; // total tests found
                                        $task1 = this.RunTests();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        // run all test 

                                        //            this._runnerViewModel.FailedTests = this._internalTests.Count(c=>!c.Success); // failed tests
                                        //            this._runnerViewModel.PassedTests = this._internalTests.Count(c=>c.Success); // passed Tests
                                        //            this._runnerViewModel.TotalTime = this._runnerViewModel.Tests.Items.Sum(s=>s.Item1.Time);

                                        this._runnerViewModel.Running = false;
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Run
             *
             * @instance
             * @private
             * @this Bridge.EasyTests.Runner
             * @memberof Bridge.EasyTests.Runner
             * @return  {System.Threading.Tasks.Task}
             */
            RunTests: function () {
                this._internalTests.forEach(Bridge.fn.bind(this, function (f) {
                    var $step = 0,
                        $task1, 
                        f, 
                        $jumpFromFinally, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = f.RunTest();
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        this._runnerViewModel.Tests.Add(f);
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                }));
                return System.Threading.Tasks.Task.fromResult(0);
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

                        var testDescr = ($t = new Bridge.EasyTests.TestDescriptor(), $t.Type = f, $t.Method = method, $t.Group = Bridge.Reflection.getTypeName(f), $t.GroupDescription = System.String.isNullOrEmpty(testAtt.Description) ? "" : testAtt.Description, $t.Name = method.n, $t.NameDescription = System.String.isNullOrEmpty(attr.Description) ? "" : attr.Description, $t);

                        this._internalTests.add(testDescr);

                        testDescr.addOnTestComplete(Bridge.fn.cacheBind(this, this.TestDescrOnOnTestComplete));
                    }));

                }));
            },
            TestDescrOnOnTestComplete: function (sender, eventArgs) {
                var completedTest = System.Linq.Enumerable.from(this._internalTests).where(function (w) {
                        return w.Completed;
                    });
                this._runnerViewModel.FailedTests = completedTest.count(function (c) {
                    return !c.Success;
                }); // failed tests
                this._runnerViewModel.PassedTests = completedTest.count(function (c) {
                    return c.Success;
                }); // passed Tests
                this._runnerViewModel.TotalTime = System.Linq.Enumerable.from(this._runnerViewModel.Tests.Items).sum(function (s) {
                        return s.item1.Time;
                    });
                if (System.Linq.Enumerable.from(this._internalTests).count() === completedTest.count()) {
                    this._runnerViewModel.SetAllTestRunned();
                }
            }
        }
    });

    Bridge.define("Bridge.EasyTests.RunnerViewModel", {
        fields: {
            _totalTests: null,
            _passedTests: null,
            _failedTests: null,
            _totalTime: null,
            _browserInfo: null,
            _loader: null,
            _inRunning: null,
            Tests: null,
            HidePassed: null
        },
        props: {
            /**
             * Test are running
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function Running
             * @type boolean
             */
            Running: {
                set: function (value) {
                    this._loader.hidden = !value;
                }
            },
            /**
             * Total tests
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function TotalTests
             * @type number
             */
            TotalTests: {
                set: function (value) {
                    this._totalTests.innerHTML = System.String.format("{0} tests", [Bridge.box(value, System.Int32)]);
                }
            },
            /**
             * Passed tests count
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function PassedTests
             * @type number
             */
            PassedTests: {
                set: function (value) {
                    this._passedTests.innerHTML = System.String.format("{0} passed", [Bridge.box(value, System.Int32)]);
                }
            },
            /**
             * Failed tests count
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function FailedTests
             * @type number
             */
            FailedTests: {
                set: function (value) {
                    this._failedTests.innerHTML = System.String.format("{0} failed", [Bridge.box(value, System.Int32)]);
                }
            },
            /**
             * Total time
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function TotalTime
             * @type number
             */
            TotalTime: {
                set: function (value) {
                    this._totalTime.innerHTML = System.String.format("Tests completed in {0} ms", [Bridge.box(value, System.Int32)]);
                }
            },
            /**
             * Browser info
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function BrowserInfo
             * @type string
             */
            BrowserInfo: {
                set: function (value) {
                    this._browserInfo.innerHTML = value;
                }
            }
        },
        ctors: {
            init: function () {
                this._totalTests = document.getElementById("totalTests");
                this._passedTests = document.getElementById("passedTests");
                this._failedTests = document.getElementById("failedTests");
                this._totalTime = document.getElementById("totalTime");
                this._browserInfo = document.getElementById("browserInfo");
                this._loader = document.getElementById("loader");
                this._inRunning = document.getElementById("inRunning");
                this.Tests = new Bridge.EasyTests.TestsCollectionManager();
            },
            ctor: function () {
                this.$initialize();
                var hidePassed = document.getElementById("hidePassedTests");
                hidePassed.onchange = Bridge.fn.combine(hidePassed.onchange, function (e) {
                    var $t;
                    var isChecked = hidePassed.checked;
                    var toHide = document.getElementsByClassName("passedTest");
                    $t = Bridge.getEnumerator(toHide);
                    try {
                        while ($t.moveNext()) {
                            var htmlElement = $t.Current;
                            htmlElement.hidden = isChecked;
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }});
            }
        },
        methods: {
            /**
             * Set all test completed
             *
             * @instance
             * @public
             * @this Bridge.EasyTests.RunnerViewModel
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @return  {void}
             */
            SetAllTestRunned: function () {
                this._inRunning.hidden = true;
            }
        }
    });

    Bridge.define("Bridge.EasyTests.TestDescriptor", {
        fields: {
            Completed: false,
            Name: null,
            NameDescription: null,
            Group: null,
            GroupDescription: null,
            Type: null,
            Method: null,
            FailAssert: null,
            Time: 0
        },
        events: {
            OnTestComplete: null
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
        methods: {
            /**
             * Run test.
             *
             * @instance
             * @public
             * @this Bridge.EasyTests.TestDescriptor
             * @memberof Bridge.EasyTests.TestDescriptor
             * @return  {System.Threading.Tasks.Task}
             */
            RunTest: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    isTask, 
                    instance, 
                    watch, 
                    e, 
                    $async_e, 
                    disposable, 
                    $async_e1, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5,6,7,8], $step);
                                switch ($step) {
                                    case 0: {
                                        // check if method return rask await
                                        isTask = Bridge.referenceEquals(this.Method.rt, System.Threading.Tasks.Task);

                                        instance = Bridge.createInstance(this.Type);

                                        watch = new System.Diagnostics.Stopwatch();
                                        watch.start();

                                        
                                        $step = 1;
                                        continue;
                                    }
                                    case 1: {
                                        if (isTask) {
                                            $step = 2;
                                            continue;
                                        } else  {
                                            $step = 4;
                                            continue;
                                        }
                                    }
                                    case 2: {
                                        $task1 = Bridge.cast(Bridge.Reflection.midel(this.Method, Bridge.unbox(instance))(null), System.Threading.Tasks.Task);
                                        $step = 3;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $task1.getAwaitedResult();
                                        $step = 5;
                                        continue;
                                    }
                                    case 4: {
                                        Bridge.Reflection.midel(this.Method, Bridge.unbox(instance))(null);
                                        $step = 5;
                                        continue;
                                    }
                                    case 5: {
                                        $step = 7;
                                        continue;
                                    }
                                    case 6: {
                                        this.FailAssert = e;
                                        $async_e = null;
                                        $step = 7;
                                        continue;
                                    }
                                    case 7: {
                                        watch.stop();
                                        this.Time = System.Int64.clip32(watch.milliseconds());
                                        this.Completed = true;
                                        !Bridge.staticEquals(this.OnTestComplete, null) ? this.OnTestComplete(this, null) : null;

                                        // check of type is disposable
                                        disposable = Bridge.as(instance, System.IDisposable);
                                        disposable != null ? disposable.System$IDisposable$dispose() : null;

                                        if ($jumpFromFinally > -1) {
                                            $step = $jumpFromFinally;
                                            $jumpFromFinally = null;
                                        } else if ($async_e) {
                                            $tcs.setException($async_e);
                                            return;
                                        } else if (Bridge.isDefined($returnValue)) {
                                            $tcs.setResult($returnValue);
                                            return;
                                        }
                                        $step = 8;
                                        continue;
                                    }
                                    case 8: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            if ( $step >= 1 && $step <= 5 ) {
                                e = $async_e;
                                $step = 6;
                                $asyncBody();
                                return;
                            }
                            if ($step >= 1 && $step <= 6) {
                                $step = 7;
                                $asyncBody();
                                return;
                            }
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
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

    Bridge.define("Bridge.EasyTests.TestsCollectionManager", {
        inherits: [Bridge.EasyTests.CollectionManager$1(Bridge.EasyTests.TestDescriptor)],
        fields: {
            _count: 0,
            Container: null
        },
        ctors: {
            init: function () {
                this._count = 0;
                this.Container = document.getElementById("tableTestsList");
            }
        },
        methods: {
            GenerateElement: function (item) {
                var $t;
                var res = new (System.Collections.Generic.List$1(HTMLElement)).ctor();

                var row1 = document.createElement("tr");


                row1.classList.add(this._count % 2 === 0 ? "whiteRow" : "greyRow"); // alternate
                if (item.Success) {
                    row1.classList.add("passedTest");
                } // failed test row

                var cell1 = row1.insertCell();
                var cell2 = row1.insertCell();
                var cell3 = row1.insertCell();

                // CELL1
                cell1.className = item.Success ? "test-ok" : "test-ko";
                // row index
                cell1.appendChild(($t = document.createElement("strong"), $t.innerHTML = System.String.format("{0} {1}", Bridge.box(((this._count + 1) | 0), System.Int32), item.Name), $t));

                //            cell1.AppendChild(new HTMLSpanElement()
                //            {
                //                InnerHTML = $"{item.Name}"
                //            });

                cell1.appendChild(document.createElement("br"));

                cell1.appendChild(($t = document.createElement("i"), $t.innerHTML = System.String.format(" {0}", [item.NameDescription]), $t.className = "w3-text-grey", $t));
                // ----------

                // CELL2
                cell2.appendChild(($t = document.createElement("i"), $t.className = "fa fa-object-group", $t));

                cell2.appendChild(($t = document.createElement("span"), $t.innerHTML = System.String.format("{0}", [item.Group]), $t));

                cell2.appendChild(document.createElement("br"));


                cell2.appendChild(($t = document.createElement("i"), $t.innerHTML = System.String.format(" {0}", [item.GroupDescription]), $t.className = "w3-text-grey", $t));
                // ----------

                // CELL3
                cell3.className = "w3-right";
                cell3.appendChild(($t = document.createElement("i"), $t.className = "fa fa-clock-o", $t));

                cell3.appendChild(($t = document.createElement("span"), $t.innerHTML = System.String.format("{0} ms", [Bridge.box(item.Time, System.Int32)]), $t));
                // ----------

                this._count = (this._count + 1) | 0;
                res.add(row1);

                if (item.Success) {
                    return res;
                }

                var row2 = document.createElement("tr");

                row2.className = this._count % 2 === 0 ? "whiteRow" : "greyRow";
                var cell = row2.insertCell();

                cell.colSpan = 3;
                cell.className = "test-ko inner-row";

                cell.appendChild(($t = document.createElement("p"), $t.className = "error-message", $t)).appendChild(($t = document.createElement("i"), $t.className = "w3-text-grey", $t.innerHTML = item.Error, $t));

                cell.appendChild(($t = document.createElement("pre"), $t.innerHTML = item.Stack, $t));

                res.add(row2);

                return res;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuRWFzeVRlc3RzLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBc3NlcnRzL0Vhc3lBc3NlcnRzLmNzIiwiQXNzZXJ0cy9TaG91bGRFeHRlbnNpb25zLmNzIiwiQXR0cmlidXRlcy9UZXN0QXR0cmlidXRlLmNzIiwiQXR0cmlidXRlcy9UZXN0TWV0aG9kQXR0cmlidXRlLmNzIiwiQ29sbGVjdGlvbk1hbmFnZXIuY3MiLCJFeGNlcHRpb25zL0Vhc3lUZXN0QmFzZUV4Y2VwdGlvbi5jcyIsInByb3ZhMi5jcyIsIlJ1bm5lci5jcyIsIlJ1bm5lclZpZXdNb2RlbC5jcyIsIlRlc3REZXNjcmlwdG9yLmNzIiwiRXhjZXB0aW9ucy9CZUZhbHNlRXhjZXB0aW9uLmNzIiwiRXhjZXB0aW9ucy9CZVRydWVFeGNlcHRpb24uY3MiLCJFeGNlcHRpb25zL0VxdWFsRXhjZXB0aW9uLmNzIiwiRXhjZXB0aW9ucy9Ob3RFcXVhbEV4Y2VwdGlvbi5jcyIsIkV4Y2VwdGlvbnMvVGhyb3dzRXhjZXB0aW9uLmNzIiwiVGVzdHNDb2xsZWN0aW9uTWFuYWdlci5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBT1lBLFNBQWFBLElBQUlBO2dDQUNqQkEsU0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDS2dCQSxHQUFHQTtvQkFFekJBO3dCQUVJQTt3QkFDQUEsTUFBTUEsSUFBSUEsNENBQWdCQSx3RUFBK0RBLDhCQUFPQTs7Ozs7Ozs7Ozs0QkFRaEdBLE1BQU1BLElBQUlBLDRDQUFnQkEsa0ZBQTBFQSxrREFBaUJBLDhCQUFPQTs7Ozs7Ozs7Ozs7Ozs7O29DQVV4R0EsS0FBWUE7b0JBRWhEQSx3RUFBNkVBLEtBQUlBOzs7Ozs7Ozs7Ozs7O3VDQVExQ0EsS0FBWUE7b0JBRW5EQSwyRUFBZ0ZBLEtBQUlBOzs7Ozs7Ozs7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QUVEQTs7Z0JBR2hCQSxRQUFRQTs7Z0JBRVJBLE9BQU9BIiwKICAic291cmNlc0NvbnRlbnQiOiBbIlxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBwdWJsaWMgY2xhc3MgQXBwXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHZvaWQgTWFpbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBydW5uZXIgPSBuZXcgUnVubmVyKCk7XG4gICAgICAgICAgICBhd2FpdCBydW5uZXIuUnVuKCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzXG57XG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFYXN5QXNzZXJ0c1xuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgYWN0aW9uIG11c3QgdGhyb3cgYSBzcGVjaWZpYyBleGNlcHRpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWN0aW9uXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxleGNlcHRpb24gY3JlZj1cIkVhc3lUZXN0QmFzZUV4Y2VwdGlvblwiPjwvZXhjZXB0aW9uPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgVGhyb3dzPFQ+KEFjdGlvbiBhY3Rpb24pIHdoZXJlIFQgOiBFeGNlcHRpb25cbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRocm93c0V4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiRXhwZWN0ZWQgRXhjZXB0aW9uOiB7MH0uIE5vIEV4Y3BldGlvbiBUaHJvd2VkIVwiLHR5cGVvZihUKS5OYW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoVCBleHBlY3RlZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBva1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUaHJvd3NFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIkV4Y2VwdGlvbiBvZiB0eXBlOiB7MH0gaW5zdGVhZCBvZiBFeHBlY3RlZCBFeGNlcHRpb246IHsxfVwiLGUuR2V0VHlwZSgpLk5hbWUsdHlwZW9mKFQpLk5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgdHdvIG9iamVjdCBhcmUgZXF1YWxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2Vjb25kXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFyZUVxdWFsKG9iamVjdCBvYmosIG9iamVjdCBzZWNvbmQpXG4gICAgICAgIHtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPG9iamVjdD4oICAgICAgICAgICAgb2JqLHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFzc2VydCB0aGF0IHR3byBvYmplY3QgYXJlIG5vdCBlcXVhbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQXJlTm90RXF1YWwob2JqZWN0IG9iaiwgb2JqZWN0IHNlY29uZClcbiAgICAgICAge1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8b2JqZWN0PiggICAgICAgICAgICBvYmosc2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3QgYSBleHBlY3RlZCB0byBiZSB0cnVlIGNvbmRpdGlvblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJleHBlY3Rlc1RydWVDb25kaXRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiQmVUcnVlRXhjZXB0aW9uXCI+PC9leGNlcHRpb24+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZVRydWUoRnVuYzxib29sPiBleHBlY3Rlc1RydWVDb25kaXRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBleHBlY3Rlc1RydWVDb25kaXRpb24oKTtcbiAgICAgICAgICAgIGlmKCFyZXMpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJlVHJ1ZUV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJDb25kaXRpb24gZXhwZWN0ZWQgdG8gYmUgdHJ1ZSBidXQgcmVzdWx0IGlzIEZBTFNFLlwiKSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBUZXN0IGEgZXhwZWN0ZWQgdG8gYmUgZmFsc2UgY29uZGl0aW9uXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4cGVjdGVzRmFsc2VDb25kaXRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiQmVGYWxzZUV4Y2VwdGlvblwiPjwvZXhjZXB0aW9uPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2hvdWxkQmVGYWxzZShGdW5jPGJvb2w+IGV4cGVjdGVzRmFsc2VDb25kaXRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBleHBlY3Rlc0ZhbHNlQ29uZGl0aW9uKCk7XG4gICAgICAgICAgICBpZihyZXMpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJlRmFsc2VFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChzdHJpbmcuRm9ybWF0KFwiQ29uZGl0aW9uIGV4cGVjdGVkIHRvIGJlIGZhbHNlIGJ1dCByZXN1bHQgaXMgVFJVRS5cIikpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBDT21wYXJlIG9ialxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvMVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm8yXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIE9iamVjdEVxdWFsKG9iamVjdCBvMSwgb2JqZWN0IG8yKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAobzEgPT0gbnVsbCAmJiBvMiAhPSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAobzEgIT0gbnVsbCAmJiBvMiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBvMSA9PSBudWxsIHx8IG8xLkVxdWFscyhvMik7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBJZiBvYmogaXMgbnVsbCByZXR1cm4gJ251bGwnIGVsc2UgdG9zdHJpbmdcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgVG9Db21wYXJlU3RyaW5nKHRoaXMgb2JqZWN0IG9iailcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiA9PSBudWxsID8gXCJudWxsXCIgOiBvYmouVG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnM7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFNob3VsZEV4dGVuc2lvbnNcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3QgZXF1YWxzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZE9ialwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZUVxdWFsczxUPih0aGlzIFQgb2JqLCBUIHNlY29uZE9iailcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVxdWFsID0gRWFzeUFzc2VydHMuT2JqZWN0RXF1YWwob2JqLCBzZWNvbmRPYmopO1xuXG4gICAgICAgICAgICBpZiAoIWVxdWFsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcXVhbEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCB7MH0uIFZhbHVlOiB7MX1cIixzZWNvbmRPYmouVG9Db21wYXJlU3RyaW5nKCksb2JqLlRvQ29tcGFyZVN0cmluZygpKSkpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3Qgbm90IGVxdWFsc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRPYmpcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2hvdWxkQmVOb3RFcXVhbHM8VD4odGhpcyBUIG9iaiwgVCBzZWNvbmRPYmopXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcXVhbCA9IEVhc3lBc3NlcnRzLk9iamVjdEVxdWFsKG9iaiwgc2Vjb25kT2JqKTtcblxuICAgICAgICAgICAgaWYgKGVxdWFsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RFcXVhbEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCB7MH0gZGlmZmVyZW50IGZyb20gezF9LiBBcmUgRXF1YWwhXCIsc2Vjb25kT2JqLlRvQ29tcGFyZVN0cmluZygpLG9iai5Ub0NvbXBhcmVTdHJpbmcoKSkpKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzXG57XG4gICAgXG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBdHRyaWJ1dGUgZm9yIHRlc3QgY2xhc3NcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIFtTeXN0ZW0uQXR0cmlidXRlVXNhZ2UoU3lzdGVtLkF0dHJpYnV0ZVRhcmdldHMuQ2xhc3MpXSBcbiAgICBwdWJsaWMgY2xhc3MgVGVzdEF0dHJpYnV0ZSA6IEF0dHJpYnV0ZVxuICAgIHtcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvbiB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgVGVzdEF0dHJpYnV0ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRlc3RBdHRyaWJ1dGUoc3RyaW5nIGRlc2NyaXB0aW9uIClcbiAgICAgICAge1xuICAgICAgICAgICAgRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXNcbntcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIEF0dHJpYnV0ZSBmb3IgdGVzdCBNZXRob2RcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIFtTeXN0ZW0uQXR0cmlidXRlVXNhZ2UoU3lzdGVtLkF0dHJpYnV0ZVRhcmdldHMuTWV0aG9kKV0gXG4gICAgcHVibGljIGNsYXNzIFRlc3RNZXRob2RBdHRyaWJ1dGUgOiBBdHRyaWJ1dGVcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFRlc3RNZXRob2RBdHRyaWJ1dGUoc3RyaW5nIGRlc2NyaXB0aW9uID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gTWFuYWdlIGEgY29sbGVjdGlvbiBvZiBpdGVtXG4gICAgLy8vIEF1dG9tYXRpY2FsbHkgc3luYyBjb2xsZWN0aW9uIHdpdGggZG9tXG4gICAgLy8vIFxuICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICBpbnRlcm5hbCBhYnN0cmFjdCBjbGFzcyBDb2xsZWN0aW9uTWFuYWdlcjxUPiBcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEl0ZW1zIGNvbGxlY3Rpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHJlYWRvbmx5IExpc3Q8VHVwbGU8VCwgTGlzdDxIVE1MRWxlbWVudD4+PiBJdGVtcyA9IG5ldyBMaXN0PFR1cGxlPFQsIExpc3Q8SFRNTEVsZW1lbnQ+Pj4oKTtcblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZW5lcmF0ZSBhIEh0bWxFbGVtZW50IGZyb20gVCBpdGVtXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIml0ZW1cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgTGlzdDxIVE1MRWxlbWVudD4gR2VuZXJhdGVFbGVtZW50KFQgaXRlbSk7XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQ2FsbGVkIHdoZW4gdGhlIG5ldyBIVE1MRWxlbWVudCBpcyBnZW5lcmF0ZWQuXG4gICAgICAgIC8vLyBEZWZhdWx0IGlzIEFwcGVuZENoaWxkIHRvIENvbnRhaW5lci5cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWRkZWRFbGVtZW50XCI+PC9wYXJhbT5cbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBEb21BY3Rpb25PbkFkZChUdXBsZTxULCBMaXN0PEhUTUxFbGVtZW50Pj4gYWRkZWRFbGVtZW50KVxuICAgICAgICB7XG4gICAgICAgICAgICBhZGRlZEVsZW1lbnQuSXRlbTIuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50PikoZiA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuQ29udGFpbmVyLkFwcGVuZENoaWxkKGYpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQ29udGFpbmVyIGVsZW1lbnQgZm9yIGNvbGxlY3Rpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIGFic3RyYWN0IEhUTUxFbGVtZW50IENvbnRhaW5lciB7IGdldDsgfVxuXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgQWRkUmFuZ2UoSUVudW1lcmFibGU8VD4gaXRlbXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGl0ZW1zKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuQWRkKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBBZGQoVCBpdGVtKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaW50ZXJuYWxJdGVtID0gbmV3IFR1cGxlPFQsIExpc3Q8SFRNTEVsZW1lbnQ+PihpdGVtLCB0aGlzLkdlbmVyYXRlRWxlbWVudChpdGVtKSk7XG4gICAgICAgICAgICB0aGlzLkl0ZW1zLkFkZChpbnRlcm5hbEl0ZW0pO1xuXG4gICAgICAgICAgICB0aGlzLkRvbUFjdGlvbk9uQWRkKGludGVybmFsSXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIENsZWFyKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBlbGVtZW50cyBmcm9tIGRvbVxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHR1cGxlIGluIHRoaXMuSXRlbXMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gY2Fubm90IHVzZSB0dXBsZS5JdGVtMi5SZW1vdmUoKTsgKiogbm90IHN1cHBvcnRlZCBvbiBFREdFL0lFICoqXG4gICAgICAgICAgICAgICAgdHVwbGUuSXRlbTIuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50PikoZiA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db250YWluZXIuUmVtb3ZlQ2hpbGQoZik7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLkl0ZW1zLkNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhUIGl0ZW0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdDxnbG9iYWw6OlN5c3RlbS5UdXBsZTxULCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+PixUPih0aGlzLkl0ZW1zLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR1cGxlPFQsIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuTGlzdDxnbG9iYWw6OkJyaWRnZS5IdG1sNS5IVE1MRWxlbWVudD4+LCBUPikocyA9PiBzLkl0ZW0xKSkuQ29udGFpbnMoaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIFJlbW92ZShUIGl0ZW0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5Db250YWlucyhpdGVtKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB2YXIgaW50ZXJuYWxJdGVtID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxnbG9iYWw6OlN5c3RlbS5UdXBsZTxULCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+Pj4odGhpcy5JdGVtcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UdXBsZTxULCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+PiwgYm9vbD4pKGYgPT4gZi5JdGVtMS5FcXVhbHMoaXRlbSkpKTtcblxuICAgICAgICAgICAgLy8gY2Fubm90IHVzZSB0dXBsZS5JdGVtMi5SZW1vdmUoKTsgKiogbm90IHN1cHBvcnRlZCBvbiBFREdFL0lFICoqXG4gICAgICAgICAgICBpbnRlcm5hbEl0ZW0uSXRlbTIuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50PikoZiA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuQ29udGFpbmVyLlJlbW92ZUNoaWxkKGYpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB2YXIgcmVzID0gdGhpcy5JdGVtcy5SZW1vdmUoaW50ZXJuYWxJdGVtKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbnQgQ291bnQge2dldHtyZXR1cm4gdGhpcy5JdGVtcy5Db3VudDt9fVxuICAgICAgICBwdWJsaWMgaW50IEluZGV4T2YoVCBpdGVtKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtcy5JbmRleE9mKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8VCwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4+KHRoaXMuSXRlbXMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8VCwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4sIGJvb2w+KShmID0+IGYuSXRlbTEuRXF1YWxzKGl0ZW0pKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2hcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBUdXBsZTxULCBMaXN0PEhUTUxFbGVtZW50Pj4gdGhpc1tpbnQgaW5kZXhdXG4gICAgICAgIHtcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB0aGlzLkl0ZW1zW2luZGV4XTsgfVxuICAgICAgICAgICAgc2V0IHsgdGhpcy5JdGVtc1tpbmRleF0gPSB2YWx1ZTsgfVxuICAgICAgICB9XG5cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXG57XG4gICAgcHVibGljIGNsYXNzIEVhc3lUZXN0QmFzZUV4Y2VwdGlvbiA6IEV4Y2VwdGlvblxuICAgIHtcbiAgICAgICAgcHVibGljIEVhc3lUZXN0QmFzZUV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpIFxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZztcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHM7XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXM7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgW1Rlc3RdXG4gICAgcHVibGljIGNsYXNzIHByb3ZhMiBcbiAgICB7XG4gICAgICAgIFtUZXN0TWV0aG9kXVxuICAgICAgICBwdWJsaWMgdm9pZCBTaG91bGRCZUVxdWFsc192b2lkKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHQgPSAyO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8aW50PiggICAgICAgICAgICB0LDMpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFtUZXN0TWV0aG9kXVxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBTaG91bGRCZUVxdWFsc190YXNrX2RlbGF5XzIwMCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGF3YWl0IFRhc2suRGVsYXkoMjAwKTtcbiAgICAgICAgICAgIHZhciB0ID0gMjtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGludD4oICAgICAgICAgICAgdCwzKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZF1cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgQXdhaXRFcnJvcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGF3YWl0IFRhc2suRGVsYXkoMTUwMCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiRXJyb3IgdGhvcndlZFwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgW1Rlc3RNZXRob2RdXG4gICAgICAgIHB1YmxpYyB2b2lkIFRlc3RTaG91bGRCZVRydWUoKVxuICAgICAgICB7XG4gICAgICAgICAgICBFYXN5QXNzZXJ0cy5TaG91bGRCZVRydWUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Ym9vbD4pKCgpID0+IDM9PTQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2QoXCJUZXN0IHNvbWUgZXF1YWxzXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBOb3RFcXVhbCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0ID0gMjtcbiAgICAgICAgICAgIHZhciBjID0gNTtcblxuICAgICAgICAgICAgdmFyIHIgPSB0ICsgYztcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlTm90RXF1YWxzPGludD4oXG4gICAgICAgICAgICByLDgpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8aW50PiggICAgICAgICAgICByLDcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBFYXN5QXNzZXJ0cy5UaHJvd3M8UGlwcG9FeGNlcHRpb24+KChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBpcHBvRXhjZXB0aW9uKCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY2xhc3MgUGlwcG9FeGNlcHRpb24gOiBFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBpbnRlcm5hbCBjbGFzcyBSdW5uZXJcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTGlzdDxUZXN0RGVzY3JpcHRvcj4gX2ludGVybmFsVGVzdHMgPSBuZXcgTGlzdDxUZXN0RGVzY3JpcHRvcj4oKTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSdW5uZXJWaWV3TW9kZWwgX3J1bm5lclZpZXdNb2RlbDtcblxuICAgICAgICBwdWJsaWMgUnVubmVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsID0gbmV3IFJ1bm5lclZpZXdNb2RlbCgpO1xuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLkJyb3dzZXJJbmZvID0gR2xvYmFsLk5hdmlnYXRvci5BcHBWZXJzaW9uO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biB0ZXN0c1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSdW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuUnVubmluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuRGlzY292ZXJUZXN0KCk7IC8vIGRpc2NvdmVyeSBhbGwgdGVzdHNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLlRvdGFsVGVzdHMgPSB0aGlzLl9pbnRlcm5hbFRlc3RzLkNvdW50OyAvLyB0b3RhbCB0ZXN0cyBmb3VuZFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5SdW5UZXN0cygpOyAvLyBydW4gYWxsIHRlc3QgXG5cbi8vICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLkZhaWxlZFRlc3RzID0gdGhpcy5faW50ZXJuYWxUZXN0cy5Db3VudChjPT4hYy5TdWNjZXNzKTsgLy8gZmFpbGVkIHRlc3RzXG4vLyAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5QYXNzZWRUZXN0cyA9IHRoaXMuX2ludGVybmFsVGVzdHMuQ291bnQoYz0+Yy5TdWNjZXNzKTsgLy8gcGFzc2VkIFRlc3RzXG4vLyAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5Ub3RhbFRpbWUgPSB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuVGVzdHMuSXRlbXMuU3VtKHM9PnMuSXRlbTEuVGltZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5SdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gUnVuIFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwcml2YXRlIFRhc2sgUnVuVGVzdHMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcm5hbFRlc3RzLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KShhc3luYyBmID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZi5SdW5UZXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLlRlc3RzLkFkZChmKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybiBUYXNrLkZyb21SZXN1bHQ8aW50PigwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIERpc2NvdmVyeSBhbGwgdGVzdHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIERpc2NvdmVyVGVzdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0eXBlcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0TWFueTxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLkFzc2VtYmx5LGdsb2JhbDo6U3lzdGVtLlR5cGU+KEFwcERvbWFpbi5DdXJyZW50RG9tYWluLkdldEFzc2VtYmxpZXMoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLkFzc2VtYmx5LCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLklFbnVtZXJhYmxlPGdsb2JhbDo6U3lzdGVtLlR5cGU+PikocyA9PiBzLkdldFR5cGVzKCkpKVxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodz0+IXcuRnVsbE5hbWUuVG9Mb3dlcigpLlN0YXJ0c1dpdGgoXCJzeXN0ZW1cIikpKVxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodz0+IXcuSXNJbnRlcmZhY2UgJiYgIXcuSXNBYnN0cmFjdCkpXG4gICAgICAgICAgICAgICAgLldoZXJlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR5cGUsIGJvb2w+KSh3PT5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxvYmplY3Q+KHcuR2V0Q3VzdG9tQXR0cmlidXRlcyh0eXBlb2YoVGVzdEF0dHJpYnV0ZSksdHJ1ZSkpKSlcbiAgICAgICAgICAgICAgICAuVG9MaXN0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHJ1biBhbGwgdGVzdHMgbWV0aG9kXG4gICAgICAgICAgICB0eXBlcy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uVHlwZT4pKGYgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVzdEF0dCA9IChUZXN0QXR0cmlidXRlKVN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8b2JqZWN0PihmLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RBdHRyaWJ1dGUpLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB2YXIgdGVzdE1ldGhvZHMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbz4oZi5HZXRNZXRob2RzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5NZXRob2RJbmZvLCBib29sPikodyA9PiB3LklzUHVibGljKSlcbiAgICAgICAgICAgICAgICAgICAgLldoZXJlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbywgYm9vbD4pKHcgPT4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8b2JqZWN0Pih3LkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RNZXRob2RBdHRyaWJ1dGUpLCB0cnVlKSkpKS5Ub0xpc3QoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0ZXN0TWV0aG9kcy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5NZXRob2RJbmZvPikobWV0aG9kID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IChUZXN0TWV0aG9kQXR0cmlidXRlKSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PG9iamVjdD4obWV0aG9kLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RNZXRob2RBdHRyaWJ1dGUpLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdERlc2NyID0gbmV3IFRlc3REZXNjcmlwdG9yXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFR5cGUgPSBmLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWV0aG9kID0gbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgR3JvdXAgPSBmLk5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBHcm91cERlc2NyaXB0aW9uID0gc3RyaW5nLklzTnVsbE9yRW1wdHkodGVzdEF0dC5EZXNjcmlwdGlvbikgPyBzdHJpbmcuRW1wdHkgOiB0ZXN0QXR0LkRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgTmFtZSA9IG1ldGhvZC5OYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgTmFtZURlc2NyaXB0aW9uID0gc3RyaW5nLklzTnVsbE9yRW1wdHkoYXR0ci5EZXNjcmlwdGlvbikgPyBzdHJpbmcuRW1wdHkgOiBhdHRyLkRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcm5hbFRlc3RzLkFkZCh0ZXN0RGVzY3IpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGVzdERlc2NyLk9uVGVzdENvbXBsZXRlICs9IFRlc3REZXNjck9uT25UZXN0Q29tcGxldGU7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHZvaWQgVGVzdERlc2NyT25PblRlc3RDb21wbGV0ZShvYmplY3Qgc2VuZGVyLCBFdmVudEFyZ3MgZXZlbnRBcmdzKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29tcGxldGVkVGVzdCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPih0aGlzLl9pbnRlcm5hbFRlc3RzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgYm9vbD4pKHcgPT4gdy5Db21wbGV0ZWQpKTtcbiAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5GYWlsZWRUZXN0cyA9IGNvbXBsZXRlZFRlc3QuQ291bnQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBib29sPikoYz0+IWMuU3VjY2VzcykpOyAvLyBmYWlsZWQgdGVzdHNcbiAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5QYXNzZWRUZXN0cyA9IGNvbXBsZXRlZFRlc3QuQ291bnQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBib29sPikoYz0+Yy5TdWNjZXNzKSk7IC8vIHBhc3NlZCBUZXN0c1xuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLlRvdGFsVGltZSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU3VtPGdsb2JhbDo6U3lzdGVtLlR1cGxlPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4+KHRoaXMuX3J1bm5lclZpZXdNb2RlbC5UZXN0cy5JdGVtcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UdXBsZTxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuTGlzdDxnbG9iYWw6OkJyaWRnZS5IdG1sNS5IVE1MRWxlbWVudD4+LCBpbnQ+KShzPT5zLkl0ZW0xLlRpbWUpKTtcbiAgICAgICAgICAgIGlmKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQ291bnQ8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPih0aGlzLl9pbnRlcm5hbFRlc3RzKT09Y29tcGxldGVkVGVzdC5Db3VudCgpKVxuICAgICAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5TZXRBbGxUZXN0UnVubmVkKCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgQnJpZGdlLkh0bWw1O1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIGludGVybmFsIGNsYXNzIFJ1bm5lclZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSFRNTEVsZW1lbnQgX3RvdGFsVGVzdHMgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInRvdGFsVGVzdHNcIik7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSFRNTEVsZW1lbnQgX3Bhc3NlZFRlc3RzID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQoXCJwYXNzZWRUZXN0c1wiKTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfZmFpbGVkVGVzdHMgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcImZhaWxlZFRlc3RzXCIpO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEhUTUxFbGVtZW50IF90b3RhbFRpbWUgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInRvdGFsVGltZVwiKTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfYnJvd3NlckluZm8gPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcImJyb3dzZXJJbmZvXCIpO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEhUTUxFbGVtZW50IF9sb2FkZXIgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcImxvYWRlclwiKTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfaW5SdW5uaW5nID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQoXCJpblJ1bm5pbmdcIik7XG5cblxuICAgICAgICBwdWJsaWMgVGVzdHNDb2xsZWN0aW9uTWFuYWdlciBUZXN0cyA9IG5ldyBUZXN0c0NvbGxlY3Rpb25NYW5hZ2VyKCk7XG5cbiAgICAgICAgcHVibGljIFJ1bm5lclZpZXdNb2RlbCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBoaWRlUGFzc2VkID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQ8SFRNTElucHV0RWxlbWVudD4oXCJoaWRlUGFzc2VkVGVzdHNcIik7XG4gICAgICAgICAgICBoaWRlUGFzc2VkLk9uQ2hhbmdlICs9IGUgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNDaGVja2VkID0gaGlkZVBhc3NlZC5DaGVja2VkO1xuICAgICAgICAgICAgICAgIHZhciB0b0hpZGUgPSBEb2N1bWVudC5HZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGFzc2VkVGVzdFwiKTtcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaHRtbEVsZW1lbnQgaW4gdG9IaWRlKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbEVsZW1lbnQuSGlkZGVuID0gaXNDaGVja2VkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgSFRNTElucHV0RWxlbWVudCBIaWRlUGFzc2VkIHsgZ2V0OyBzZXQ7IH1cblxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3QgYXJlIHJ1bm5pbmdcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIGJvb2wgUnVubmluZ1xuICAgICAgICB7XG4gICAgICAgICAgICBzZXQgeyBfbG9hZGVyLkhpZGRlbiA9ICF2YWx1ZTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gVG90YWwgdGVzdHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIGludCBUb3RhbFRlc3RzXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNldCB7IF90b3RhbFRlc3RzLklubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0gdGVzdHNcIix2YWx1ZSk7IH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gUGFzc2VkIHRlc3RzIGNvdW50XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyBpbnQgUGFzc2VkVGVzdHNcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0IHsgX3Bhc3NlZFRlc3RzLklubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0gcGFzc2VkXCIsdmFsdWUpOyB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEZhaWxlZCB0ZXN0cyBjb3VudFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgaW50IEZhaWxlZFRlc3RzXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNldCB7IF9mYWlsZWRUZXN0cy5Jbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiezB9IGZhaWxlZFwiLHZhbHVlKTsgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBUb3RhbCB0aW1lXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyBpbnQgVG90YWxUaW1lXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNldCB7IF90b3RhbFRpbWUuSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcIlRlc3RzIGNvbXBsZXRlZCBpbiB7MH0gbXNcIix2YWx1ZSk7IH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQnJvd3NlciBpbmZvXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQnJvd3NlckluZm9cbiAgICAgICAge1xuICAgICAgICAgICAgc2V0IHsgX2Jyb3dzZXJJbmZvLklubmVySFRNTCA9IHZhbHVlOyB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBTZXQgYWxsIHRlc3QgY29tcGxldGVkXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEFsbFRlc3RSdW5uZWQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9pblJ1bm5pbmcuSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uRGlhZ25vc3RpY3M7XG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgaW50ZXJuYWwgY2xhc3MgVGVzdERlc2NyaXB0b3JcbiAgICB7XG4gICAgICAgIHB1YmxpYyBldmVudCBFdmVudEhhbmRsZXIgT25UZXN0Q29tcGxldGU7XG4gICAgICAgIHB1YmxpYyBib29sIENvbXBsZXRlZCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWVEZXNjcmlwdGlvbiB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR3JvdXAgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdyb3VwRGVzY3JpcHRpb24geyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBUeXBlIFR5cGUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgTWV0aG9kSW5mbyBNZXRob2QgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIEV4Y2VwdGlvbiBGYWlsQXNzZXJ0IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGJvb2wgU3VjY2VzcyB7Z2V0e3JldHVybiBGYWlsQXNzZXJ0ID09IG51bGw7fX1cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEVycm9yIHtnZXR7cmV0dXJuIEZhaWxBc3NlcnQgPT0gbnVsbCA/IHN0cmluZy5FbXB0eSA6IHN0cmluZy5Gb3JtYXQoXCJ7MH06IHsxfVwiLEZhaWxBc3NlcnQuR2V0VHlwZSgpLk5hbWUsRmFpbEFzc2VydC5NZXNzYWdlKTt9fVxuICAgICAgICBwdWJsaWMgc3RyaW5nIFN0YWNrIHtnZXR7cmV0dXJuIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsRmFpbEFzc2VydCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEV4Y2VwdGlvbj4oXCJrZXkxXCIpLlN0YWNrVHJhY2U6KHN0cmluZyludWxsO319XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgaW50IFRpbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcblxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biB0ZXN0LlxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSdW5UZXN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgbWV0aG9kIHJldHVybiByYXNrIGF3YWl0XG4gICAgICAgICAgICB2YXIgaXNUYXNrID0gdGhpcy5NZXRob2QuUmV0dXJuVHlwZSA9PSB0eXBlb2YoVGFzayk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZSh0aGlzLlR5cGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgd2F0Y2ggPSBuZXcgU3RvcHdhdGNoKCk7XG4gICAgICAgICAgICB3YXRjaC5TdGFydCgpO1xuXG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNUYXNrKVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCAoVGFzaykgdGhpcy5NZXRob2QuSW52b2tlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTWV0aG9kLkludm9rZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5GYWlsQXNzZXJ0ID0gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3YXRjaC5TdG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5UaW1lID0gKGludCl3YXRjaC5FbGFwc2VkTWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLk9uVGVzdENvbXBsZXRlIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT50aGlzLk9uVGVzdENvbXBsZXRlLkludm9rZSh0aGlzLG51bGwpKTpudWxsO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgb2YgdHlwZSBpcyBkaXNwb3NhYmxlXG4gICAgICAgICAgICAgICAgdmFyIGRpc3Bvc2FibGUgPSBpbnN0YW5jZSBhcyBJRGlzcG9zYWJsZTtcbiAgICAgICAgICAgICAgICBkaXNwb3NhYmxlIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5kaXNwb3NhYmxlLkRpc3Bvc2UoKSk6bnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcbntcbiAgICBwdWJsaWMgY2xhc3MgQmVGYWxzZUV4Y2VwdGlvbiA6IEVhc3lUZXN0QmFzZUV4Y2VwdGlvblxuICAgIHtcbiAgICAgICAgcHVibGljIEJlRmFsc2VFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKVxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xue1xuICAgIHB1YmxpYyBjbGFzcyBCZVRydWVFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBCZVRydWVFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKVxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xue1xuICAgIHB1YmxpYyBjbGFzcyBFcXVhbEV4Y2VwdGlvbiA6IEVhc3lUZXN0QmFzZUV4Y2VwdGlvblxuICAgIHtcbiAgICAgICAgcHVibGljIEVxdWFsRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcbntcbiAgICBwdWJsaWMgY2xhc3MgTm90RXF1YWxFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBOb3RFcXVhbEV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXG57XG4gICAgcHVibGljIGNsYXNzIFRocm93c0V4Y2VwdGlvbiA6IEVhc3lUZXN0QmFzZUV4Y2VwdGlvblxuICAgIHtcbiAgICAgICAgcHVibGljIFRocm93c0V4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBpbnRlcm5hbCBjbGFzcyBUZXN0c0NvbGxlY3Rpb25NYW5hZ2VyIDogQ29sbGVjdGlvbk1hbmFnZXI8VGVzdERlc2NyaXB0b3I+XG4gICAge1xuICAgICAgICBwcml2YXRlIGludCBfY291bnQgPSAwO1xuICAgICAgICBcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIExpc3Q8SFRNTEVsZW1lbnQ+IEdlbmVyYXRlRWxlbWVudChUZXN0RGVzY3JpcHRvciBpdGVtKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcmVzID0gbmV3IExpc3Q8SFRNTEVsZW1lbnQ+KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByb3cxID0gbmV3IEhUTUxUYWJsZVJvd0VsZW1lbnQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICByb3cxLkNsYXNzTGlzdC5BZGQodGhpcy5fY291bnQlMj09MD9cIndoaXRlUm93XCI6XCJncmV5Um93XCIpOyAvLyBhbHRlcm5hdGVcbiAgICAgICAgICAgIGlmKGl0ZW0uU3VjY2VzcylcbiAgICAgICAgICAgICAgICByb3cxLkNsYXNzTGlzdC5BZGQoXCJwYXNzZWRUZXN0XCIpOyAvLyBmYWlsZWQgdGVzdCByb3dcblxuICAgICAgICAgICAgdmFyIGNlbGwxID0gcm93MS5JbnNlcnRDZWxsKCk7XG4gICAgICAgICAgICB2YXIgY2VsbDIgPSByb3cxLkluc2VydENlbGwoKTtcbiAgICAgICAgICAgIHZhciBjZWxsMyA9IHJvdzEuSW5zZXJ0Q2VsbCgpO1xuXG4gICAgICAgICAgICAvLyBDRUxMMVxuICAgICAgICAgICAgY2VsbDEuQ2xhc3NOYW1lID0gaXRlbS5TdWNjZXNzID8gXCJ0ZXN0LW9rXCIgOiBcInRlc3Qta29cIjtcbiAgICAgICAgICAgIC8vIHJvdyBpbmRleFxuICAgICAgICAgICAgY2VsbDEuQXBwZW5kQ2hpbGQobmV3IEhUTUxVbmtub3duRWxlbWVudChcInN0cm9uZ1wiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIElubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0gezF9XCIsdGhpcy5fY291bnQgKzEsaXRlbS5OYW1lKSAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4vLyAgICAgICAgICAgIGNlbGwxLkFwcGVuZENoaWxkKG5ldyBIVE1MU3BhbkVsZW1lbnQoKVxuLy8gICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSAkXCJ7aXRlbS5OYW1lfVwiXG4vLyAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjZWxsMS5BcHBlbmRDaGlsZChuZXcgSFRNTEJSRWxlbWVudCgpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2VsbDEuQXBwZW5kQ2hpbGQobmV3IEhUTUxVbmtub3duRWxlbWVudChcImlcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiIHswfVwiLGl0ZW0uTmFtZURlc2NyaXB0aW9uKSxcbiAgICAgICAgICAgICAgICBDbGFzc05hbWUgPSBcInczLXRleHQtZ3JleVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS1cblxuICAgICAgICAgICAgLy8gQ0VMTDJcbiAgICAgICAgICAgIGNlbGwyLkFwcGVuZENoaWxkKG5ldyBIVE1MVW5rbm93bkVsZW1lbnQoXCJpXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgQ2xhc3NOYW1lID0gXCJmYSBmYS1vYmplY3QtZ3JvdXBcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNlbGwyLkFwcGVuZENoaWxkKG5ldyBIVE1MU3BhbkVsZW1lbnQoKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIElubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH1cIixpdGVtLkdyb3VwKSAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjZWxsMi5BcHBlbmRDaGlsZChuZXcgSFRNTEJSRWxlbWVudCgpKTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjZWxsMi5BcHBlbmRDaGlsZChuZXcgSFRNTFVua25vd25FbGVtZW50KFwiaVwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIElubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCIgezB9XCIsaXRlbS5Hcm91cERlc2NyaXB0aW9uKSxcbiAgICAgICAgICAgICAgICBDbGFzc05hbWUgPSBcInczLXRleHQtZ3JleVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ0VMTDNcbiAgICAgICAgICAgIGNlbGwzLkNsYXNzTmFtZSA9IFwidzMtcmlnaHRcIjtcbiAgICAgICAgICAgIGNlbGwzLkFwcGVuZENoaWxkKG5ldyBIVE1MVW5rbm93bkVsZW1lbnQoXCJpXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgQ2xhc3NOYW1lID0gXCJmYSBmYS1jbG9jay1vXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjZWxsMy5BcHBlbmRDaGlsZChuZXcgSFRNTFNwYW5FbGVtZW50KClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiezB9IG1zXCIsaXRlbS5UaW1lKSAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9jb3VudCsrO1xuICAgICAgICAgICAgcmVzLkFkZChyb3cxKTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0uU3VjY2VzcykgcmV0dXJuIHJlcztcblxuICAgICAgICAgICAgdmFyIHJvdzIgPSBuZXcgSFRNTFRhYmxlUm93RWxlbWVudCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByb3cyLkNsYXNzTmFtZSA9IHRoaXMuX2NvdW50JTI9PTAgPyBcIndoaXRlUm93XCI6XCJncmV5Um93XCI7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IHJvdzIuSW5zZXJ0Q2VsbCgpO1xuXG4gICAgICAgICAgICBjZWxsLkNvbFNwYW4gPSAzO1xuICAgICAgICAgICAgY2VsbC5DbGFzc05hbWUgPSBcInRlc3Qta28gaW5uZXItcm93XCI7XG5cbiAgICAgICAgICAgIGNlbGwuQXBwZW5kQ2hpbGQobmV3IEhUTUxQYXJhZ3JhcGhFbGVtZW50KClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBDbGFzc05hbWUgPSBcImVycm9yLW1lc3NhZ2VcIlxuICAgICAgICAgICAgfSkuQXBwZW5kQ2hpbGQobmV3IEhUTUxVbmtub3duRWxlbWVudChcImlcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBDbGFzc05hbWUgPSBcInczLXRleHQtZ3JleVwiLFxuICAgICAgICAgICAgICAgIElubmVySFRNTCA9IGl0ZW0uRXJyb3JcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjZWxsLkFwcGVuZENoaWxkKG5ldyBIVE1MVW5rbm93bkVsZW1lbnQoXCJwcmVcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBpdGVtLlN0YWNrXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVzLkFkZChyb3cyKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBIVE1MRWxlbWVudCBDb250YWluZXIgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cblxuICAgIFxucHJpdmF0ZSBIVE1MRWxlbWVudCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQ29udGFpbmVyPURvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwidGFibGVUZXN0c0xpc3RcIik7fVxufSJdCn0K
