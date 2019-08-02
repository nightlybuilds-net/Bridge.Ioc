using System;
using System.Diagnostics;
using System.Reflection;
using System.Threading.Tasks;

namespace Bridge.EasyTests
{
    internal class TestDescriptor
    {
        public event EventHandler OnTestComplete;
        public bool Completed { get; private set; }

        public string Name { get; set; }
        public string NameDescription { get; set; }
        public string Group { get; set; }
        public string GroupDescription { get; set; }

        public Type Type { get; set; }
        public MethodInfo Method { get; set; }
        
        public Exception FailAssert { get; set; }
        public bool Success => this.FailAssert == null;

        public string Error => this.FailAssert == null ? string.Empty : $"{this.FailAssert.GetType().Name}: {this.FailAssert.Message}";
        public string Stack => this.FailAssert?.StackTrace;
        
        public int Time { get; set; }
        


        /// <summary>
        /// Run test.
        /// </summary>
        public async Task RunTest()
        {
            // check if method return rask await
            var isTask = this.Method.ReturnType == typeof(Task);
            
            var instance = Activator.CreateInstance(this.Type);
            
            var watch = new Stopwatch();
            watch.Start();

            try
            {
                if (isTask)
                    await (Task) this.Method.Invoke(instance);
                else
                    this.Method.Invoke(instance);
                
            }
            catch (Exception e)
            {
                this.FailAssert = e;
            }
            finally
            {
                watch.Stop();
                this.Time = (int)watch.ElapsedMilliseconds;
                this.Completed = true;
                this.OnTestComplete?.Invoke(this,null);

                // check of type is disposable
                var disposable = instance as IDisposable;
                disposable?.Dispose();
            }
        }

    }
}