Bridge.assembly("Bridge.Ioc", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System,Bridge.Ioc,System.Collections.Generic];
    $m("Bridge.Ioc.BridgeIoc", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"CheckAlreadyAdded","t":8,"tpc":1,"tprm":["TType"],"sn":"CheckAlreadyAdded$1","rt":$n[0].Void},{"a":1,"n":"CheckAlreadyAdded","t":8,"pi":[{"n":"type","pt":Function,"ps":0}],"sn":"CheckAlreadyAdded","rt":$n[0].Void,"p":[Function]},{"a":1,"n":"CheckNotRegistered","t":8,"tpc":1,"tprm":["TType"],"sn":"CheckNotRegistered$1","rt":$n[0].Void},{"a":1,"n":"CheckNotRegistered","t":8,"pi":[{"n":"type","pt":Function,"ps":0}],"sn":"CheckNotRegistered","rt":$n[0].Void,"p":[Function]},{"a":2,"n":"Register","t":8,"tpc":1,"tprm":["TType"],"sn":"Register$3","rt":$n[0].Void},{"a":2,"n":"Register","t":8,"tpc":2,"tprm":["TType","TImplementation"],"sn":"Register$4","rt":$n[0].Void},{"a":2,"n":"Register","t":8,"pi":[{"n":"type","pt":Function,"ps":0}],"sn":"Register","rt":$n[0].Void,"p":[Function]},{"a":2,"n":"Register","t":8,"pi":[{"n":"type","pt":Function,"ps":0},{"n":"resolver","pt":$n[1].IResolver,"ps":1}],"sn":"Register$1","rt":$n[0].Void,"p":[Function,$n[1].IResolver]},{"a":2,"n":"Register","t":8,"pi":[{"n":"type","pt":Function,"ps":0},{"n":"impl","pt":Function,"ps":1}],"sn":"Register$2","rt":$n[0].Void,"p":[Function,Function]},{"a":2,"n":"RegisterFunc","t":8,"pi":[{"n":"func","pt":Function,"ps":0}],"tpc":1,"tprm":["TType"],"sn":"RegisterFunc","rt":$n[0].Void,"p":[Function]},{"a":2,"n":"RegisterInstance","t":8,"pi":[{"n":"instance","pt":$n[0].Object,"ps":0}],"sn":"RegisterInstance","rt":$n[0].Void,"p":[$n[0].Object]},{"a":2,"n":"RegisterInstance","t":8,"pi":[{"n":"instance","pt":System.Object,"ps":0}],"tpc":1,"tprm":["TType"],"sn":"RegisterInstance$2","rt":$n[0].Void,"p":[System.Object]},{"a":2,"n":"RegisterInstance","t":8,"pi":[{"n":"type","pt":Function,"ps":0},{"n":"instance","pt":$n[0].Object,"ps":1}],"sn":"RegisterInstance$1","rt":$n[0].Void,"p":[Function,$n[0].Object]},{"a":2,"n":"RegisterSingleInstance","t":8,"tpc":1,"tprm":["TType"],"sn":"RegisterSingleInstance$2","rt":$n[0].Void},{"a":2,"n":"RegisterSingleInstance","t":8,"tpc":2,"tprm":["TType","TImplementation"],"sn":"RegisterSingleInstance$3","rt":$n[0].Void},{"a":2,"n":"RegisterSingleInstance","t":8,"pi":[{"n":"type","pt":Function,"ps":0}],"sn":"RegisterSingleInstance","rt":$n[0].Void,"p":[Function]},{"a":2,"n":"RegisterSingleInstance","t":8,"pi":[{"n":"type","pt":Function,"ps":0},{"n":"impl","pt":Function,"ps":1}],"sn":"RegisterSingleInstance$1","rt":$n[0].Void,"p":[Function,Function]},{"a":2,"n":"Resolve","t":8,"tpc":1,"tprm":["TType"],"sn":"Resolve","rt":System.Object},{"a":2,"n":"Resolve","t":8,"pi":[{"n":"type","pt":Function,"ps":0}],"sn":"Resolve$1","rt":$n[0].Object,"p":[Function]},{"a":1,"n":"_resolvers","t":4,"rt":$n[2].Dictionary$2(Function,Bridge.Ioc.IResolver),"sn":"_resolvers","ro":true}]}; });
    $m("Bridge.Ioc.FuncResolver$1", function (T) { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[Function],"pi":[{"n":"resolveFunc","pt":Function,"ps":0}],"sn":"ctor"},{"a":2,"n":"Resolve","t":16,"rt":Function,"g":{"a":2,"n":"get_Resolve","t":8,"rt":Function,"fg":"Resolve"},"s":{"a":2,"n":"set_Resolve","t":8,"p":[Function],"rt":$n[0].Void,"fs":"Resolve"},"fn":"Resolve"}]}; });
    $m("Bridge.Ioc.IIoc", function () { return {"att":161,"a":2,"m":[{"ab":true,"a":2,"n":"Register","t":8,"tpc":1,"tprm":["TType"],"sn":"Bridge$Ioc$IIoc$Register$3","rt":$n[0].Void},{"ab":true,"a":2,"n":"Register","t":8,"tpc":2,"tprm":["TType","TImplementation"],"sn":"Bridge$Ioc$IIoc$Register$4","rt":$n[0].Void},{"ab":true,"a":2,"n":"Register","t":8,"pi":[{"n":"type","pt":Function,"ps":0}],"sn":"Bridge$Ioc$IIoc$Register","rt":$n[0].Void,"p":[Function]},{"ab":true,"a":2,"n":"Register","t":8,"pi":[{"n":"type","pt":Function,"ps":0},{"n":"resolver","pt":$n[1].IResolver,"ps":1}],"sn":"Bridge$Ioc$IIoc$Register$1","rt":$n[0].Void,"p":[Function,$n[1].IResolver]},{"ab":true,"a":2,"n":"Register","t":8,"pi":[{"n":"type","pt":Function,"ps":0},{"n":"impl","pt":Function,"ps":1}],"sn":"Bridge$Ioc$IIoc$Register$2","rt":$n[0].Void,"p":[Function,Function]},{"ab":true,"a":2,"n":"RegisterFunc","t":8,"pi":[{"n":"func","pt":Function,"ps":0}],"tpc":1,"tprm":["TType"],"sn":"Bridge$Ioc$IIoc$RegisterFunc","rt":$n[0].Void,"p":[Function]},{"ab":true,"a":2,"n":"RegisterInstance","t":8,"pi":[{"n":"instance","pt":$n[0].Object,"ps":0}],"sn":"Bridge$Ioc$IIoc$RegisterInstance","rt":$n[0].Void,"p":[$n[0].Object]},{"ab":true,"a":2,"n":"RegisterInstance","t":8,"pi":[{"n":"instance","pt":System.Object,"ps":0}],"tpc":1,"tprm":["TType"],"sn":"Bridge$Ioc$IIoc$RegisterInstance$2","rt":$n[0].Void,"p":[System.Object]},{"ab":true,"a":2,"n":"RegisterInstance","t":8,"pi":[{"n":"type","pt":Function,"ps":0},{"n":"instance","pt":$n[0].Object,"ps":1}],"sn":"Bridge$Ioc$IIoc$RegisterInstance$1","rt":$n[0].Void,"p":[Function,$n[0].Object]},{"ab":true,"a":2,"n":"RegisterSingleInstance","t":8,"tpc":1,"tprm":["TType"],"sn":"Bridge$Ioc$IIoc$RegisterSingleInstance$2","rt":$n[0].Void},{"ab":true,"a":2,"n":"RegisterSingleInstance","t":8,"tpc":2,"tprm":["TType","TImplementation"],"sn":"Bridge$Ioc$IIoc$RegisterSingleInstance$3","rt":$n[0].Void},{"ab":true,"a":2,"n":"RegisterSingleInstance","t":8,"pi":[{"n":"type","pt":Function,"ps":0}],"sn":"Bridge$Ioc$IIoc$RegisterSingleInstance","rt":$n[0].Void,"p":[Function]},{"ab":true,"a":2,"n":"RegisterSingleInstance","t":8,"pi":[{"n":"type","pt":Function,"ps":0},{"n":"impl","pt":Function,"ps":1}],"sn":"Bridge$Ioc$IIoc$RegisterSingleInstance$1","rt":$n[0].Void,"p":[Function,Function]},{"ab":true,"a":2,"n":"Resolve","t":8,"tpc":1,"tprm":["TType"],"sn":"Bridge$Ioc$IIoc$Resolve","rt":System.Object},{"ab":true,"a":2,"n":"Resolve","t":8,"pi":[{"n":"type","pt":Function,"ps":0}],"sn":"Bridge$Ioc$IIoc$Resolve$1","rt":$n[0].Object,"p":[Function]}]}; });
    $m("Bridge.Ioc.InstanceResolver", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[0].Object],"pi":[{"n":"resolvedObj","pt":$n[0].Object,"ps":0}],"sn":"ctor"},{"a":2,"n":"Resolve","t":16,"rt":Function,"g":{"a":2,"n":"get_Resolve","t":8,"rt":Function,"fg":"Resolve"},"s":{"a":2,"n":"set_Resolve","t":8,"p":[Function],"rt":$n[0].Void,"fs":"Resolve"},"fn":"Resolve"}]}; });
    $m("Bridge.Ioc.InstanceResolver$1", function (T) { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[T],"pi":[{"n":"resolvedObj","pt":T,"ps":0}],"sn":"ctor"}]}; });
    $m("Bridge.Ioc.IResolver", function () { return {"att":161,"a":2,"m":[{"ab":true,"a":2,"n":"Resolve","t":16,"rt":Function,"g":{"ab":true,"a":2,"n":"get_Resolve","t":8,"rt":Function,"fg":"Bridge$Ioc$IResolver$Resolve"},"s":{"ab":true,"a":2,"n":"set_Resolve","t":8,"p":[Function],"rt":$n[0].Void,"fs":"Bridge$Ioc$IResolver$Resolve"},"fn":"Bridge$Ioc$IResolver$Resolve"}]}; });
    $m("Bridge.Ioc.SingleInstanceResolver", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].IIoc,Function],"pi":[{"n":"ioc","pt":$n[1].IIoc,"ps":0},{"n":"type","pt":Function,"ps":1}],"sn":"ctor"},{"a":2,"n":"Resolve","t":16,"rt":Function,"g":{"a":2,"n":"get_Resolve","t":8,"rt":Function,"fg":"Resolve"},"s":{"a":2,"n":"set_Resolve","t":8,"p":[Function],"rt":$n[0].Void,"fs":"Resolve"},"fn":"Resolve"},{"a":1,"n":"_singleInstance","t":4,"rt":$n[0].Object,"sn":"_singleInstance"}]}; });
    $m("Bridge.Ioc.SingleInstanceResolver$1", function (T) { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].IIoc],"pi":[{"n":"ioc","pt":$n[1].IIoc,"ps":0}],"sn":"ctor"}]}; });
    $m("Bridge.Ioc.TransientResolver", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].IIoc,Function],"pi":[{"n":"ioc","pt":$n[1].IIoc,"ps":0},{"n":"toresolveType","pt":Function,"ps":1}],"sn":"ctor"},{"a":2,"n":"Resolve","t":16,"rt":Function,"g":{"a":2,"n":"get_Resolve","t":8,"rt":Function,"fg":"Resolve"},"s":{"a":2,"n":"set_Resolve","t":8,"p":[Function],"rt":$n[0].Void,"fs":"Resolve"},"fn":"Resolve"}]}; });
    $m("Bridge.Ioc.TransientResolver$1", function (T) { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].IIoc],"pi":[{"n":"ioc","pt":$n[1].IIoc,"ps":0}],"sn":"ctor"}]}; });
});
