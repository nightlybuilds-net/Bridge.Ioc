using System;

namespace Bridge.EasyTests.Attributes
{
    /// <summary>
    /// Attribute for test Method
    /// </summary>
    [AttributeUsage(AttributeTargets.Method)] 
    public class TestMethodAttribute : Attribute
    {
        public string Description { get; }

        public TestMethodAttribute(string description = null)
        {
            this.Description = description;
        }
    }
}