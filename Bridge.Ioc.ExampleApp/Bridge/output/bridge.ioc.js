/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("Bridge.Ioc", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Ioc.Abstract.IIoc", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Ioc.Abstract.IResolver", {
        $kind: "interface"
    });

    /** @namespace Bridge.Ioc */

    /**
     * Implementation of IIoc
     *
     * @public
     * @class Bridge.Ioc.BridgeIoc
     * @implements  Bridge.Ioc.Abstract.IIoc
     */
    Bridge.define("Bridge.Ioc.BridgeIoc", {
        inherits: [Bridge.Ioc.Abstract.IIoc],
        _resolvers: null,
        config: {
            alias: [
            "register$1", "Bridge$Ioc$Abstract$IIoc$register$1",
            "register", "Bridge$Ioc$Abstract$IIoc$register",
            "registerSingleInstance$1", "Bridge$Ioc$Abstract$IIoc$registerSingleInstance$1",
            "registerSingleInstance", "Bridge$Ioc$Abstract$IIoc$registerSingleInstance",
            "registerFunc", "Bridge$Ioc$Abstract$IIoc$registerFunc",
            "registerInstance", "Bridge$Ioc$Abstract$IIoc$registerInstance",
            "resolve", "Bridge$Ioc$Abstract$IIoc$resolve",
            "resolve$1", "Bridge$Ioc$Abstract$IIoc$resolve$1"
            ],
            init: function () {
                this._resolvers = new (System.Collections.Generic.Dictionary$2(Function,Bridge.Ioc.Abstract.IResolver))();
            }
        },
        register$1: function (TType, TImplementation) {
            this.checkAlreadyAdded(TType);

            var resolver = new (Bridge.Ioc.Resolvers.TransientResolver$1(TImplementation))(this);
            this._resolvers.add(TType, resolver);
        },
        register: function (TType) {
            this.register$1(TType, TType);
        },
        registerSingleInstance$1: function (TType, TImplementation) {
            this.checkAlreadyAdded(TType);

            var resolver = new (Bridge.Ioc.Resolvers.SingleInstanceResolver$1(TImplementation))(this);
            this._resolvers.add(TType, resolver);
        },
        registerSingleInstance: function (TType) {
            this.registerSingleInstance$1(TType, TType);
        },
        registerFunc: function (TType, func) {
            this.checkAlreadyAdded(TType);

            var resolver = new (Bridge.Ioc.Resolvers.FuncResolver$1(TType))(func);
            this._resolvers.add(TType, resolver);
        },
        registerInstance: function (TType, instance) {
            this.checkAlreadyAdded(TType);

            var resolver = new (Bridge.Ioc.Resolvers.InstanceResolver$1(TType))(instance);
            this._resolvers.add(TType, resolver);
        },
        resolve: function (TType) {
            this.checkNotRegistered$1(TType);

            var resolver = this._resolvers.get(TType);
            return Bridge.cast(resolver.Bridge$Ioc$Abstract$IResolver$getResolve()(), TType);
        },
        resolve$1: function (type) {
            this.checkNotRegistered(type);

            var resolver = this._resolvers.get(type);
            return resolver.Bridge$Ioc$Abstract$IResolver$getResolve()();
        },
        checkAlreadyAdded: function (TType) {
            if (this._resolvers.containsKey(TType)) {
                throw new System.Exception(System.String.format("{0} is already registered!", Bridge.Reflection.getTypeFullName(TType)));
            }
        },
        checkNotRegistered: function (type) {
            if (!this._resolvers.containsKey(type)) {
                throw new System.Exception(System.String.format("Cannot resolve {0}, it's not registered!", Bridge.Reflection.getTypeFullName(type)));
            }
        },
        checkNotRegistered$1: function (TType) {
            this.checkNotRegistered(TType);
        }
    });

    Bridge.define("Bridge.Ioc.Resolvers.FuncResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.Abstract.IResolver],
        config: {
            properties: {
                Resolve: null
            },
            alias: [
            "getResolve", "Bridge$Ioc$Abstract$IResolver$getResolve",
            "setResolve", "Bridge$Ioc$Abstract$IResolver$setResolve"
            ]
        },
        ctor: function (resolveFunc) {
            this.$initialize();
            this.setResolve(function () {
                return resolveFunc();
            });
        }
    }; });

    Bridge.define("Bridge.Ioc.Resolvers.InstanceResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.Abstract.IResolver],
        config: {
            properties: {
                Resolve: null
            },
            alias: [
            "getResolve", "Bridge$Ioc$Abstract$IResolver$getResolve",
            "setResolve", "Bridge$Ioc$Abstract$IResolver$setResolve"
            ]
        },
        ctor: function (resolvedObj) {
            this.$initialize();
            this.setResolve(function () {
                return resolvedObj;
            });
        }
    }; });

    Bridge.define("Bridge.Ioc.Resolvers.SingleInstanceResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.Abstract.IResolver],
        statics: {
            _singleInstance: Bridge.getDefaultValue(T)
        },
        config: {
            properties: {
                Resolve: null
            },
            alias: [
            "getResolve", "Bridge$Ioc$Abstract$IResolver$getResolve",
            "setResolve", "Bridge$Ioc$Abstract$IResolver$setResolve"
            ]
        },
        ctor: function (ioc) {
            this.$initialize();
            this.setResolve(function () {
                // first resolve. Using transient resolver
                if (Bridge.Ioc.Resolvers.SingleInstanceResolver$1(T)._singleInstance == null) {
                    var transientResolver = new (Bridge.Ioc.Resolvers.TransientResolver$1(T))(ioc);
                    Bridge.Ioc.Resolvers.SingleInstanceResolver$1(T)._singleInstance = Bridge.cast(transientResolver.getResolve()(), T);
                }

                return Bridge.Ioc.Resolvers.SingleInstanceResolver$1(T)._singleInstance;
            });
        }
    }; });

    Bridge.define("Bridge.Ioc.Resolvers.TransientResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.Abstract.IResolver],
        config: {
            properties: {
                Resolve: null
            },
            alias: [
            "getResolve", "Bridge$Ioc$Abstract$IResolver$getResolve",
            "setResolve", "Bridge$Ioc$Abstract$IResolver$setResolve"
            ]
        },
        ctor: function (ioc) {
            this.$initialize();
            this.setResolve(function () {
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
                    return Bridge.cast(Bridge.createInstance(T), T);
                } else {
                    // recursive resolve
                    var parameters = new (System.Collections.Generic.List$1(Object))(ctorParams.length);

                    $t = Bridge.getEnumerator(ctorParams);
                    while ($t.moveNext()) {
                        var parameterInfo = $t.getCurrent();
                        parameters.add(ioc.Bridge$Ioc$Abstract$IIoc$resolve$1(parameterInfo.pt));
                    }

                    return Bridge.Reflection.invokeCI($ctor, parameters.toArray());
                }
            });
        }
    }; });
});
