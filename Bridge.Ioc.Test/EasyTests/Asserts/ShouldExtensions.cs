using System;
using Bridge.EasyTests.Exceptions;

namespace Bridge.EasyTests.Asserts
{
    public static class ShouldExtensions
    {
        /// <summary>
        /// Test equals
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="secondObj"></param>
        public static void ShouldBeEquals<T>(this T obj, T secondObj)
        {
            var equal = EasyAsserts.ObjectEqual(obj, secondObj);

            if (!equal)
                throw new EqualException(string.Format($"Expected {secondObj.ToCompareString()}. Value: {obj.ToCompareString()}"));
            
        }
        
        /// <summary>
        /// Test not equals
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="secondObj"></param>
        public static void ShouldBeNotEquals<T>(this T obj, T secondObj)
        {
            var equal = EasyAsserts.ObjectEqual(obj, secondObj);

            if (equal)
                throw new NotEqualException(string.Format($"Expected {secondObj.ToCompareString()} different from {obj.ToCompareString()}. Are Equal!"));
            
        }

       
    }
}