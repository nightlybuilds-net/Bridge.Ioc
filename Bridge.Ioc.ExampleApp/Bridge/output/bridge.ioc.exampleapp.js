/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("Bridge.Ioc.ExampleApp", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Ioc.ExampleApp.Abstract.ICalc", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Ioc.ExampleApp.Abstract.ISubtract", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Ioc.ExampleApp.Abstract.ISum", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Ioc.ExampleApp.App", {
        $main: function () {
            // simple all transient registration
            var firstContainer = new Bridge.Ioc.BridgeIoc();
            firstContainer.register$1(Bridge.Ioc.ExampleApp.Abstract.ISum, Bridge.Ioc.ExampleApp.Calculators.Adder);
            firstContainer.register$1(Bridge.Ioc.ExampleApp.Abstract.ISubtract, Bridge.Ioc.ExampleApp.Calculators.Subtractor);
            firstContainer.register$1(Bridge.Ioc.ExampleApp.Abstract.ICalc, Bridge.Ioc.ExampleApp.Calculators.Calculator);

            var secondContainer = new Bridge.Ioc.BridgeIoc();
            secondContainer.registerFunc(Bridge.Ioc.ExampleApp.Abstract.ISum, $asm.$.Bridge.Ioc.ExampleApp.App.f1); // can register func
            secondContainer.registerInstance(Bridge.Ioc.ExampleApp.Abstract.ISubtract, new Bridge.Ioc.ExampleApp.Calculators.Subtractor()); // instance
            secondContainer.registerSingleInstance$1(Bridge.Ioc.ExampleApp.Abstract.ICalc, Bridge.Ioc.ExampleApp.Calculators.Calculator); // or single instance (singleton)

            // transient resolving 
            var calc1 = firstContainer.resolve(Bridge.Ioc.ExampleApp.Abstract.ICalc);
            var calc2 = firstContainer.resolve(Bridge.Ioc.ExampleApp.Abstract.ICalc);
            Bridge.Console.log(System.String.format("Calc1 Id: {0}", calc1.Bridge$Ioc$ExampleApp$Abstract$ICalc$getId()));
            Bridge.Console.log(System.String.format("Calc2 Id: {0}", calc2.Bridge$Ioc$ExampleApp$Abstract$ICalc$getId()));

            Bridge.Console.log(System.String.format("Same id? : {0}", System.Guid.op_Equality(calc2.Bridge$Ioc$ExampleApp$Abstract$ICalc$getId(), calc1.Bridge$Ioc$ExampleApp$Abstract$ICalc$getId())));


            // single instance resolving
            var calc3 = secondContainer.resolve(Bridge.Ioc.ExampleApp.Abstract.ICalc);
            var calc4 = secondContainer.resolve(Bridge.Ioc.ExampleApp.Abstract.ICalc);
            Bridge.Console.log(System.String.format("Calc1 Id: {0}", calc3.Bridge$Ioc$ExampleApp$Abstract$ICalc$getId()));
            Bridge.Console.log(System.String.format("Calc2 Id: {0}", calc4.Bridge$Ioc$ExampleApp$Abstract$ICalc$getId()));

            Bridge.Console.log(System.String.format("Same id? : {0}", System.Guid.op_Equality(calc3.Bridge$Ioc$ExampleApp$Abstract$ICalc$getId(), calc4.Bridge$Ioc$ExampleApp$Abstract$ICalc$getId())));

            Bridge.Console.log(System.String.format("3+4={0}", calc1.Bridge$Ioc$ExampleApp$Abstract$ICalc$add(3, 4)));
            Bridge.Console.log(System.String.format("7-2={0}", calc1.Bridge$Ioc$ExampleApp$Abstract$ICalc$subtract(7, 2)));

        }
    });

    Bridge.ns("Bridge.Ioc.ExampleApp.App", $asm.$);

    Bridge.apply($asm.$.Bridge.Ioc.ExampleApp.App, {
        f1: function () {
            return new Bridge.Ioc.ExampleApp.Calculators.Adder();
        }
    });

    Bridge.define("Bridge.Ioc.ExampleApp.Calculators.Adder", {
        inherits: [Bridge.Ioc.ExampleApp.Abstract.ISum],
        config: {
            alias: [
            "sum", "Bridge$Ioc$ExampleApp$Abstract$ISum$sum"
            ]
        },
        sum: function (a, b) {
            return ((a + b) | 0);
        }
    });

    Bridge.define("Bridge.Ioc.ExampleApp.Calculators.Calculator", {
        inherits: [Bridge.Ioc.ExampleApp.Abstract.ICalc],
        _adder: null,
        _subtractor: null,
        config: {
            properties: {
                Id: null
            },
            alias: [
            "getId", "Bridge$Ioc$ExampleApp$Abstract$ICalc$getId",
            "setId", "Bridge$Ioc$ExampleApp$Abstract$ICalc$setId",
            "add", "Bridge$Ioc$ExampleApp$Abstract$ICalc$add",
            "subtract", "Bridge$Ioc$ExampleApp$Abstract$ICalc$subtract"
            ],
            init: function () {
                this.Id = new System.Guid();
            }
        },
        ctor: function (adder, subtractor) {
            this.$initialize();
            this._adder = adder;
            this._subtractor = subtractor;

            this.setId(System.Guid.newGuid());
        },
        add: function (a, b) {
            return this._adder.Bridge$Ioc$ExampleApp$Abstract$ISum$sum(a, b);
        },
        subtract: function (a, b) {
            return this._subtractor.Bridge$Ioc$ExampleApp$Abstract$ISubtract$subtract(a, b);
        }
    });

    Bridge.define("Bridge.Ioc.ExampleApp.Calculators.Subtractor", {
        inherits: [Bridge.Ioc.ExampleApp.Abstract.ISubtract],
        config: {
            alias: [
            "subtract", "Bridge$Ioc$ExampleApp$Abstract$ISubtract$subtract"
            ]
        },
        subtract: function (a, b) {
            return ((a - b) | 0);
        }
    });

    var $m = Bridge.setMetadata,
        $n = [System,Bridge.Ioc.ExampleApp.Abstract,Bridge.Ioc.ExampleApp.Calculators];
    $m($n[2].Adder, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Sum","t":8,"pi":[{"n":"a","pt":$n[0].Int32,"ps":0},{"n":"b","pt":$n[0].Int32,"ps":1}],"sn":"sum","rt":$n[0].Int32,"p":[$n[0].Int32,$n[0].Int32]}]}; });
    $m($n[2].Calculator, function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].ISum,$n[1].ISubtract],"pi":[{"n":"adder","pt":$n[1].ISum,"ps":0},{"n":"subtractor","pt":$n[1].ISubtract,"ps":1}],"sn":"ctor"},{"a":2,"n":"Add","t":8,"pi":[{"n":"a","pt":$n[0].Int32,"ps":0},{"n":"b","pt":$n[0].Int32,"ps":1}],"sn":"add","rt":$n[0].Int32,"p":[$n[0].Int32,$n[0].Int32]},{"a":2,"n":"Subtract","t":8,"pi":[{"n":"a","pt":$n[0].Int32,"ps":0},{"n":"b","pt":$n[0].Int32,"ps":1}],"sn":"subtract","rt":$n[0].Int32,"p":[$n[0].Int32,$n[0].Int32]},{"a":2,"n":"Id","t":16,"rt":$n[0].Guid,"g":{"a":2,"n":"get_Id","t":8,"sn":"getId","rt":$n[0].Guid},"s":{"a":1,"n":"set_Id","t":8,"pi":[{"n":"value","pt":$n[0].Guid,"ps":0}],"sn":"setId","rt":Object,"p":[$n[0].Guid]}},{"a":1,"n":"_adder","t":4,"rt":$n[1].ISum,"sn":"_adder","ro":true},{"a":1,"n":"_subtractor","t":4,"rt":$n[1].ISubtract,"sn":"_subtractor","ro":true}]}; });
    $m($n[2].Subtractor, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Subtract","t":8,"pi":[{"n":"a","pt":$n[0].Int32,"ps":0},{"n":"b","pt":$n[0].Int32,"ps":1}],"sn":"subtract","rt":$n[0].Int32,"p":[$n[0].Int32,$n[0].Int32]}]}; });
});
