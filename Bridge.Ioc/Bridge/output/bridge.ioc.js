/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0
 */
Bridge.assembly("Bridge.Ioc", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Ioc.IIoc", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Ioc.IResolver", {
        $kind: "interface"
    });

    /** @namespace Bridge.Ioc */

    /**
     * Implementation of IIoc
     *
     * @public
     * @class Bridge.Ioc.BridgeIoc
     * @implements  Bridge.Ioc.IIoc
     */
    Bridge.define("Bridge.Ioc.BridgeIoc", {
        inherits: [Bridge.Ioc.IIoc],
        fields: {
            _resolvers: null
        },
        alias: [
            "Register$1", "Bridge$Ioc$IIoc$Register$1",
            "Register", "Bridge$Ioc$IIoc$Register",
            "RegisterSingleInstance$1", "Bridge$Ioc$IIoc$RegisterSingleInstance$1",
            "RegisterSingleInstance", "Bridge$Ioc$IIoc$RegisterSingleInstance",
            "RegisterFunc", "Bridge$Ioc$IIoc$RegisterFunc",
            "RegisterInstance", "Bridge$Ioc$IIoc$RegisterInstance",
            "Resolve", "Bridge$Ioc$IIoc$Resolve",
            "Resolve$1", "Bridge$Ioc$IIoc$Resolve$1"
        ],
        ctors: {
            init: function () {
                this._resolvers = new (System.Collections.Generic.Dictionary$2(Function,Bridge.Ioc.IResolver))();
            }
        },
        methods: {
            Register$1: function (TType, TImplementation) {
                this.CheckAlreadyAdded(TType);

                var resolver = new (Bridge.Ioc.TransientResolver$1(TImplementation))(this);
                this._resolvers.add(TType, resolver);
            },
            Register: function (TType) {
                this.Register$1(TType, TType);
            },
            RegisterSingleInstance$1: function (TType, TImplementation) {
                this.CheckAlreadyAdded(TType);

                var resolver = new (Bridge.Ioc.SingleInstanceResolver$1(TImplementation))(this);
                this._resolvers.add(TType, resolver);
            },
            RegisterSingleInstance: function (TType) {
                this.RegisterSingleInstance$1(TType, TType);
            },
            RegisterFunc: function (TType, func) {
                this.CheckAlreadyAdded(TType);

                var resolver = new (Bridge.Ioc.FuncResolver$1(TType))(func);
                this._resolvers.add(TType, resolver);
            },
            RegisterInstance: function (TType, instance) {
                this.CheckAlreadyAdded(TType);

                var resolver = new (Bridge.Ioc.InstanceResolver$1(TType))(instance);
                this._resolvers.add(TType, resolver);
            },
            Resolve: function (TType) {
                this.CheckNotRegistered$1(TType);

                var resolver = this._resolvers.get(TType);
                return Bridge.cast(resolver.Bridge$Ioc$IResolver$Resolve(), TType);
            },
            Resolve$1: function (type) {
                this.CheckNotRegistered(type);

                var resolver = this._resolvers.get(type);
                return resolver.Bridge$Ioc$IResolver$Resolve();
            },
            CheckAlreadyAdded: function (TType) {
                if (this._resolvers.containsKey(TType)) {
                    throw new System.Exception(System.String.format("{0} is already registered!", Bridge.Reflection.getTypeFullName(TType)));
                }
            },
            CheckNotRegistered: function (type) {
                if (!this._resolvers.containsKey(type)) {
                    throw new System.Exception(System.String.format("Cannot resolve {0}, it's not registered!", Bridge.Reflection.getTypeFullName(type)));
                }
            },
            CheckNotRegistered$1: function (TType) {
                this.CheckNotRegistered(TType);
            }
        }
    });

    Bridge.define("Bridge.Ioc.FuncResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.IResolver],
        props: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (resolveFunc) {
                this.$initialize();
                this.Resolve = function () {
                    return resolveFunc();
                };
            }
        }
    }; });

    Bridge.define("Bridge.Ioc.InstanceResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.IResolver],
        props: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (resolvedObj) {
                this.$initialize();
                this.Resolve = function () {
                    return resolvedObj;
                };
            }
        }
    }; });

    Bridge.define("Bridge.Ioc.SingleInstanceResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.IResolver],
        statics: {
            fields: {
                _singleInstance: Bridge.getDefaultValue(T)
            }
        },
        props: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (ioc) {
                this.$initialize();
                this.Resolve = function () {
                    // first resolve. Using transient resolver
                    if (Bridge.Ioc.SingleInstanceResolver$1(T)._singleInstance == null) {
                        var transientResolver = new (Bridge.Ioc.TransientResolver$1(T))(ioc);
                        Bridge.Ioc.SingleInstanceResolver$1(T)._singleInstance = Bridge.cast(Bridge.unbox(transientResolver.Resolve()), T);
                    }

                    return Bridge.Ioc.SingleInstanceResolver$1(T)._singleInstance;
                };
            }
        }
    }; });

    Bridge.define("Bridge.Ioc.TransientResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.IResolver],
        props: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (ioc) {
                this.$initialize();
                this.Resolve = function () {
                    var $t;
                    var toresolveType = T;

                    // get ctor
                    var $ctor = System.Linq.Enumerable.from(Bridge.Reflection.getMembers(toresolveType, 1, 28)).firstOrDefault(null, null);
                    if ($ctor == null) {
                        throw new System.Exception(System.String.format("No ctor found for type {0}!", Bridge.Reflection.getTypeFullName(toresolveType)));
                    }

                    // get ctor params
                    var ctorParams = ($ctor.pi || []);
                    if (!System.Linq.Enumerable.from(ctorParams).any()) {
                        return Bridge.cast(Bridge.unbox(Bridge.createInstance(T)), T);
                    } else {
                        // recursive resolve
                        var parameters = new (System.Collections.Generic.List$1(System.Object))(ctorParams.length);

                        $t = Bridge.getEnumerator(ctorParams);
                        try {
                            while ($t.moveNext()) {
                                var parameterInfo = $t.Current;
                                parameters.add(ioc.Bridge$Ioc$IIoc$Resolve$1(parameterInfo.pt));
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$dispose();
                            }
                        }
                        return Bridge.Reflection.invokeCI($ctor, Bridge.unbox(parameters.toArray()));
                    }
                };
            }
        }
    }; });
});
