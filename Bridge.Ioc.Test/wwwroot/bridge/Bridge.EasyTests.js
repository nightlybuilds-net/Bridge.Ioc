/**
 * @compiler Bridge.NET 16.6.0
 */
Bridge.assembly("Bridge.EasyTests", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.EasyTests.App", {
        main: function Main () {
            var runner = new Bridge.EasyTests.Runner();
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
             * @return  {void}
             */
            Run: function () {
                this._runnerViewModel.Running = true;

                this.DiscoverTest(); // discovery all tests

                this._runnerViewModel.TotalTests = this._internalTests.Count; // total tests found
                this.RunTests(); // run all test 

                this._runnerViewModel.FailedTests = System.Linq.Enumerable.from(this._internalTests).count(function (c) {
                        return !c.Success;
                    }); // failed tests
                this._runnerViewModel.PassedTests = System.Linq.Enumerable.from(this._internalTests).count(function (c) {
                        return c.Success;
                    }); // passed Tests
                this._runnerViewModel.TotalTime = System.Linq.Enumerable.from(this._runnerViewModel.Tests.Items).sum(function (s) {
                        return s.item1.Time;
                    });

                this._runnerViewModel.Running = false;
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
                    }));

                }));
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
            Time: 0
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuRWFzeVRlc3RzLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBc3NlcnRzL0Vhc3lBc3NlcnRzLmNzIiwiQXNzZXJ0cy9TaG91bGRFeHRlbnNpb25zLmNzIiwiQXR0cmlidXRlcy9UZXN0QXR0cmlidXRlLmNzIiwiQXR0cmlidXRlcy9UZXN0TWV0aG9kQXR0cmlidXRlLmNzIiwiQ29sbGVjdGlvbk1hbmFnZXIuY3MiLCJFeGNlcHRpb25zL0Vhc3lUZXN0QmFzZUV4Y2VwdGlvbi5jcyIsIlJ1bm5lci5jcyIsIlJ1bm5lclZpZXdNb2RlbC5jcyIsIlRlc3REZXNjcmlwdG9yLmNzIiwiRXhjZXB0aW9ucy9CZUZhbHNlRXhjZXB0aW9uLmNzIiwiRXhjZXB0aW9ucy9CZVRydWVFeGNlcHRpb24uY3MiLCJFeGNlcHRpb25zL0VxdWFsRXhjZXB0aW9uLmNzIiwiRXhjZXB0aW9ucy9Ob3RFcXVhbEV4Y2VwdGlvbi5jcyIsIkV4Y2VwdGlvbnMvVGhyb3dzRXhjZXB0aW9uLmNzIiwiVGVzdHNDb2xsZWN0aW9uTWFuYWdlci5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7WUFPWUEsYUFBYUEsSUFBSUE7WUFDakJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDS3NCQSxHQUFHQTtvQkFFekJBO3dCQUVJQTt3QkFDQUEsTUFBTUEsSUFBSUEsNENBQWdCQSx3RUFBK0RBLDhCQUFPQTs7Ozs7Ozs7Ozs0QkFRaEdBLE1BQU1BLElBQUlBLDRDQUFnQkEsa0ZBQTBFQSxrREFBaUJBLDhCQUFPQTs7Ozs7Ozs7Ozs7Ozs7O29DQVV4R0EsS0FBWUE7b0JBRWhEQSx3RUFBNkVBLEtBQUlBOzs7Ozs7Ozs7Ozs7O3VDQVExQ0EsS0FBWUE7b0JBRW5EQSwyRUFBZ0ZBLEtBQUlBOzs7Ozs7Ozs7Ozs7O3dDQVE1Q0E7b0JBRTVCQSxVQUFVQTtvQkFDVkEsSUFBR0EsQ0FBQ0E7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RkEsNkJBQW9CQTs7Z0JBRXBDQSxrQkFBa0JBOzs7Z0JBR2xCQSxrQkFBa0JBLGtEQUVGQSw4QkFBcUJBOzs7O2dCQU1yQ0E7Z0JBQ0FBLGtCQUFrQkE7O2dCQUtsQkEsa0JBQWtCQSxxREFFRkEsZ0NBQXVCQTs7O2dCQUd2Q0E7Z0JBQ0FBLFFBQVFBOztnQkFFUkEsSUFBSUE7b0JBQWNBLE9BQU9BOzs7Z0JBRXpCQSxXQUFXQTs7Z0JBRVhBLGlCQUFpQkE7Z0JBQ2pCQSxXQUFXQTs7Z0JBRVhBO2dCQUNBQTs7Z0JBRUFBLGlCQUFpQkEsb0ZBR0ZBLGlGQUdDQTs7Z0JBR2hCQSxpQkFBaUJBLG9EQUVEQTs7Z0JBR2hCQSxRQUFRQTs7Z0JBRVJBLE9BQU9BIiwKICAic291cmNlc0NvbnRlbnQiOiBbIlxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBwdWJsaWMgY2xhc3MgQXBwXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBydW5uZXIgPSBuZXcgUnVubmVyKCk7XG4gICAgICAgICAgICBydW5uZXIuUnVuKCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzXG57XG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFYXN5QXNzZXJ0c1xuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgYWN0aW9uIG11c3QgdGhyb3cgYSBzcGVjaWZpYyBleGNlcHRpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWN0aW9uXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxleGNlcHRpb24gY3JlZj1cIkVhc3lUZXN0QmFzZUV4Y2VwdGlvblwiPjwvZXhjZXB0aW9uPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgVGhyb3dzPFQ+KEFjdGlvbiBhY3Rpb24pIHdoZXJlIFQgOiBFeGNlcHRpb25cbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRocm93c0V4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiRXhwZWN0ZWQgRXhjZXB0aW9uOiB7MH0uIE5vIEV4Y3BldGlvbiBUaHJvd2VkIVwiLHR5cGVvZihUKS5OYW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoVCBleHBlY3RlZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBva1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUaHJvd3NFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIkV4Y2VwdGlvbiBvZiB0eXBlOiB7MH0gaW5zdGVhZCBvZiBFeHBlY3RlZCBFeGNlcHRpb246IHsxfVwiLGUuR2V0VHlwZSgpLk5hbWUsdHlwZW9mKFQpLk5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXNzZXJ0IHRoYXQgdHdvIG9iamVjdCBhcmUgZXF1YWxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2Vjb25kXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFyZUVxdWFsKG9iamVjdCBvYmosIG9iamVjdCBzZWNvbmQpXG4gICAgICAgIHtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPG9iamVjdD4oICAgICAgICAgICAgb2JqLHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFzc2VydCB0aGF0IHR3byBvYmplY3QgYXJlIG5vdCBlcXVhbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQXJlTm90RXF1YWwob2JqZWN0IG9iaiwgb2JqZWN0IHNlY29uZClcbiAgICAgICAge1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVOb3RFcXVhbHM8b2JqZWN0PiggICAgICAgICAgICBvYmosc2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3QgYSBleHBlY3RlZCB0byBiZSB0cnVlIGNvbmRpdGlvblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJleHBlY3Rlc1RydWVDb25kaXRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiQmVUcnVlRXhjZXB0aW9uXCI+PC9leGNlcHRpb24+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZVRydWUoRnVuYzxib29sPiBleHBlY3Rlc1RydWVDb25kaXRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBleHBlY3Rlc1RydWVDb25kaXRpb24oKTtcbiAgICAgICAgICAgIGlmKCFyZXMpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJlVHJ1ZUV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJDb25kaXRpb24gZXhwZWN0ZWQgdG8gYmUgdHJ1ZSBidXQgcmVzdWx0IGlzIEZBTFNFLlwiKSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBUZXN0IGEgZXhwZWN0ZWQgdG8gYmUgZmFsc2UgY29uZGl0aW9uXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4cGVjdGVzRmFsc2VDb25kaXRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiQmVGYWxzZUV4Y2VwdGlvblwiPjwvZXhjZXB0aW9uPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2hvdWxkQmVGYWxzZShGdW5jPGJvb2w+IGV4cGVjdGVzRmFsc2VDb25kaXRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBleHBlY3Rlc0ZhbHNlQ29uZGl0aW9uKCk7XG4gICAgICAgICAgICBpZihyZXMpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJlRmFsc2VFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChzdHJpbmcuRm9ybWF0KFwiQ29uZGl0aW9uIGV4cGVjdGVkIHRvIGJlIGZhbHNlIGJ1dCByZXN1bHQgaXMgVFJVRS5cIikpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBDT21wYXJlIG9ialxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvMVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm8yXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIE9iamVjdEVxdWFsKG9iamVjdCBvMSwgb2JqZWN0IG8yKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAobzEgPT0gbnVsbCAmJiBvMiAhPSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAobzEgIT0gbnVsbCAmJiBvMiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBvMSA9PSBudWxsIHx8IG8xLkVxdWFscyhvMik7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBJZiBvYmogaXMgbnVsbCByZXR1cm4gJ251bGwnIGVsc2UgdG9zdHJpbmdcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgVG9Db21wYXJlU3RyaW5nKHRoaXMgb2JqZWN0IG9iailcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiA9PSBudWxsID8gXCJudWxsXCIgOiBvYmouVG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnM7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFNob3VsZEV4dGVuc2lvbnNcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3QgZXF1YWxzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZE9ialwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZUVxdWFsczxUPih0aGlzIFQgb2JqLCBUIHNlY29uZE9iailcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVxdWFsID0gRWFzeUFzc2VydHMuT2JqZWN0RXF1YWwob2JqLCBzZWNvbmRPYmopO1xuXG4gICAgICAgICAgICBpZiAoIWVxdWFsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcXVhbEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCB7MH0uIFZhbHVlOiB7MX1cIixzZWNvbmRPYmouVG9Db21wYXJlU3RyaW5nKCksb2JqLlRvQ29tcGFyZVN0cmluZygpKSkpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRlc3Qgbm90IGVxdWFsc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRPYmpcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2hvdWxkQmVOb3RFcXVhbHM8VD4odGhpcyBUIG9iaiwgVCBzZWNvbmRPYmopXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcXVhbCA9IEVhc3lBc3NlcnRzLk9iamVjdEVxdWFsKG9iaiwgc2Vjb25kT2JqKTtcblxuICAgICAgICAgICAgaWYgKGVxdWFsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RFcXVhbEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KHN0cmluZy5Gb3JtYXQoXCJFeHBlY3RlZCB7MH0gZGlmZmVyZW50IGZyb20gezF9LiBBcmUgRXF1YWwhXCIsc2Vjb25kT2JqLlRvQ29tcGFyZVN0cmluZygpLG9iai5Ub0NvbXBhcmVTdHJpbmcoKSkpKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzXG57XG4gICAgXG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBBdHRyaWJ1dGUgZm9yIHRlc3QgY2xhc3NcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIFtTeXN0ZW0uQXR0cmlidXRlVXNhZ2UoU3lzdGVtLkF0dHJpYnV0ZVRhcmdldHMuQ2xhc3MpXSBcbiAgICBwdWJsaWMgY2xhc3MgVGVzdEF0dHJpYnV0ZSA6IEF0dHJpYnV0ZVxuICAgIHtcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvbiB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgVGVzdEF0dHJpYnV0ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRlc3RBdHRyaWJ1dGUoc3RyaW5nIGRlc2NyaXB0aW9uIClcbiAgICAgICAge1xuICAgICAgICAgICAgRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXNcbntcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIEF0dHJpYnV0ZSBmb3IgdGVzdCBNZXRob2RcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIFtTeXN0ZW0uQXR0cmlidXRlVXNhZ2UoU3lzdGVtLkF0dHJpYnV0ZVRhcmdldHMuTWV0aG9kKV0gXG4gICAgcHVibGljIGNsYXNzIFRlc3RNZXRob2RBdHRyaWJ1dGUgOiBBdHRyaWJ1dGVcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFRlc3RNZXRob2RBdHRyaWJ1dGUoc3RyaW5nIGRlc2NyaXB0aW9uID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gTWFuYWdlIGEgY29sbGVjdGlvbiBvZiBpdGVtXG4gICAgLy8vIEF1dG9tYXRpY2FsbHkgc3luYyBjb2xsZWN0aW9uIHdpdGggZG9tXG4gICAgLy8vIFxuICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICBpbnRlcm5hbCBhYnN0cmFjdCBjbGFzcyBDb2xsZWN0aW9uTWFuYWdlcjxUPiBcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEl0ZW1zIGNvbGxlY3Rpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHJlYWRvbmx5IExpc3Q8VHVwbGU8VCwgTGlzdDxIVE1MRWxlbWVudD4+PiBJdGVtcyA9IG5ldyBMaXN0PFR1cGxlPFQsIExpc3Q8SFRNTEVsZW1lbnQ+Pj4oKTtcblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZW5lcmF0ZSBhIEh0bWxFbGVtZW50IGZyb20gVCBpdGVtXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIml0ZW1cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgTGlzdDxIVE1MRWxlbWVudD4gR2VuZXJhdGVFbGVtZW50KFQgaXRlbSk7XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQ2FsbGVkIHdoZW4gdGhlIG5ldyBIVE1MRWxlbWVudCBpcyBnZW5lcmF0ZWQuXG4gICAgICAgIC8vLyBEZWZhdWx0IGlzIEFwcGVuZENoaWxkIHRvIENvbnRhaW5lci5cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWRkZWRFbGVtZW50XCI+PC9wYXJhbT5cbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBEb21BY3Rpb25PbkFkZChUdXBsZTxULCBMaXN0PEhUTUxFbGVtZW50Pj4gYWRkZWRFbGVtZW50KVxuICAgICAgICB7XG4gICAgICAgICAgICBhZGRlZEVsZW1lbnQuSXRlbTIuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50PikoZiA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuQ29udGFpbmVyLkFwcGVuZENoaWxkKGYpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQ29udGFpbmVyIGVsZW1lbnQgZm9yIGNvbGxlY3Rpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIGFic3RyYWN0IEhUTUxFbGVtZW50IENvbnRhaW5lciB7IGdldDsgfVxuXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgQWRkUmFuZ2UoSUVudW1lcmFibGU8VD4gaXRlbXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGl0ZW1zKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuQWRkKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBBZGQoVCBpdGVtKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaW50ZXJuYWxJdGVtID0gbmV3IFR1cGxlPFQsIExpc3Q8SFRNTEVsZW1lbnQ+PihpdGVtLCB0aGlzLkdlbmVyYXRlRWxlbWVudChpdGVtKSk7XG4gICAgICAgICAgICB0aGlzLkl0ZW1zLkFkZChpbnRlcm5hbEl0ZW0pO1xuXG4gICAgICAgICAgICB0aGlzLkRvbUFjdGlvbk9uQWRkKGludGVybmFsSXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIENsZWFyKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBlbGVtZW50cyBmcm9tIGRvbVxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHR1cGxlIGluIHRoaXMuSXRlbXMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gY2Fubm90IHVzZSB0dXBsZS5JdGVtMi5SZW1vdmUoKTsgKiogbm90IHN1cHBvcnRlZCBvbiBFREdFL0lFICoqXG4gICAgICAgICAgICAgICAgdHVwbGUuSXRlbTIuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50PikoZiA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db250YWluZXIuUmVtb3ZlQ2hpbGQoZik7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLkl0ZW1zLkNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhUIGl0ZW0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdDxnbG9iYWw6OlN5c3RlbS5UdXBsZTxULCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+PixUPih0aGlzLkl0ZW1zLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR1cGxlPFQsIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuTGlzdDxnbG9iYWw6OkJyaWRnZS5IdG1sNS5IVE1MRWxlbWVudD4+LCBUPikocyA9PiBzLkl0ZW0xKSkuQ29udGFpbnMoaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIFJlbW92ZShUIGl0ZW0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5Db250YWlucyhpdGVtKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB2YXIgaW50ZXJuYWxJdGVtID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxnbG9iYWw6OlN5c3RlbS5UdXBsZTxULCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+Pj4odGhpcy5JdGVtcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UdXBsZTxULCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+PiwgYm9vbD4pKGYgPT4gZi5JdGVtMS5FcXVhbHMoaXRlbSkpKTtcblxuICAgICAgICAgICAgLy8gY2Fubm90IHVzZSB0dXBsZS5JdGVtMi5SZW1vdmUoKTsgKiogbm90IHN1cHBvcnRlZCBvbiBFREdFL0lFICoqXG4gICAgICAgICAgICBpbnRlcm5hbEl0ZW0uSXRlbTIuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50PikoZiA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuQ29udGFpbmVyLlJlbW92ZUNoaWxkKGYpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB2YXIgcmVzID0gdGhpcy5JdGVtcy5SZW1vdmUoaW50ZXJuYWxJdGVtKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbnQgQ291bnQge2dldHtyZXR1cm4gdGhpcy5JdGVtcy5Db3VudDt9fVxuICAgICAgICBwdWJsaWMgaW50IEluZGV4T2YoVCBpdGVtKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtcy5JbmRleE9mKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8VCwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4+KHRoaXMuSXRlbXMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8VCwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4sIGJvb2w+KShmID0+IGYuSXRlbTEuRXF1YWxzKGl0ZW0pKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2hcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBUdXBsZTxULCBMaXN0PEhUTUxFbGVtZW50Pj4gdGhpc1tpbnQgaW5kZXhdXG4gICAgICAgIHtcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB0aGlzLkl0ZW1zW2luZGV4XTsgfVxuICAgICAgICAgICAgc2V0IHsgdGhpcy5JdGVtc1tpbmRleF0gPSB2YWx1ZTsgfVxuICAgICAgICB9XG5cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXG57XG4gICAgcHVibGljIGNsYXNzIEVhc3lUZXN0QmFzZUV4Y2VwdGlvbiA6IEV4Y2VwdGlvblxuICAgIHtcbiAgICAgICAgcHVibGljIEVhc3lUZXN0QmFzZUV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpIFxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBpbnRlcm5hbCBjbGFzcyBSdW5uZXJcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTGlzdDxUZXN0RGVzY3JpcHRvcj4gX2ludGVybmFsVGVzdHMgPSBuZXcgTGlzdDxUZXN0RGVzY3JpcHRvcj4oKTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSdW5uZXJWaWV3TW9kZWwgX3J1bm5lclZpZXdNb2RlbDtcblxuICAgICAgICBwdWJsaWMgUnVubmVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsID0gbmV3IFJ1bm5lclZpZXdNb2RlbCgpO1xuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLkJyb3dzZXJJbmZvID0gR2xvYmFsLk5hdmlnYXRvci5BcHBWZXJzaW9uO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biB0ZXN0c1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBSdW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuUnVubmluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuRGlzY292ZXJUZXN0KCk7IC8vIGRpc2NvdmVyeSBhbGwgdGVzdHNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLlRvdGFsVGVzdHMgPSB0aGlzLl9pbnRlcm5hbFRlc3RzLkNvdW50OyAvLyB0b3RhbCB0ZXN0cyBmb3VuZFxuICAgICAgICAgICAgdGhpcy5SdW5UZXN0cygpOyAvLyBydW4gYWxsIHRlc3QgXG5cbiAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5GYWlsZWRUZXN0cyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQ291bnQ8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPih0aGlzLl9pbnRlcm5hbFRlc3RzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgYm9vbD4pKGM9PiFjLlN1Y2Nlc3MpKTsgLy8gZmFpbGVkIHRlc3RzXG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuUGFzc2VkVGVzdHMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkNvdW50PGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4odGhpcy5faW50ZXJuYWxUZXN0cywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3IsIGJvb2w+KShjPT5jLlN1Y2Nlc3MpKTsgLy8gcGFzc2VkIFRlc3RzXG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuVG90YWxUaW1lID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TdW08Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+Pj4odGhpcy5fcnVubmVyVmlld01vZGVsLlRlc3RzLkl0ZW1zLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR1cGxlPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4sIGludD4pKHM9PnMuSXRlbTEuVGltZSkpO1xuXG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuUnVubmluZyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biBcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJ1blRlc3RzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxUZXN0cy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPikoYXN5bmMgZiA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGF3YWl0IGYuUnVuVGVzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5UZXN0cy5BZGQoZik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBEaXNjb3ZlcnkgYWxsIHRlc3RzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBEaXNjb3ZlclRlc3QoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdHlwZXMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSxnbG9iYWw6OlN5c3RlbS5UeXBlPihBcHBEb21haW4uQ3VycmVudERvbWFpbi5HZXRBc3NlbWJsaWVzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxnbG9iYWw6OlN5c3RlbS5UeXBlPj4pKHMgPT4gcy5HZXRUeXBlcygpKSlcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHc9PiF3LkZ1bGxOYW1lLlRvTG93ZXIoKS5TdGFydHNXaXRoKFwic3lzdGVtXCIpKSlcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHc9PiF3LklzSW50ZXJmYWNlICYmICF3LklzQWJzdHJhY3QpKVxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodz0+U3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8b2JqZWN0Pih3LkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RBdHRyaWJ1dGUpLHRydWUpKSkpXG4gICAgICAgICAgICAgICAgLlRvTGlzdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBydW4gYWxsIHRlc3RzIG1ldGhvZFxuICAgICAgICAgICAgdHlwZXMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlR5cGU+KShmID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHRlc3RBdHQgPSAoVGVzdEF0dHJpYnV0ZSlTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PG9iamVjdD4oZi5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0QXR0cmlidXRlKSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgdmFyIHRlc3RNZXRob2RzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8+KGYuR2V0TWV0aG9kcygpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbywgYm9vbD4pKHcgPT4gdy5Jc1B1YmxpYykpXG4gICAgICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLk1ldGhvZEluZm8sIGJvb2w+KSh3ID0+IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PG9iamVjdD4ody5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0TWV0aG9kQXR0cmlidXRlKSwgdHJ1ZSkpKSkuVG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGVzdE1ldGhvZHMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbz4pKG1ldGhvZCA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSAoVGVzdE1ldGhvZEF0dHJpYnV0ZSkgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxvYmplY3Q+KG1ldGhvZC5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0TWV0aG9kQXR0cmlidXRlKSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3REZXNjciA9IG5ldyBUZXN0RGVzY3JpcHRvclxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBlID0gZixcbiAgICAgICAgICAgICAgICAgICAgICAgIE1ldGhvZCA9IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEdyb3VwID0gZi5OYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgR3JvdXBEZXNjcmlwdGlvbiA9IHN0cmluZy5Jc051bGxPckVtcHR5KHRlc3RBdHQuRGVzY3JpcHRpb24pID8gc3RyaW5nLkVtcHR5IDogdGVzdEF0dC5EZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIE5hbWUgPSBtZXRob2QuTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE5hbWVEZXNjcmlwdGlvbiA9IHN0cmluZy5Jc051bGxPckVtcHR5KGF0dHIuRGVzY3JpcHRpb24pID8gc3RyaW5nLkVtcHR5IDogYXR0ci5EZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ludGVybmFsVGVzdHMuQWRkKHRlc3REZXNjcik7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBCcmlkZ2UuSHRtbDU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgaW50ZXJuYWwgY2xhc3MgUnVubmVyVmlld01vZGVsXG4gICAge1xuICAgICAgICBcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfdG90YWxUZXN0cyA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwidG90YWxUZXN0c1wiKTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfcGFzc2VkVGVzdHMgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInBhc3NlZFRlc3RzXCIpO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEhUTUxFbGVtZW50IF9mYWlsZWRUZXN0cyA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwiZmFpbGVkVGVzdHNcIik7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSFRNTEVsZW1lbnQgX3RvdGFsVGltZSA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwidG90YWxUaW1lXCIpO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEhUTUxFbGVtZW50IF9icm93c2VySW5mbyA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwiYnJvd3NlckluZm9cIik7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSFRNTEVsZW1lbnQgX2xvYWRlciA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwibG9hZGVyXCIpO1xuXG5cbiAgICAgICAgcHVibGljIFRlc3RzQ29sbGVjdGlvbk1hbmFnZXIgVGVzdHMgPSBuZXcgVGVzdHNDb2xsZWN0aW9uTWFuYWdlcigpO1xuXG4gICAgICAgIHB1YmxpYyBSdW5uZXJWaWV3TW9kZWwoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaGlkZVBhc3NlZCA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxJbnB1dEVsZW1lbnQ+KFwiaGlkZVBhc3NlZFRlc3RzXCIpO1xuICAgICAgICAgICAgaGlkZVBhc3NlZC5PbkNoYW5nZSArPSBlID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGlzQ2hlY2tlZCA9IGhpZGVQYXNzZWQuQ2hlY2tlZDtcbiAgICAgICAgICAgICAgICB2YXIgdG9IaWRlID0gRG9jdW1lbnQuR2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBhc3NlZFRlc3RcIik7XG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGh0bWxFbGVtZW50IGluIHRvSGlkZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50LkhpZGRlbiA9IGlzQ2hlY2tlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEhUTUxJbnB1dEVsZW1lbnQgSGlkZVBhc3NlZCB7IGdldDsgc2V0OyB9XG5cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBUZXN0IGFyZSBydW5uaW5nXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyBib29sIFJ1bm5pbmdcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0IHsgX2xvYWRlci5IaWRkZW4gPSAhdmFsdWU7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRvdGFsIHRlc3RzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyBpbnQgVG90YWxUZXN0c1xuICAgICAgICB7XG4gICAgICAgICAgICBzZXQgeyBfdG90YWxUZXN0cy5Jbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiezB9IHRlc3RzXCIsdmFsdWUpOyB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFBhc3NlZCB0ZXN0cyBjb3VudFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgaW50IFBhc3NlZFRlc3RzXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNldCB7IF9wYXNzZWRUZXN0cy5Jbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiezB9IHBhc3NlZFwiLHZhbHVlKTsgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBGYWlsZWQgdGVzdHMgY291bnRcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIGludCBGYWlsZWRUZXN0c1xuICAgICAgICB7XG4gICAgICAgICAgICBzZXQgeyBfZmFpbGVkVGVzdHMuSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcInswfSBmYWlsZWRcIix2YWx1ZSk7IH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gVG90YWwgdGltZVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgaW50IFRvdGFsVGltZVxuICAgICAgICB7XG4gICAgICAgICAgICBzZXQgeyBfdG90YWxUaW1lLklubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCJUZXN0cyBjb21wbGV0ZWQgaW4gezB9IG1zXCIsdmFsdWUpOyB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEJyb3dzZXIgaW5mb1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJyb3dzZXJJbmZvXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNldCB7IF9icm93c2VySW5mby5Jbm5lckhUTUwgPSB2YWx1ZTsgfVxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5EaWFnbm9zdGljcztcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcblxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHNcbntcbiAgICBpbnRlcm5hbCBjbGFzcyBUZXN0RGVzY3JpcHRvclxuICAgIHtcblxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWVEZXNjcmlwdGlvbiB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR3JvdXAgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdyb3VwRGVzY3JpcHRpb24geyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBUeXBlIFR5cGUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgTWV0aG9kSW5mbyBNZXRob2QgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIEV4Y2VwdGlvbiBGYWlsQXNzZXJ0IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGJvb2wgU3VjY2VzcyB7Z2V0e3JldHVybiBGYWlsQXNzZXJ0ID09IG51bGw7fX1cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEVycm9yIHtnZXR7cmV0dXJuIEZhaWxBc3NlcnQgPT0gbnVsbCA/IHN0cmluZy5FbXB0eSA6IHN0cmluZy5Gb3JtYXQoXCJ7MH06IHsxfVwiLEZhaWxBc3NlcnQuR2V0VHlwZSgpLk5hbWUsRmFpbEFzc2VydC5NZXNzYWdlKTt9fVxuICAgICAgICBwdWJsaWMgc3RyaW5nIFN0YWNrIHtnZXR7cmV0dXJuIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsRmFpbEFzc2VydCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEV4Y2VwdGlvbj4oXCJrZXkxXCIpLlN0YWNrVHJhY2U6KHN0cmluZyludWxsO319XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgaW50IFRpbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcblxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFJ1biB0ZXN0LlxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSdW5UZXN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgbWV0aG9kIHJldHVybiByYXNrIGF3YWl0XG4gICAgICAgICAgICB2YXIgaXNUYXNrID0gdGhpcy5NZXRob2QuUmV0dXJuVHlwZSA9PSB0eXBlb2YoVGFzayk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZSh0aGlzLlR5cGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgd2F0Y2ggPSBuZXcgU3RvcHdhdGNoKCk7XG4gICAgICAgICAgICB3YXRjaC5TdGFydCgpO1xuXG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNUYXNrKVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCAoVGFzaykgdGhpcy5NZXRob2QuSW52b2tlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTWV0aG9kLkludm9rZShpbnN0YW5jZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5GYWlsQXNzZXJ0ID0gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3YXRjaC5TdG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5UaW1lID0gKGludCl3YXRjaC5FbGFwc2VkTWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIG9mIHR5cGUgaXMgZGlzcG9zYWJsZVxuICAgICAgICAgICAgICAgIHZhciBkaXNwb3NhYmxlID0gaW5zdGFuY2UgYXMgSURpc3Bvc2FibGU7XG4gICAgICAgICAgICAgICAgZGlzcG9zYWJsZSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+ZGlzcG9zYWJsZS5EaXNwb3NlKCkpOm51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXG57XG4gICAgcHVibGljIGNsYXNzIEJlRmFsc2VFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBCZUZhbHNlRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcbntcbiAgICBwdWJsaWMgY2xhc3MgQmVUcnVlRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBwdWJsaWMgQmVUcnVlRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcbntcbiAgICBwdWJsaWMgY2xhc3MgRXF1YWxFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBFcXVhbEV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXG57XG4gICAgcHVibGljIGNsYXNzIE5vdEVxdWFsRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXG4gICAge1xuICAgICAgICBwdWJsaWMgTm90RXF1YWxFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKVxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xue1xuICAgIHB1YmxpYyBjbGFzcyBUaHJvd3NFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cbiAgICB7XG4gICAgICAgIHB1YmxpYyBUaHJvd3NFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKVxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXG57XG4gICAgaW50ZXJuYWwgY2xhc3MgVGVzdHNDb2xsZWN0aW9uTWFuYWdlciA6IENvbGxlY3Rpb25NYW5hZ2VyPFRlc3REZXNjcmlwdG9yPlxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2NvdW50ID0gMDtcbiAgICAgICAgXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBMaXN0PEhUTUxFbGVtZW50PiBHZW5lcmF0ZUVsZW1lbnQoVGVzdERlc2NyaXB0b3IgaXRlbSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlcyA9IG5ldyBMaXN0PEhUTUxFbGVtZW50PigpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcm93MSA9IG5ldyBIVE1MVGFibGVSb3dFbGVtZW50KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcm93MS5DbGFzc0xpc3QuQWRkKHRoaXMuX2NvdW50JTI9PTA/XCJ3aGl0ZVJvd1wiOlwiZ3JleVJvd1wiKTsgLy8gYWx0ZXJuYXRlXG4gICAgICAgICAgICBpZihpdGVtLlN1Y2Nlc3MpXG4gICAgICAgICAgICAgICAgcm93MS5DbGFzc0xpc3QuQWRkKFwicGFzc2VkVGVzdFwiKTsgLy8gZmFpbGVkIHRlc3Qgcm93XG5cbiAgICAgICAgICAgIHZhciBjZWxsMSA9IHJvdzEuSW5zZXJ0Q2VsbCgpO1xuICAgICAgICAgICAgdmFyIGNlbGwyID0gcm93MS5JbnNlcnRDZWxsKCk7XG4gICAgICAgICAgICB2YXIgY2VsbDMgPSByb3cxLkluc2VydENlbGwoKTtcblxuICAgICAgICAgICAgLy8gQ0VMTDFcbiAgICAgICAgICAgIGNlbGwxLkNsYXNzTmFtZSA9IGl0ZW0uU3VjY2VzcyA/IFwidGVzdC1va1wiIDogXCJ0ZXN0LWtvXCI7XG4gICAgICAgICAgICAvLyByb3cgaW5kZXhcbiAgICAgICAgICAgIGNlbGwxLkFwcGVuZENoaWxkKG5ldyBIVE1MVW5rbm93bkVsZW1lbnQoXCJzdHJvbmdcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiezB9IHsxfVwiLHRoaXMuX2NvdW50ICsxLGl0ZW0uTmFtZSkgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuLy8gICAgICAgICAgICBjZWxsMS5BcHBlbmRDaGlsZChuZXcgSFRNTFNwYW5FbGVtZW50KClcbi8vICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgSW5uZXJIVE1MID0gJFwie2l0ZW0uTmFtZX1cIlxuLy8gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2VsbDEuQXBwZW5kQ2hpbGQobmV3IEhUTUxCUkVsZW1lbnQoKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNlbGwxLkFwcGVuZENoaWxkKG5ldyBIVE1MVW5rbm93bkVsZW1lbnQoXCJpXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcIiB7MH1cIixpdGVtLk5hbWVEZXNjcmlwdGlvbiksXG4gICAgICAgICAgICAgICAgQ2xhc3NOYW1lID0gXCJ3My10ZXh0LWdyZXlcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tXG5cbiAgICAgICAgICAgIC8vIENFTEwyXG4gICAgICAgICAgICBjZWxsMi5BcHBlbmRDaGlsZChuZXcgSFRNTFVua25vd25FbGVtZW50KFwiaVwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIENsYXNzTmFtZSA9IFwiZmEgZmEtb2JqZWN0LWdyb3VwXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjZWxsMi5BcHBlbmRDaGlsZChuZXcgSFRNTFNwYW5FbGVtZW50KClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiezB9XCIsaXRlbS5Hcm91cCkgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2VsbDIuQXBwZW5kQ2hpbGQobmV3IEhUTUxCUkVsZW1lbnQoKSk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2VsbDIuQXBwZW5kQ2hpbGQobmV3IEhUTUxVbmtub3duRWxlbWVudChcImlcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiIHswfVwiLGl0ZW0uR3JvdXBEZXNjcmlwdGlvbiksXG4gICAgICAgICAgICAgICAgQ2xhc3NOYW1lID0gXCJ3My10ZXh0LWdyZXlcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENFTEwzXG4gICAgICAgICAgICBjZWxsMy5DbGFzc05hbWUgPSBcInczLXJpZ2h0XCI7XG4gICAgICAgICAgICBjZWxsMy5BcHBlbmRDaGlsZChuZXcgSFRNTFVua25vd25FbGVtZW50KFwiaVwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIENsYXNzTmFtZSA9IFwiZmEgZmEtY2xvY2stb1wiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2VsbDMuQXBwZW5kQ2hpbGQobmV3IEhUTUxTcGFuRWxlbWVudCgpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcInswfSBtc1wiLGl0ZW0uVGltZSkgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fY291bnQrKztcbiAgICAgICAgICAgIHJlcy5BZGQocm93MSk7XG5cbiAgICAgICAgICAgIGlmIChpdGVtLlN1Y2Nlc3MpIHJldHVybiByZXM7XG5cbiAgICAgICAgICAgIHZhciByb3cyID0gbmV3IEhUTUxUYWJsZVJvd0VsZW1lbnQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcm93Mi5DbGFzc05hbWUgPSB0aGlzLl9jb3VudCUyPT0wID8gXCJ3aGl0ZVJvd1wiOlwiZ3JleVJvd1wiO1xuICAgICAgICAgICAgdmFyIGNlbGwgPSByb3cyLkluc2VydENlbGwoKTtcblxuICAgICAgICAgICAgY2VsbC5Db2xTcGFuID0gMztcbiAgICAgICAgICAgIGNlbGwuQ2xhc3NOYW1lID0gXCJ0ZXN0LWtvIGlubmVyLXJvd1wiO1xuXG4gICAgICAgICAgICBjZWxsLkFwcGVuZENoaWxkKG5ldyBIVE1MUGFyYWdyYXBoRWxlbWVudCgpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgQ2xhc3NOYW1lID0gXCJlcnJvci1tZXNzYWdlXCJcbiAgICAgICAgICAgIH0pLkFwcGVuZENoaWxkKG5ldyBIVE1MVW5rbm93bkVsZW1lbnQoXCJpXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgQ2xhc3NOYW1lID0gXCJ3My10ZXh0LWdyZXlcIixcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBpdGVtLkVycm9yXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2VsbC5BcHBlbmRDaGlsZChuZXcgSFRNTFVua25vd25FbGVtZW50KFwicHJlXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgSW5uZXJIVE1MID0gaXRlbS5TdGFja1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcy5BZGQocm93Mik7XG5cbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgSFRNTEVsZW1lbnQgQ29udGFpbmVyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXG5cbiAgICBcbnByaXZhdGUgSFRNTEVsZW1lbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0NvbnRhaW5lcj1Eb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInRhYmxlVGVzdHNMaXN0XCIpO31cbn0iXQp9Cg==
