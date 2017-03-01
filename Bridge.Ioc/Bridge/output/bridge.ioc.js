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

    Bridge.define("Bridge.Ioc.App", {
        $main: function () {
            try {
                var ioc = new Bridge.Ioc.BridgeIoc();

                ioc.register(Bridge.Ioc.IPippo, Bridge.Ioc.Pippo);
                //ioc.Register<IHaveName, Gino>();



                //ioc.RegisterFunc<IHaveName>(() => { return new Gino(ioc.Resolve<IPippo>()); });

                ioc.registerInstance(Bridge.Ioc.IHaveName, new Bridge.Ioc.Gino(new Bridge.Ioc.Pippo()));

                //ioc.RegisterSingleInstance<IHaveName,Gino>();


                var obj = ioc.resolve(Bridge.Ioc.IHaveName);
                obj.Bridge$Ioc$IHaveName$printName();

                var obj2 = ioc.resolve(Bridge.Ioc.IHaveName);
                Bridge.Console.log(Bridge.equals(obj, obj2));

            }
            catch (ex) {
                ex = System.Exception.create(ex);
                Bridge.Console.log(ex);
            }

        }
    });

    Bridge.define("Bridge.Ioc.IHaveName", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Ioc.IPippo", {
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
            "register", "Bridge$Ioc$Abstract$IIoc$register",
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
        register: function (TType, TImplementation) {
            this.checkAlreadyAdded(TType);

            var resolver = new (Bridge.Ioc.Resolvers.TransientResolver$1(TImplementation))(this);
            this._resolvers.add(TType, resolver);
        },
        registerSingleInstance: function (TType, TImplementation) {
            this.checkAlreadyAdded(TType);

            var resolver = new (Bridge.Ioc.Resolvers.SingleInstanceResolver$1(TImplementation))(this);
            this._resolvers.add(TType, resolver);
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

    Bridge.define("Bridge.Ioc.Gino", {
        inherits: [Bridge.Ioc.IHaveName],
        pippo: null,
        _age: 0,
        config: {
            properties: {
                Name: null
            },
            alias: [
            "getName", "Bridge$Ioc$IHaveName$getName",
            "setName", "Bridge$Ioc$IHaveName$setName",
            "printName", "Bridge$Ioc$IHaveName$printName"
            ]
        },
        ctor: function (pippo) {
            this.$initialize();
            Bridge.Console.log("Gino is alive!");
            this.setName("Gino");
            this._age = pippo.Bridge$Ioc$IPippo$getPippoAge();
        },
        printName: function () {
            Bridge.Console.log(System.String.format("Hello my name is {0}!", this.getName()));
            Bridge.Console.log(System.String.format("Pippo is injected and his age is {0}", this._age));

        }
    });

    Bridge.define("Bridge.Ioc.Pippo", {
        inherits: [Bridge.Ioc.IPippo],
        config: {
            properties: {
                PippoAge: 0
            },
            alias: [
            "getPippoAge", "Bridge$Ioc$IPippo$getPippoAge",
            "setPippoAge", "Bridge$Ioc$IPippo$setPippoAge"
            ]
        },
        ctor: function () {
            this.$initialize();
            this.setPippoAge(50);
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

    var $m = Bridge.setMetadata,
        $n = [Bridge.Ioc,System];
    $m($n[0].Gino, function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[0].IPippo],"pi":[{"n":"pippo","pt":$n[0].IPippo,"ps":0}],"sn":"ctor"},{"a":2,"n":"PrintName","t":8,"sn":"printName","rt":Object},{"a":2,"n":"Name","t":16,"rt":String,"g":{"a":2,"n":"get_Name","t":8,"sn":"getName","rt":String},"s":{"a":2,"n":"set_Name","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setName","rt":Object,"p":[String]}},{"a":1,"n":"_age","t":4,"rt":$n[1].Int32,"sn":"_age"},{"a":1,"n":"pippo","t":4,"rt":String,"sn":"pippo"}]}; });
    $m($n[0].Pippo, function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"PippoAge","t":16,"rt":$n[1].Int32,"g":{"a":2,"n":"get_PippoAge","t":8,"sn":"getPippoAge","rt":$n[1].Int32},"s":{"a":2,"n":"set_PippoAge","t":8,"pi":[{"n":"value","pt":$n[1].Int32,"ps":0}],"sn":"setPippoAge","rt":Object,"p":[$n[1].Int32]}}]}; });
});
