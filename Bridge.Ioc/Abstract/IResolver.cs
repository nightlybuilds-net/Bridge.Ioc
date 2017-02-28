using System;

namespace Bridge.Ioc.Abstract
{
        public interface IResolver
        {
            Func<object> Resolve { get; set; }
        }


}