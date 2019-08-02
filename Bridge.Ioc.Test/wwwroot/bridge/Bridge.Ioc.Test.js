/**
 * @compiler Bridge.NET 17.2.0
 */
Bridge.assembly("Bridge.Ioc.Test", function ($asm, globals) {
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
                    return obj == null ? "null" : Bridge.toString(obj);
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
                addedElement.Item2.ForEach(Bridge.fn.bind(this, function (f) {
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
                        $t.System$IDisposable$Dispose();
                    }
                }},
            Add: function (item) {
                var internalItem = { Item1: item, Item2: this.GenerateElement(item) };
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
                        tuple.Item2.ForEach(Bridge.fn.bind(this, function (f) {
                            this.Container.removeChild(f);
                        }));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.Items.clear();
            },
            Contains: function (item) {
                return System.Linq.Enumerable.from(this.Items).select(function (s) {
                        return s.Item1;
                    }).contains(item);
            },
            Remove: function (item) {
                if (!this.Contains(item)) {
                    return false;
                }

                var internalItem = System.Linq.Enumerable.from(this.Items).first(function (f) {
                        return Bridge.equals(f.Item1, item);
                    });

                // cannot use tuple.Item2.Remove(); ** not supported on EDGE/IE **
                internalItem.Item2.ForEach(Bridge.fn.bind(this, function (f) {
                    this.Container.removeChild(f);
                }));

                var res = this.Items.remove(internalItem);

                return res;
            },
            IndexOf: function (item) {
                try {
                    return this.Items.indexOf(System.Linq.Enumerable.from(this.Items).first(function (f) {
                            return Bridge.equals(f.Item1, item);
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
                this._internalTests.ForEach(Bridge.fn.bind(this, function (f) {
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
                return System.Threading.Tasks.Task.fromResult(0, System.Int32);
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
                types.ForEach(Bridge.fn.bind(this, function (f) {
                    var testAtt = Bridge.cast(System.Linq.Enumerable.from(Bridge.Reflection.getAttributes(f, Bridge.EasyTests.Attributes.TestAttribute, true)).first(), Bridge.EasyTests.Attributes.TestAttribute);


                    var testMethods = System.Linq.Enumerable.from(Bridge.Reflection.getMembers(f, 8, 28)).where(function (w) {
                            return (w.a === 2);
                        }).where(function (w) {
                        return System.Linq.Enumerable.from(System.Attribute.getCustomAttributes(w, Bridge.EasyTests.Attributes.TestMethodAttribute, true)).any();
                    }).toList(System.Reflection.MethodInfo);

                    testMethods.ForEach(Bridge.fn.bind(this, function (method) {
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
                        return s.Item1.Time;
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
                this.Tests = new Bridge.EasyTests.TestsCollectionManager();
            },
            ctor: function () {
                this.$initialize();
                var hidePassed = document.getElementById("hidePassedTests");
                hidePassed.onchange = Bridge.fn.combine(hidePassed.onchange, function (e) {
                    var $t;
                    var isChecked = hidePassed.checked;
                    var toHide = document.getElementsByClassName("passedTest");
                    $t = Bridge.getEnumerator(toHide, "getEnumerator");
                    try {
                        while ($t.moveNext()) {
                            var htmlElement = $t.Current;
                            htmlElement.hidden = isChecked;
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
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
                this.Running = false;
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Test", {
        fields: {
            MethodInfo: null,
            Time: null,
            Name: null
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
                                        disposable != null ? disposable.System$IDisposable$Dispose() : null;

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

    Bridge.define("Bridge.Ioc.Test.Classes.Impl.TheTest", {
        inherits: [Bridge.Ioc.Test.Classes.ITest],
        fields: {
            Id: null
        },
        alias: ["Id", "Bridge$Ioc$Test$Classes$ITest$Id"],
        ctors: {
            init: function () {
                this.Id = new System.Guid();
                this.Id = System.Guid.NewGuid();
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuSW9jLlRlc3QuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkVhc3lUZXN0cy9BcHAuY3MiLCJFYXN5VGVzdHMvQXNzZXJ0cy9FYXN5QXNzZXJ0cy5jcyIsIkVhc3lUZXN0cy9Bc3NlcnRzL1Nob3VsZEV4dGVuc2lvbnMuY3MiLCJFYXN5VGVzdHMvQXR0cmlidXRlcy9UZXN0QXR0cmlidXRlLmNzIiwiRWFzeVRlc3RzL0F0dHJpYnV0ZXMvVGVzdE1ldGhvZEF0dHJpYnV0ZS5jcyIsIkVhc3lUZXN0cy9Db2xsZWN0aW9uTWFuYWdlci5jcyIsIkVhc3lUZXN0cy9FeGNlcHRpb25zL0Vhc3lUZXN0QmFzZUV4Y2VwdGlvbi5jcyIsIkVhc3lUZXN0cy9SdW5uZXIuY3MiLCJFYXN5VGVzdHMvUnVubmVyVmlld01vZGVsLmNzIiwiRWFzeVRlc3RzL1Rlc3REZXNjcmlwdG9yLmNzIiwiU2luZ2xlSW5zdGFuY2UuY3MiLCJUcmFuc2llbnRJbnN0YW5jZS5jcyIsIkVhc3lUZXN0cy9FeGNlcHRpb25zL0JlRmFsc2VFeGNlcHRpb24uY3MiLCJFYXN5VGVzdHMvRXhjZXB0aW9ucy9CZVRydWVFeGNlcHRpb24uY3MiLCJFYXN5VGVzdHMvRXhjZXB0aW9ucy9FcXVhbEV4Y2VwdGlvbi5jcyIsIkVhc3lUZXN0cy9FeGNlcHRpb25zL05vdEVxdWFsRXhjZXB0aW9uLmNzIiwiRWFzeVRlc3RzL0V4Y2VwdGlvbnMvVGhyb3dzRXhjZXB0aW9uLmNzIiwiRWFzeVRlc3RzL1Rlc3RzQ29sbGVjdGlvbk1hbmFnZXIuY3MiLCJDbGFzc2VzL0ltcGwvVGhlVGVzdC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBT1lBLFNBQWFBLElBQUlBO2dDQUNqQkEsU0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDS2dCQSxHQUFHQTtvQkFFekJB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REFFRkEsOEJBQXFCQTs7OztnQkFNckNBLGtCQUFrQkE7O2dCQUtsQkEsa0JBQWtCQSxxREFFRkEsNkJBQW9CQTs7Z0JBRXBDQSxrQkFBa0JBOzs7Z0JBR2xCQSxrQkFBa0JBLGtEQUVGQSw4QkFBcUJBOzs7O2dCQU1yQ0E7Z0JBQ0FBLGtCQUFrQkE7O2dCQUtsQkEsa0JBQWtCQSxxREFFRkEsZ0NBQXVCQTs7O2dCQUd2Q0E7Z0JBQ0FBLFFBQVFBOztnQkFFUkEsSUFBSUE7b0JBQWNBLE9BQU9BOzs7Z0JBRXpCQSxXQUFXQTs7Z0JBRVhBLGlCQUFpQkE7Z0JBQ2pCQSxXQUFXQTs7Z0JBRVhBO2dCQUNBQTs7Z0JBRUFBLGlCQUFpQkEsb0ZBR0ZBLGlGQUdDQTs7Z0JBR2hCQSxpQkFBaUJBLG9EQUVEQTs7Z0JBR2hCQSxRQUFRQTs7Z0JBRVJBLE9BQU9BOzs7Ozs7Ozs7Ozs7OzswQkNoR3NCQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJcclxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBydW5uZXIgPSBuZXcgUnVubmVyKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHJ1bm5lci5SdW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9ucztcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHNcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFYXN5QXNzZXJ0c1xyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgYWN0aW9uIG11c3QgdGhyb3cgYSBzcGVjaWZpYyBleGNlcHRpb25cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFjdGlvblwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiRWFzeVRlc3RCYXNlRXhjZXB0aW9uXCI+PC9leGNlcHRpb24+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFRocm93czxUPihBY3Rpb24gYWN0aW9uKSB3aGVyZSBUIDogRXhjZXB0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVGhyb3dzRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCBFeGNlcHRpb246IHswfS4gTm8gRXhjcGV0aW9uIFRocm93ZWQhXCIsdHlwZW9mKFQpLk5hbWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoVCBleHBlY3RlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gb2tcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUaHJvd3NFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIkV4Y2VwdGlvbiBvZiB0eXBlOiB7MH0gaW5zdGVhZCBvZiBFeHBlY3RlZCBFeGNlcHRpb246IHsxfVwiLGUuR2V0VHlwZSgpLk5hbWUsdHlwZW9mKFQpLk5hbWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgdHdvIG9iamVjdCBhcmUgZXF1YWxcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2Vjb25kXCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQXJlRXF1YWwob2JqZWN0IG9iaiwgb2JqZWN0IHNlY29uZClcclxuICAgICAgICB7XHJcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPG9iamVjdD4oICAgICAgICAgICAgb2JqLHNlY29uZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgdHdvIG9iamVjdCBhcmUgbm90IGVxdWFsXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZFwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFyZU5vdEVxdWFsKG9iamVjdCBvYmosIG9iamVjdCBzZWNvbmQpXHJcbiAgICAgICAge1xyXG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxvYmplY3Q+KCAgICAgICAgICAgIG9iaixzZWNvbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUZXN0IGEgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSBjb25kaXRpb25cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4cGVjdGVzVHJ1ZUNvbmRpdGlvblwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxleGNlcHRpb24gY3JlZj1cIkJlVHJ1ZUV4Y2VwdGlvblwiPjwvZXhjZXB0aW9uPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZVRydWUoRnVuYzxib29sPiBleHBlY3Rlc1RydWVDb25kaXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gZXhwZWN0ZXNUcnVlQ29uZGl0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmKCFyZXMpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmVUcnVlRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChcIkNvbmRpdGlvbiBleHBlY3RlZCB0byBiZSB0cnVlIGJ1dCByZXN1bHQgaXMgRkFMU0UuXCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGVzdCBhIGV4cGVjdGVkIHRvIGJlIGZhbHNlIGNvbmRpdGlvblxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXhwZWN0ZXNGYWxzZUNvbmRpdGlvblwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxleGNlcHRpb24gY3JlZj1cIkJlRmFsc2VFeGNlcHRpb25cIj48L2V4Y2VwdGlvbj5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2hvdWxkQmVGYWxzZShGdW5jPGJvb2w+IGV4cGVjdGVzRmFsc2VDb25kaXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gZXhwZWN0ZXNGYWxzZUNvbmRpdGlvbigpO1xyXG4gICAgICAgICAgICBpZihyZXMpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmVGYWxzZUV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJDb25kaXRpb24gZXhwZWN0ZWQgdG8gYmUgZmFsc2UgYnV0IHJlc3VsdCBpcyBUUlVFLlwiKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENPbXBhcmUgb2JqXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvMVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibzJcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIE9iamVjdEVxdWFsKG9iamVjdCBvMSwgb2JqZWN0IG8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG8xID09IG51bGwgJiYgbzIgIT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobzEgIT0gbnVsbCAmJiBvMiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbzEgPT0gbnVsbCB8fCBvMS5FcXVhbHMobzIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBJZiBvYmogaXMgbnVsbCByZXR1cm4gJ251bGwnIGVsc2UgdG9zdHJpbmdcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBUb0NvbXBhcmVTdHJpbmcodGhpcyBvYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iaiA9PSBudWxsID8gXCJudWxsXCIgOiBvYmouVG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnM7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgU2hvdWxkRXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGVzdCBlcXVhbHNcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2Vjb25kT2JqXCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2hvdWxkQmVFcXVhbHM8VD4odGhpcyBUIG9iaiwgVCBzZWNvbmRPYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZXF1YWwgPSBFYXN5QXNzZXJ0cy5PYmplY3RFcXVhbChvYmosIHNlY29uZE9iaik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWVxdWFsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVxdWFsRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChcIkV4cGVjdGVkIHswfS4gVmFsdWU6IHsxfVwiLHNlY29uZE9iai5Ub0NvbXBhcmVTdHJpbmcoKSxvYmouVG9Db21wYXJlU3RyaW5nKCkpKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRlc3Qgbm90IGVxdWFsc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRPYmpcIj48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZU5vdEVxdWFsczxUPih0aGlzIFQgb2JqLCBUIHNlY29uZE9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBlcXVhbCA9IEVhc3lBc3NlcnRzLk9iamVjdEVxdWFsKG9iaiwgc2Vjb25kT2JqKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcXVhbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RFcXVhbEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCB7MH0gZGlmZmVyZW50IGZyb20gezF9LiBBcmUgRXF1YWwhXCIsc2Vjb25kT2JqLlRvQ29tcGFyZVN0cmluZygpLG9iai5Ub0NvbXBhcmVTdHJpbmcoKSkpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIFxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlc1xyXG57XHJcbiAgICBcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBBdHRyaWJ1dGUgZm9yIHRlc3QgY2xhc3NcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBbQXR0cmlidXRlVXNhZ2UoQXR0cmlidXRlVGFyZ2V0cy5DbGFzcyldIFxyXG4gICAgcHVibGljIGNsYXNzIFRlc3RBdHRyaWJ1dGUgOiBBdHRyaWJ1dGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGVzdEF0dHJpYnV0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXN0QXR0cmlidXRlKHN0cmluZyBkZXNjcmlwdGlvbiApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gQXR0cmlidXRlIGZvciB0ZXN0IE1ldGhvZFxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIFtBdHRyaWJ1dGVVc2FnZShBdHRyaWJ1dGVUYXJnZXRzLk1ldGhvZCldIFxyXG4gICAgcHVibGljIGNsYXNzIFRlc3RNZXRob2RBdHRyaWJ1dGUgOiBBdHRyaWJ1dGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGVzdE1ldGhvZEF0dHJpYnV0ZShzdHJpbmcgZGVzY3JpcHRpb24gPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5EZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gTWFuYWdlIGEgY29sbGVjdGlvbiBvZiBpdGVtXHJcbiAgICAvLy8gQXV0b21hdGljYWxseSBzeW5jIGNvbGxlY3Rpb24gd2l0aCBkb21cclxuICAgIC8vLyBcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxyXG4gICAgaW50ZXJuYWwgYWJzdHJhY3QgY2xhc3MgQ29sbGVjdGlvbk1hbmFnZXI8VD4gXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBJdGVtcyBjb2xsZWN0aW9uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgTGlzdDxUdXBsZTxULCBMaXN0PEhUTUxFbGVtZW50Pj4+IEl0ZW1zID0gbmV3IExpc3Q8VHVwbGU8VCwgTGlzdDxIVE1MRWxlbWVudD4+PigpO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdlbmVyYXRlIGEgSHRtbEVsZW1lbnQgZnJvbSBUIGl0ZW1cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIml0ZW1cIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IExpc3Q8SFRNTEVsZW1lbnQ+IEdlbmVyYXRlRWxlbWVudChUIGl0ZW0pO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENhbGxlZCB3aGVuIHRoZSBuZXcgSFRNTEVsZW1lbnQgaXMgZ2VuZXJhdGVkLlxyXG4gICAgICAgIC8vLyBEZWZhdWx0IGlzIEFwcGVuZENoaWxkIHRvIENvbnRhaW5lci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFkZGVkRWxlbWVudFwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBEb21BY3Rpb25PbkFkZChUdXBsZTxULCBMaXN0PEhUTUxFbGVtZW50Pj4gYWRkZWRFbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWRkZWRFbGVtZW50Lkl0ZW0yLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5IdG1sNS5IVE1MRWxlbWVudD4pKGYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db250YWluZXIuQXBwZW5kQ2hpbGQoZik7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ29udGFpbmVyIGVsZW1lbnQgZm9yIGNvbGxlY3Rpb25cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBIVE1MRWxlbWVudCBDb250YWluZXIgeyBnZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBBZGRSYW5nZShJRW51bWVyYWJsZTxUPiBpdGVtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGl0ZW1zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFkZChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBBZGQoVCBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGludGVybmFsSXRlbSA9IG5ldyBUdXBsZTxULCBMaXN0PEhUTUxFbGVtZW50Pj4oaXRlbSwgdGhpcy5HZW5lcmF0ZUVsZW1lbnQoaXRlbSkpO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1zLkFkZChpbnRlcm5hbEl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Eb21BY3Rpb25PbkFkZChpbnRlcm5hbEl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgYWxsIGVsZW1lbnRzIGZyb20gZG9tXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0dXBsZSBpbiB0aGlzLkl0ZW1zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYW5ub3QgdXNlIHR1cGxlLkl0ZW0yLlJlbW92ZSgpOyAqKiBub3Qgc3VwcG9ydGVkIG9uIEVER0UvSUUgKipcclxuICAgICAgICAgICAgICAgIHR1cGxlLkl0ZW0yLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5IdG1sNS5IVE1MRWxlbWVudD4pKGYgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbnRhaW5lci5SZW1vdmVDaGlsZChmKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5JdGVtcy5DbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnMoVCBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0PGdsb2JhbDo6U3lzdGVtLlR1cGxlPFQsIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuTGlzdDxnbG9iYWw6OkJyaWRnZS5IdG1sNS5IVE1MRWxlbWVudD4+LFQ+KHRoaXMuSXRlbXMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8VCwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4sIFQ+KShzID0+IHMuSXRlbTEpKS5Db250YWlucyhpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgUmVtb3ZlKFQgaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Db250YWlucyhpdGVtKSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGludGVybmFsSXRlbSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8VCwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4+KHRoaXMuSXRlbXMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8VCwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4sIGJvb2w+KShmID0+IGYuSXRlbTEuRXF1YWxzKGl0ZW0pKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBjYW5ub3QgdXNlIHR1cGxlLkl0ZW0yLlJlbW92ZSgpOyAqKiBub3Qgc3VwcG9ydGVkIG9uIEVER0UvSUUgKipcclxuICAgICAgICAgICAgaW50ZXJuYWxJdGVtLkl0ZW0yLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5IdG1sNS5IVE1MRWxlbWVudD4pKGYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db250YWluZXIuUmVtb3ZlQ2hpbGQoZik7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLkl0ZW1zLlJlbW92ZShpbnRlcm5hbEl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcbnB1YmxpYyBpbnQgQ291bnRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuSXRlbXMuQ291bnQ7XHJcbiAgICB9XHJcbn0gICAgICAgIHB1YmxpYyBpbnQgSW5kZXhPZihUIGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbXMuSW5kZXhPZihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGdsb2JhbDo6U3lzdGVtLlR1cGxlPFQsIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuTGlzdDxnbG9iYWw6OkJyaWRnZS5IdG1sNS5IVE1MRWxlbWVudD4+Pih0aGlzLkl0ZW1zLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR1cGxlPFQsIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuTGlzdDxnbG9iYWw6OkJyaWRnZS5IdG1sNS5IVE1MRWxlbWVudD4+LCBib29sPikoZiA9PiBmLkl0ZW0xLkVxdWFscyhpdGVtKSkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVHVwbGU8VCwgTGlzdDxIVE1MRWxlbWVudD4+IHRoaXNbaW50IGluZGV4XVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHRoaXMuSXRlbXNbaW5kZXhdOyB9XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXMuSXRlbXNbaW5kZXhdID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRWFzeVRlc3RCYXNlRXhjZXB0aW9uIDogRXhjZXB0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEVhc3lUZXN0QmFzZUV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpIFxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBSdW5uZXJcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IExpc3Q8VGVzdERlc2NyaXB0b3I+IF9pbnRlcm5hbFRlc3RzID0gbmV3IExpc3Q8VGVzdERlc2NyaXB0b3I+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSdW5uZXJWaWV3TW9kZWwgX3J1bm5lclZpZXdNb2RlbDtcclxuXHJcbiAgICAgICAgcHVibGljIFJ1bm5lcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwgPSBuZXcgUnVubmVyVmlld01vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5Ccm93c2VySW5mbyA9IEdsb2JhbC5OYXZpZ2F0b3IuQXBwVmVyc2lvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUnVuIHRlc3RzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSdW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLlJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5EaXNjb3ZlclRlc3QoKTsgLy8gZGlzY292ZXJ5IGFsbCB0ZXN0c1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLlRvdGFsVGVzdHMgPSB0aGlzLl9pbnRlcm5hbFRlc3RzLkNvdW50OyAvLyB0b3RhbCB0ZXN0cyBmb3VuZFxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLlJ1blRlc3RzKCk7IC8vIHJ1biBhbGwgdGVzdCBcclxuXHJcbi8vICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLkZhaWxlZFRlc3RzID0gdGhpcy5faW50ZXJuYWxUZXN0cy5Db3VudChjPT4hYy5TdWNjZXNzKTsgLy8gZmFpbGVkIHRlc3RzXHJcbi8vICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLlBhc3NlZFRlc3RzID0gdGhpcy5faW50ZXJuYWxUZXN0cy5Db3VudChjPT5jLlN1Y2Nlc3MpOyAvLyBwYXNzZWQgVGVzdHNcclxuLy8gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuVG90YWxUaW1lID0gdGhpcy5fcnVubmVyVmlld01vZGVsLlRlc3RzLkl0ZW1zLlN1bShzPT5zLkl0ZW0xLlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLlJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUnVuIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBUYXNrIFJ1blRlc3RzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsVGVzdHMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4pKGFzeW5jIGYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgZi5SdW5UZXN0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuVGVzdHMuQWRkKGYpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBUYXNrLkZyb21SZXN1bHQ8aW50PigwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRGlzY292ZXJ5IGFsbCB0ZXN0c1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERpc2NvdmVyVGVzdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdHlwZXMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSxnbG9iYWw6OlN5c3RlbS5UeXBlPihBcHBEb21haW4uQ3VycmVudERvbWFpbi5HZXRBc3NlbWJsaWVzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxnbG9iYWw6OlN5c3RlbS5UeXBlPj4pKHMgPT4gcy5HZXRUeXBlcygpKSlcclxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodz0+IXcuRnVsbE5hbWUuVG9Mb3dlcigpLlN0YXJ0c1dpdGgoXCJzeXN0ZW1cIikpKVxyXG4gICAgICAgICAgICAgICAgLldoZXJlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR5cGUsIGJvb2w+KSh3PT4hdy5Jc0ludGVyZmFjZSAmJiAhdy5Jc0Fic3RyYWN0KSlcclxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodz0+U3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8b2JqZWN0Pih3LkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RBdHRyaWJ1dGUpLHRydWUpKSkpXHJcbiAgICAgICAgICAgICAgICAuVG9MaXN0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBydW4gYWxsIHRlc3RzIG1ldGhvZFxyXG4gICAgICAgICAgICB0eXBlcy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uVHlwZT4pKGYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlc3RBdHQgPSAoVGVzdEF0dHJpYnV0ZSlTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PG9iamVjdD4oZi5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0QXR0cmlidXRlKSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRlc3RNZXRob2RzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8+KGYuR2V0TWV0aG9kcygpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbywgYm9vbD4pKHcgPT4gdy5Jc1B1YmxpYykpXHJcbiAgICAgICAgICAgICAgICAgICAgLldoZXJlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbywgYm9vbD4pKHcgPT4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8b2JqZWN0Pih3LkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RNZXRob2RBdHRyaWJ1dGUpLCB0cnVlKSkpKS5Ub0xpc3QoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGVzdE1ldGhvZHMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbz4pKG1ldGhvZCA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRyID0gKFRlc3RNZXRob2RBdHRyaWJ1dGUpIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8b2JqZWN0PihtZXRob2QuR2V0Q3VzdG9tQXR0cmlidXRlcyh0eXBlb2YoVGVzdE1ldGhvZEF0dHJpYnV0ZSksIHRydWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdERlc2NyID0gbmV3IFRlc3REZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBlID0gZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWV0aG9kID0gbWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHcm91cCA9IGYuTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgR3JvdXBEZXNjcmlwdGlvbiA9IHN0cmluZy5Jc051bGxPckVtcHR5KHRlc3RBdHQuRGVzY3JpcHRpb24pID8gc3RyaW5nLkVtcHR5IDogdGVzdEF0dC5EZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgTmFtZSA9IG1ldGhvZC5OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lRGVzY3JpcHRpb24gPSBzdHJpbmcuSXNOdWxsT3JFbXB0eShhdHRyLkRlc2NyaXB0aW9uKSA/IHN0cmluZy5FbXB0eSA6IGF0dHIuRGVzY3JpcHRpb25cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ludGVybmFsVGVzdHMuQWRkKHRlc3REZXNjcik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGVzdERlc2NyLk9uVGVzdENvbXBsZXRlICs9IHRoaXMuVGVzdERlc2NyT25PblRlc3RDb21wbGV0ZTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBUZXN0RGVzY3JPbk9uVGVzdENvbXBsZXRlKG9iamVjdCBzZW5kZXIsIEV2ZW50QXJncyBldmVudEFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY29tcGxldGVkVGVzdCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPih0aGlzLl9pbnRlcm5hbFRlc3RzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgYm9vbD4pKHcgPT4gdy5Db21wbGV0ZWQpKTtcclxuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLkZhaWxlZFRlc3RzID0gY29tcGxldGVkVGVzdC5Db3VudCgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGJvb2w+KShjPT4hYy5TdWNjZXNzKSk7IC8vIGZhaWxlZCB0ZXN0c1xyXG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuUGFzc2VkVGVzdHMgPSBjb21wbGV0ZWRUZXN0LkNvdW50KChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgYm9vbD4pKGM9PmMuU3VjY2VzcykpOyAvLyBwYXNzZWQgVGVzdHNcclxuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLlRvdGFsVGltZSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU3VtPGdsb2JhbDo6U3lzdGVtLlR1cGxlPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4+KHRoaXMuX3J1bm5lclZpZXdNb2RlbC5UZXN0cy5JdGVtcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UdXBsZTxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuTGlzdDxnbG9iYWw6OkJyaWRnZS5IdG1sNS5IVE1MRWxlbWVudD4+LCBpbnQ+KShzPT5zLkl0ZW0xLlRpbWUpKTtcclxuICAgICAgICAgICAgaWYoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KHRoaXMuX2ludGVybmFsVGVzdHMpPT1jb21wbGV0ZWRUZXN0LkNvdW50KCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuU2V0QWxsVGVzdFJ1bm5lZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIEJyaWRnZS5IdG1sNTtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXHJcbntcclxuICAgIGludGVybmFsIGNsYXNzIFJ1bm5lclZpZXdNb2RlbFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSFRNTEVsZW1lbnQgX3RvdGFsVGVzdHMgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInRvdGFsVGVzdHNcIik7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfcGFzc2VkVGVzdHMgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInBhc3NlZFRlc3RzXCIpO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSFRNTEVsZW1lbnQgX2ZhaWxlZFRlc3RzID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQoXCJmYWlsZWRUZXN0c1wiKTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEhUTUxFbGVtZW50IF90b3RhbFRpbWUgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInRvdGFsVGltZVwiKTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEhUTUxFbGVtZW50IF9icm93c2VySW5mbyA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwiYnJvd3NlckluZm9cIik7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfbG9hZGVyID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQoXCJsb2FkZXJcIik7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVGVzdHNDb2xsZWN0aW9uTWFuYWdlciBUZXN0cyA9IG5ldyBUZXN0c0NvbGxlY3Rpb25NYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBSdW5uZXJWaWV3TW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGhpZGVQYXNzZWQgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZDxIVE1MSW5wdXRFbGVtZW50PihcImhpZGVQYXNzZWRUZXN0c1wiKTtcclxuICAgICAgICAgICAgaGlkZVBhc3NlZC5PbkNoYW5nZSArPSBlID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBpc0NoZWNrZWQgPSBoaWRlUGFzc2VkLkNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9IaWRlID0gRG9jdW1lbnQuR2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBhc3NlZFRlc3RcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaHRtbEVsZW1lbnQgaW4gdG9IaWRlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50LkhpZGRlbiA9IGlzQ2hlY2tlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIVE1MSW5wdXRFbGVtZW50IEhpZGVQYXNzZWQgeyBnZXQ7IHNldDsgfVxyXG5cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUZXN0IGFyZSBydW5uaW5nXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgYm9vbCBSdW5uaW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXQgeyB0aGlzLl9sb2FkZXIuSGlkZGVuID0gIXZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRvdGFsIHRlc3RzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgaW50IFRvdGFsVGVzdHNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXMuX3RvdGFsVGVzdHMuSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcInswfSB0ZXN0c1wiLHZhbHVlKTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBhc3NlZCB0ZXN0cyBjb3VudFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGludCBQYXNzZWRUZXN0c1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0IHsgdGhpcy5fcGFzc2VkVGVzdHMuSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcInswfSBwYXNzZWRcIix2YWx1ZSk7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBGYWlsZWQgdGVzdHMgY291bnRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBpbnQgRmFpbGVkVGVzdHNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXMuX2ZhaWxlZFRlc3RzLklubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0gZmFpbGVkXCIsdmFsdWUpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVG90YWwgdGltZVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGludCBUb3RhbFRpbWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXMuX3RvdGFsVGltZS5Jbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiVGVzdHMgY29tcGxldGVkIGluIHswfSBtc1wiLHZhbHVlKTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEJyb3dzZXIgaW5mb1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBCcm93c2VySW5mb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0IHsgdGhpcy5fYnJvd3NlckluZm8uSW5uZXJIVE1MID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU2V0IGFsbCB0ZXN0IGNvbXBsZXRlZFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0QWxsVGVzdFJ1bm5lZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5EaWFnbm9zdGljcztcclxudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBUZXN0RGVzY3JpcHRvclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBldmVudCBFdmVudEhhbmRsZXIgT25UZXN0Q29tcGxldGU7XHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29tcGxldGVkIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZURlc2NyaXB0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdyb3VwIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdyb3VwRGVzY3JpcHRpb24geyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVHlwZSBUeXBlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgTWV0aG9kSW5mbyBNZXRob2QgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBFeGNlcHRpb24gRmFpbEFzc2VydCB7IGdldDsgc2V0OyB9XHJcbnB1YmxpYyBib29sIFN1Y2Nlc3Ncclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRmFpbEFzc2VydCA9PSBudWxsO1xyXG4gICAgfVxyXG59cHVibGljIHN0cmluZyBFcnJvclxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5GYWlsQXNzZXJ0ID09IG51bGwgPyBzdHJpbmcuRW1wdHkgOiBzdHJpbmcuRm9ybWF0KFwiezB9OiB7MX1cIix0aGlzLkZhaWxBc3NlcnQuR2V0VHlwZSgpLk5hbWUsdGhpcy5GYWlsQXNzZXJ0Lk1lc3NhZ2UpO1xyXG4gICAgfVxyXG59cHVibGljIHN0cmluZyBTdGFja1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIix0aGlzLkZhaWxBc3NlcnQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxFeGNlcHRpb24+KFwia2V5MVwiKS5TdGFja1RyYWNlOihzdHJpbmcpbnVsbDtcclxuICAgIH1cclxufSAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGludCBUaW1lIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUnVuIHRlc3QuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSdW5UZXN0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIG1ldGhvZCByZXR1cm4gcmFzayBhd2FpdFxyXG4gICAgICAgICAgICB2YXIgaXNUYXNrID0gdGhpcy5NZXRob2QuUmV0dXJuVHlwZSA9PSB0eXBlb2YoVGFzayk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBBY3RpdmF0b3IuQ3JlYXRlSW5zdGFuY2UodGhpcy5UeXBlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB3YXRjaCA9IG5ldyBTdG9wd2F0Y2goKTtcclxuICAgICAgICAgICAgd2F0Y2guU3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNUYXNrKVxyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IChUYXNrKSB0aGlzLk1ldGhvZC5JbnZva2UoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTWV0aG9kLkludm9rZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRmFpbEFzc2VydCA9IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluYWxseVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3YXRjaC5TdG9wKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpbWUgPSAoaW50KXdhdGNoLkVsYXBzZWRNaWxsaXNlY29uZHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk9uVGVzdENvbXBsZXRlIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT50aGlzLk9uVGVzdENvbXBsZXRlLkludm9rZSh0aGlzLG51bGwpKTpudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIG9mIHR5cGUgaXMgZGlzcG9zYWJsZVxyXG4gICAgICAgICAgICAgICAgdmFyIGRpc3Bvc2FibGUgPSBpbnN0YW5jZSBhcyBJRGlzcG9zYWJsZTtcclxuICAgICAgICAgICAgICAgIGRpc3Bvc2FibGUhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9PmRpc3Bvc2FibGUuRGlzcG9zZSgpKTpudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsInVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cztcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcbnVzaW5nIEJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzO1xudXNpbmcgQnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSW1wbDtcblxubmFtZXNwYWNlIEJyaWRnZS5Jb2MuVGVzdFxue1xuICAgIFtUZXN0KFwiU2luZ2xlIEluc3RhbmNlIFJlc29sdmluZ1wiKV1cbiAgICBwdWJsaWMgY2xhc3MgU2luZ2xlSW5zdGFuY2VcbiAgICB7XG4gICAgICAgIFtUZXN0TWV0aG9kKFwiUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJVGVzdCxUaGVUZXN0PigpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBHZW5lcmljSW50ZXJmYWNlKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBCcmlkZ2VJb2MoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8SVRlc3QsVGhlVGVzdD4oKTtcblxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gY29udGFpbmVyLlJlc29sdmU8SVRlc3Q+KCk7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gY29udGFpbmVyLlJlc29sdmU8SVRlc3Q+KCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLklUZXN0PihcbiAgICAgICAgICAgIGZpcnN0LHNlY29uZCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxnbG9iYWw6OlN5c3RlbS5HdWlkPiggICAgICAgICAgICBmaXJzdC5JZCxzZWNvbmQuSWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZChcIlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UodHlwZW9mKElUZXN0KSx0eXBlb2YoVGhlVGVzdCkpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBOb25HZW5lcmljSW50ZXJmYWNlKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBCcmlkZ2VJb2MoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UodHlwZW9mKElUZXN0KSx0eXBlb2YoVGhlVGVzdCkpO1xuXG4gICAgICAgICAgICB2YXIgZmlyc3QgPSBjb250YWluZXIuUmVzb2x2ZTxJVGVzdD4oKTtcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBjb250YWluZXIuUmVzb2x2ZTxJVGVzdD4oKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGdsb2JhbDo6QnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSVRlc3Q+KCAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyc3Qsc2Vjb25kKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGdsb2JhbDo6U3lzdGVtLkd1aWQ+KCAgICAgICAgICAgIGZpcnN0LklkLHNlY29uZC5JZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFtUZXN0TWV0aG9kKFwiY29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8VGhlVGVzdD4oKVwiKV1cbiAgICAgICAgcHVibGljIHZvaWQgR2VuZXJpY0NsYXNzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBCcmlkZ2VJb2MoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8VGhlVGVzdD4oKTtcblxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gY29udGFpbmVyLlJlc29sdmU8VGhlVGVzdD4oKTtcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBjb250YWluZXIuUmVzb2x2ZTxUaGVUZXN0PigpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8Z2xvYmFsOjpCcmlkZ2UuSW9jLlRlc3QuQ2xhc3Nlcy5JbXBsLlRoZVRlc3Q+KCAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyc3Qsc2Vjb25kKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGdsb2JhbDo6U3lzdGVtLkd1aWQ+KCAgICAgICAgICAgIGZpcnN0LklkLHNlY29uZC5JZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2QoXCJjb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZSh0eXBlb2YoVGhlVGVzdCkpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBOb25HZW5lcmljQ2xhc3MoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZSh0eXBlb2YoVGhlVGVzdCkpO1xuXG4gICAgICAgICAgICB2YXIgZmlyc3QgPSBjb250YWluZXIuUmVzb2x2ZTxUaGVUZXN0PigpO1xuICAgICAgICAgICAgdmFyIHNlY29uZCA9IGNvbnRhaW5lci5SZXNvbHZlPFRoZVRlc3Q+KCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLkltcGwuVGhlVGVzdD4oICAgICAgICAgICAgXG4gICAgICAgICAgICBmaXJzdCxzZWNvbmQpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8Z2xvYmFsOjpTeXN0ZW0uR3VpZD4oICAgICAgICAgICAgZmlyc3QuSWQsc2Vjb25kLklkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2QoXCJSZWdpc3Rlckluc3RhbmNlKG5ldyBUaGVUZXN0KCkpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBJbnN0YW5jZVJlc29sdmUoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXJJbnN0YW5jZTxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLkltcGwuVGhlVGVzdD4obmV3IFRoZVRlc3QoKSk7XG5cbiAgICAgICAgICAgIHZhciBmaXJzdCA9IGNvbnRhaW5lci5SZXNvbHZlPFRoZVRlc3Q+KCk7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gY29udGFpbmVyLlJlc29sdmU8VGhlVGVzdD4oKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGdsb2JhbDo6QnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSW1wbC5UaGVUZXN0PiggICAgICAgICAgICBcbiAgICAgICAgICAgIGZpcnN0LHNlY29uZCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxnbG9iYWw6OlN5c3RlbS5HdWlkPiggICAgICAgICAgICBmaXJzdC5JZCxzZWNvbmQuSWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZChcIlJlZ2lzdGVyRnVuYygoKT0+IHRoZVRlc3QpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBGdW5jUmVzb2x2ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBuZXcgQnJpZGdlSW9jKCk7XG4gICAgICAgICAgICB2YXIgdGhlVGVzdCA9IG5ldyBUaGVUZXN0KCk7XG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXJGdW5jPGdsb2JhbDo6QnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSW1wbC5UaGVUZXN0PigoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLkltcGwuVGhlVGVzdD4pKCgpPT4gdGhlVGVzdCkpO1xuXG4gICAgICAgICAgICB2YXIgZmlyc3QgPSBjb250YWluZXIuUmVzb2x2ZTxUaGVUZXN0PigpO1xuICAgICAgICAgICAgdmFyIHNlY29uZCA9IGNvbnRhaW5lci5SZXNvbHZlPFRoZVRlc3Q+KCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLkltcGwuVGhlVGVzdD4oICAgICAgICAgICAgXG4gICAgICAgICAgICBmaXJzdCxzZWNvbmQpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8Z2xvYmFsOjpTeXN0ZW0uR3VpZD4oICAgICAgICAgICAgZmlyc3QuSWQsc2Vjb25kLklkKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHM7XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXM7XG51c2luZyBCcmlkZ2UuSW9jLlRlc3QuQ2xhc3NlcztcbnVzaW5nIEJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLkltcGw7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuSW9jLlRlc3RcbntcbiAgICBbVGVzdChcIlRyYW5zaWVudCBSZXNvbHZpbmdcIildXG4gICAgcHVibGljIGNsYXNzIFRyYW5zaWVudEluc3RhbmNlXG4gICAge1xuICAgICAgICBbVGVzdE1ldGhvZChcIlJlZ2lzdGVyPElUZXN0LFRoZVRlc3Q+KClcIildXG4gICAgICAgIHB1YmxpYyB2b2lkIEdlbmVyaWNJbnRlcmZhY2UoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXI8SVRlc3QsVGhlVGVzdD4oKTtcblxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gY29udGFpbmVyLlJlc29sdmU8SVRlc3Q+KCk7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gY29udGFpbmVyLlJlc29sdmU8SVRlc3Q+KCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxnbG9iYWw6OkJyaWRnZS5Jb2MuVGVzdC5DbGFzc2VzLklUZXN0PihcbiAgICAgICAgICAgIGZpcnN0LHNlY29uZCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxnbG9iYWw6OlN5c3RlbS5HdWlkPiggICAgICAgICAgICBmaXJzdC5JZCxzZWNvbmQuSWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZChcIlJlZ2lzdGVyKHR5cGVvZihJVGVzdCksdHlwZW9mKFRoZVRlc3QpKVwiKV1cbiAgICAgICAgcHVibGljIHZvaWQgTm9uR2VuZXJpY0ludGVyZmFjZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBuZXcgQnJpZGdlSW9jKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnRhaW5lci5SZWdpc3Rlcih0eXBlb2YoSVRlc3QpLHR5cGVvZihUaGVUZXN0KSk7XG5cbiAgICAgICAgICAgIHZhciBmaXJzdCA9IGNvbnRhaW5lci5SZXNvbHZlPElUZXN0PigpO1xuICAgICAgICAgICAgdmFyIHNlY29uZCA9IGNvbnRhaW5lci5SZXNvbHZlPElUZXN0PigpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8Z2xvYmFsOjpCcmlkZ2UuSW9jLlRlc3QuQ2xhc3Nlcy5JVGVzdD4oICAgICAgICAgICAgXG4gICAgICAgICAgICBmaXJzdCxzZWNvbmQpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8Z2xvYmFsOjpTeXN0ZW0uR3VpZD4oICAgICAgICAgICAgZmlyc3QuSWQsc2Vjb25kLklkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2QoXCJSZWdpc3RlcjxUaGVUZXN0PigpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBHZW5lcmljQ2xhc3MoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXI8VGhlVGVzdD4oKTtcblxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gY29udGFpbmVyLlJlc29sdmU8VGhlVGVzdD4oKTtcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBjb250YWluZXIuUmVzb2x2ZTxUaGVUZXN0PigpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8Z2xvYmFsOjpCcmlkZ2UuSW9jLlRlc3QuQ2xhc3Nlcy5JbXBsLlRoZVRlc3Q+KCAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyc3Qsc2Vjb25kKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlTm90RXF1YWxzPGdsb2JhbDo6U3lzdGVtLkd1aWQ+KCAgICAgICAgICAgIGZpcnN0LklkLHNlY29uZC5JZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2QoXCJSZWdpc3Rlcih0eXBlb2YoVGhlVGVzdCkpXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBOb25HZW5lcmljQ2xhc3MoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb250YWluZXIuUmVnaXN0ZXIodHlwZW9mKFRoZVRlc3QpKTtcblxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gY29udGFpbmVyLlJlc29sdmU8VGhlVGVzdD4oKTtcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBjb250YWluZXIuUmVzb2x2ZTxUaGVUZXN0PigpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8Z2xvYmFsOjpCcmlkZ2UuSW9jLlRlc3QuQ2xhc3Nlcy5JbXBsLlRoZVRlc3Q+KCAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyc3Qsc2Vjb25kKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlTm90RXF1YWxzPGdsb2JhbDo6U3lzdGVtLkd1aWQ+KCAgICAgICAgICAgIGZpcnN0LklkLHNlY29uZC5JZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFtUZXN0TWV0aG9kKFwiUmVnaXN0ZXJGdW5jKCgpPT4gbmV3IFRoZVRlc3QoKSlcIildXG4gICAgICAgIHB1YmxpYyB2b2lkIEZ1bmNSZXNvbHZlKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBCcmlkZ2VJb2MoKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5SZWdpc3RlckZ1bmM8Z2xvYmFsOjpCcmlkZ2UuSW9jLlRlc3QuQ2xhc3Nlcy5JbXBsLlRoZVRlc3Q+KChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSW1wbC5UaGVUZXN0PikoKCk9PiBuZXcgVGhlVGVzdCgpKSk7XG5cbiAgICAgICAgICAgIHZhciBmaXJzdCA9IGNvbnRhaW5lci5SZXNvbHZlPFRoZVRlc3Q+KCk7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gY29udGFpbmVyLlJlc29sdmU8VGhlVGVzdD4oKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlTm90RXF1YWxzPGdsb2JhbDo6QnJpZGdlLklvYy5UZXN0LkNsYXNzZXMuSW1wbC5UaGVUZXN0PiggICAgICAgICAgICBcbiAgICAgICAgICAgIGZpcnN0LHNlY29uZCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxnbG9iYWw6OlN5c3RlbS5HdWlkPiggICAgICAgICAgICBmaXJzdC5JZCxzZWNvbmQuSWQpO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJlRmFsc2VFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQmVGYWxzZUV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJlVHJ1ZUV4Y2VwdGlvbiA6IEVhc3lUZXN0QmFzZUV4Y2VwdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBCZVRydWVFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFcXVhbEV4Y2VwdGlvbiA6IEVhc3lUZXN0QmFzZUV4Y2VwdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBFcXVhbEV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE5vdEVxdWFsRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIE5vdEVxdWFsRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGhyb3dzRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFRocm93c0V4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBUZXN0c0NvbGxlY3Rpb25NYW5hZ2VyIDogQ29sbGVjdGlvbk1hbmFnZXI8VGVzdERlc2NyaXB0b3I+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2NvdW50ID0gMDtcclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgTGlzdDxIVE1MRWxlbWVudD4gR2VuZXJhdGVFbGVtZW50KFRlc3REZXNjcmlwdG9yIGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gbmV3IExpc3Q8SFRNTEVsZW1lbnQ+KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcm93MSA9IG5ldyBIVE1MVGFibGVSb3dFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcm93MS5DbGFzc0xpc3QuQWRkKHRoaXMuX2NvdW50JTI9PTA/XCJ3aGl0ZVJvd1wiOlwiZ3JleVJvd1wiKTsgLy8gYWx0ZXJuYXRlXHJcbiAgICAgICAgICAgIGlmKGl0ZW0uU3VjY2VzcylcclxuICAgICAgICAgICAgICAgIHJvdzEuQ2xhc3NMaXN0LkFkZChcInBhc3NlZFRlc3RcIik7IC8vIGZhaWxlZCB0ZXN0IHJvd1xyXG5cclxuICAgICAgICAgICAgdmFyIGNlbGwxID0gcm93MS5JbnNlcnRDZWxsKCk7XHJcbiAgICAgICAgICAgIHZhciBjZWxsMiA9IHJvdzEuSW5zZXJ0Q2VsbCgpO1xyXG4gICAgICAgICAgICB2YXIgY2VsbDMgPSByb3cxLkluc2VydENlbGwoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENFTEwxXHJcbiAgICAgICAgICAgIGNlbGwxLkNsYXNzTmFtZSA9IGl0ZW0uU3VjY2VzcyA/IFwidGVzdC1va1wiIDogXCJ0ZXN0LWtvXCI7XHJcbiAgICAgICAgICAgIC8vIHJvdyBpbmRleFxyXG4gICAgICAgICAgICBjZWxsMS5BcHBlbmRDaGlsZChuZXcgSFRNTFVua25vd25FbGVtZW50KFwic3Ryb25nXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0gezF9XCIsdGhpcy5fY291bnQgKzEsaXRlbS5OYW1lKSAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICAgICBjZWxsMS5BcHBlbmRDaGlsZChuZXcgSFRNTFNwYW5FbGVtZW50KClcclxuLy8gICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgIElubmVySFRNTCA9ICRcIntpdGVtLk5hbWV9XCJcclxuLy8gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNlbGwxLkFwcGVuZENoaWxkKG5ldyBIVE1MQlJFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2VsbDEuQXBwZW5kQ2hpbGQobmV3IEhUTUxVbmtub3duRWxlbWVudChcImlcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcIiB7MH1cIixpdGVtLk5hbWVEZXNjcmlwdGlvbiksXHJcbiAgICAgICAgICAgICAgICBDbGFzc05hbWUgPSBcInczLXRleHQtZ3JleVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tXHJcblxyXG4gICAgICAgICAgICAvLyBDRUxMMlxyXG4gICAgICAgICAgICBjZWxsMi5BcHBlbmRDaGlsZChuZXcgSFRNTFVua25vd25FbGVtZW50KFwiaVwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDbGFzc05hbWUgPSBcImZhIGZhLW9iamVjdC1ncm91cFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2VsbDIuQXBwZW5kQ2hpbGQobmV3IEhUTUxTcGFuRWxlbWVudCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH1cIixpdGVtLkdyb3VwKSAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2VsbDIuQXBwZW5kQ2hpbGQobmV3IEhUTUxCUkVsZW1lbnQoKSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2VsbDIuQXBwZW5kQ2hpbGQobmV3IEhUTUxVbmtub3duRWxlbWVudChcImlcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcIiB7MH1cIixpdGVtLkdyb3VwRGVzY3JpcHRpb24pLFxyXG4gICAgICAgICAgICAgICAgQ2xhc3NOYW1lID0gXCJ3My10ZXh0LWdyZXlcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gQ0VMTDNcclxuICAgICAgICAgICAgY2VsbDMuQ2xhc3NOYW1lID0gXCJ3My1yaWdodFwiO1xyXG4gICAgICAgICAgICBjZWxsMy5BcHBlbmRDaGlsZChuZXcgSFRNTFVua25vd25FbGVtZW50KFwiaVwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDbGFzc05hbWUgPSBcImZhIGZhLWNsb2NrLW9cIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNlbGwzLkFwcGVuZENoaWxkKG5ldyBIVE1MU3BhbkVsZW1lbnQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiezB9IG1zXCIsaXRlbS5UaW1lKSAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9jb3VudCsrO1xyXG4gICAgICAgICAgICByZXMuQWRkKHJvdzEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW0uU3VjY2VzcykgcmV0dXJuIHJlcztcclxuXHJcbiAgICAgICAgICAgIHZhciByb3cyID0gbmV3IEhUTUxUYWJsZVJvd0VsZW1lbnQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJvdzIuQ2xhc3NOYW1lID0gdGhpcy5fY291bnQlMj09MCA/IFwid2hpdGVSb3dcIjpcImdyZXlSb3dcIjtcclxuICAgICAgICAgICAgdmFyIGNlbGwgPSByb3cyLkluc2VydENlbGwoKTtcclxuXHJcbiAgICAgICAgICAgIGNlbGwuQ29sU3BhbiA9IDM7XHJcbiAgICAgICAgICAgIGNlbGwuQ2xhc3NOYW1lID0gXCJ0ZXN0LWtvIGlubmVyLXJvd1wiO1xyXG5cclxuICAgICAgICAgICAgY2VsbC5BcHBlbmRDaGlsZChuZXcgSFRNTFBhcmFncmFwaEVsZW1lbnQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDbGFzc05hbWUgPSBcImVycm9yLW1lc3NhZ2VcIlxyXG4gICAgICAgICAgICB9KS5BcHBlbmRDaGlsZChuZXcgSFRNTFVua25vd25FbGVtZW50KFwiaVwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDbGFzc05hbWUgPSBcInczLXRleHQtZ3JleVwiLFxyXG4gICAgICAgICAgICAgICAgSW5uZXJIVE1MID0gaXRlbS5FcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNlbGwuQXBwZW5kQ2hpbGQobmV3IEhUTUxVbmtub3duRWxlbWVudChcInByZVwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBpdGVtLlN0YWNrXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmVzLkFkZChyb3cyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgSFRNTEVsZW1lbnQgQ29udGFpbmVyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXG4gICAgXG5wcml2YXRlIEhUTUxFbGVtZW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Db250YWluZXI9RG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQoXCJ0YWJsZVRlc3RzTGlzdFwiKTt9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XG5cbm5hbWVzcGFjZSBCcmlkZ2UuSW9jLlRlc3QuQ2xhc3Nlcy5JbXBsXG57XG4gICAgY2xhc3MgVGhlVGVzdCA6IElUZXN0XG4gICAge1xuICAgICAgICBwdWJsaWMgR3VpZCBJZCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuXG4gICAgXG5wcml2YXRlIEd1aWQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0lkPUd1aWQuTmV3R3VpZCgpO31cbn0iXQp9Cg==
