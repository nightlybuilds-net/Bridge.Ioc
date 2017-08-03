Bridge.assembly("Bridge.Ioc", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System,System.Collections.Generic,Bridge.Ioc];
    $m($n[2].BridgeIoc, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"CheckAlreadyAdded","t":8,"tpc":1,"tprm":["TType"],"sn":"CheckAlreadyAdded","rt":$n[0].Void},{"a":1,"n":"CheckNotRegistered","t":8,"tpc":1,"tprm":["TType"],"sn":"CheckNotRegistered$1","rt":$n[0].Void},{"a":1,"n":"CheckNotRegistered","t":8,"pi":[{"n":"type","pt":Function,"ps":0}],"sn":"CheckNotRegistered","rt":$n[0].Void,"p":[Function]},{"a":2,"n":"Register","t":8,"tpc":1,"tprm":["TType"],"sn":"Register","rt":$n[0].Void},{"a":2,"n":"Register","t":8,"tpc":2,"tprm":["TType","TImplementation"],"sn":"Register$1","rt":$n[0].Void},{"a":2,"n":"RegisterFunc","t":8,"pi":[{"n":"func","pt":Function,"ps":0}],"tpc":1,"tprm":["TType"],"sn":"RegisterFunc","rt":$n[0].Void,"p":[Function]},{"a":2,"n":"RegisterInstance","t":8,"pi":[{"n":"instance","pt":System.Object,"ps":0}],"tpc":1,"tprm":["TType"],"sn":"RegisterInstance","rt":$n[0].Void,"p":[System.Object]},{"a":2,"n":"RegisterSingleInstance","t":8,"tpc":1,"tprm":["TType"],"sn":"RegisterSingleInstance","rt":$n[0].Void},{"a":2,"n":"RegisterSingleInstance","t":8,"tpc":2,"tprm":["TType","TImplementation"],"sn":"RegisterSingleInstance$1","rt":$n[0].Void},{"a":2,"n":"Resolve","t":8,"tpc":1,"tprm":["TType"],"sn":"Resolve","rt":System.Object},{"a":2,"n":"Resolve","t":8,"pi":[{"n":"type","pt":Function,"ps":0}],"sn":"Resolve$1","rt":$n[0].Object,"p":[Function]},{"a":1,"n":"_resolvers","t":4,"rt":$n[1].Dictionary$2(Function,Bridge.Ioc.IResolver),"sn":"_resolvers","ro":true}]}; });
    $m($n[2].FuncResolver$1, function (T) { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[Function],"pi":[{"n":"resolveFunc","pt":Function,"ps":0}],"sn":"ctor"},{"a":2,"n":"Resolve","t":16,"rt":Function,"g":{"a":2,"n":"get_Resolve","t":8,"rt":Function,"fg":"Resolve"},"s":{"a":2,"n":"set_Resolve","t":8,"p":[Function],"rt":$n[0].Void,"fs":"Resolve"},"fn":"Resolve"}]}; });
    $m($n[2].IIoc, function () { return {"att":161,"a":2,"m":[{"ab":true,"a":2,"n":"Register","t":8,"tpc":1,"tprm":["TType"],"sn":"Bridge$Ioc$IIoc$Register","rt":$n[0].Void},{"ab":true,"a":2,"n":"Register","t":8,"tpc":2,"tprm":["TType","TImplementation"],"sn":"Bridge$Ioc$IIoc$Register$1","rt":$n[0].Void},{"ab":true,"a":2,"n":"RegisterFunc","t":8,"pi":[{"n":"func","pt":Function,"ps":0}],"tpc":1,"tprm":["TType"],"sn":"Bridge$Ioc$IIoc$RegisterFunc","rt":$n[0].Void,"p":[Function]},{"ab":true,"a":2,"n":"RegisterInstance","t":8,"pi":[{"n":"instance","pt":System.Object,"ps":0}],"tpc":1,"tprm":["TType"],"sn":"Bridge$Ioc$IIoc$RegisterInstance","rt":$n[0].Void,"p":[System.Object]},{"ab":true,"a":2,"n":"RegisterSingleInstance","t":8,"tpc":1,"tprm":["TType"],"sn":"Bridge$Ioc$IIoc$RegisterSingleInstance","rt":$n[0].Void},{"ab":true,"a":2,"n":"RegisterSingleInstance","t":8,"tpc":2,"tprm":["TType","TImplementation"],"sn":"Bridge$Ioc$IIoc$RegisterSingleInstance$1","rt":$n[0].Void},{"ab":true,"a":2,"n":"Resolve","t":8,"tpc":1,"tprm":["TType"],"sn":"Bridge$Ioc$IIoc$Resolve","rt":System.Object},{"ab":true,"a":2,"n":"Resolve","t":8,"pi":[{"n":"type","pt":Function,"ps":0}],"sn":"Bridge$Ioc$IIoc$Resolve$1","rt":$n[0].Object,"p":[Function]}]}; });
    $m($n[2].InstanceResolver$1, function (T) { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[T],"pi":[{"n":"resolvedObj","pt":T,"ps":0}],"sn":"ctor"},{"a":2,"n":"Resolve","t":16,"rt":Function,"g":{"a":2,"n":"get_Resolve","t":8,"rt":Function,"fg":"Resolve"},"s":{"a":2,"n":"set_Resolve","t":8,"p":[Function],"rt":$n[0].Void,"fs":"Resolve"},"fn":"Resolve"}]}; });
    $m($n[2].IResolver, function () { return {"att":160,"a":4,"m":[{"ab":true,"a":2,"n":"Resolve","t":16,"rt":Function,"g":{"ab":true,"a":2,"n":"get_Resolve","t":8,"rt":Function,"fg":"Bridge$Ioc$IResolver$Resolve"},"s":{"ab":true,"a":2,"n":"set_Resolve","t":8,"p":[Function],"rt":$n[0].Void,"fs":"Bridge$Ioc$IResolver$Resolve"},"fn":"Bridge$Ioc$IResolver$Resolve"}]}; });
    $m($n[2].SingleInstanceResolver$1, function (T) { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[2].IIoc],"pi":[{"n":"ioc","pt":$n[2].IIoc,"ps":0}],"sn":"ctor"},{"a":2,"n":"Resolve","t":16,"rt":Function,"g":{"a":2,"n":"get_Resolve","t":8,"rt":Function,"fg":"Resolve"},"s":{"a":2,"n":"set_Resolve","t":8,"p":[Function],"rt":$n[0].Void,"fs":"Resolve"},"fn":"Resolve"},{"a":1,"n":"_singleInstance","is":true,"t":4,"rt":T,"sn":"_singleInstance"}]}; });
    $m($n[2].TransientResolver$1, function (T) { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[2].IIoc],"pi":[{"n":"ioc","pt":$n[2].IIoc,"ps":0}],"sn":"ctor"},{"a":2,"n":"Resolve","t":16,"rt":Function,"g":{"a":2,"n":"get_Resolve","t":8,"rt":Function,"fg":"Resolve"},"s":{"a":2,"n":"set_Resolve","t":8,"p":[Function],"rt":$n[0].Void,"fs":"Resolve"},"fn":"Resolve"}]}; });
});