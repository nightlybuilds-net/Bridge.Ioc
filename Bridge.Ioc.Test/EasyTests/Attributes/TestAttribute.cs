using System;

namespace Bridge.EasyTests.Attributes
{
    
    /// <summary>
    /// Attribute for test class
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)] 
    public class TestAttribute : Attribute
    {
        public string Description { get; }

        public TestAttribute()
        {
            
        }

        public TestAttribute(string description )
        {
            this.Description = description;
        }
    }
}