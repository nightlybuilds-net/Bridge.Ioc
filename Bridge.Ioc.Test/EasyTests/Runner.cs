using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bridge.EasyTests.Attributes;
using Bridge.Html5;

namespace Bridge.EasyTests
{
    internal class Runner
    {
        private readonly List<TestDescriptor> _internalTests = new List<TestDescriptor>();
        private readonly RunnerViewModel _runnerViewModel;

        public Runner()
        {
            this._runnerViewModel = new RunnerViewModel();
            this._runnerViewModel.BrowserInfo = Global.Navigator.AppVersion;
        }
        

        /// <summary>
        /// Run tests
        /// </summary>
        public async Task Run()
        {
            this._runnerViewModel.Running = true;

            this.DiscoverTest(); // discovery all tests
            
            this._runnerViewModel.TotalTests = this._internalTests.Count; // total tests found
            await this.RunTests(); // run all test 

//            this._runnerViewModel.FailedTests = this._internalTests.Count(c=>!c.Success); // failed tests
//            this._runnerViewModel.PassedTests = this._internalTests.Count(c=>c.Success); // passed Tests
//            this._runnerViewModel.TotalTime = this._runnerViewModel.Tests.Items.Sum(s=>s.Item1.Time);

            this._runnerViewModel.Running = false;
        }

        
        /// <summary>
        /// Run 
        /// </summary>
        private Task RunTests()
        {
            this._internalTests.ForEach(async f =>
            {
                await f.RunTest();
                this._runnerViewModel.Tests.Add(f);
            });
            return Task.FromResult(0);
        }

        /// <summary>
        /// Discovery all tests
        /// </summary>
        private void DiscoverTest()
        {
            var types = AppDomain.CurrentDomain.GetAssemblies().SelectMany(s => s.GetTypes())
                .Where(w=>!w.FullName.ToLower().StartsWith("system"))
                .Where(w=>!w.IsInterface && !w.IsAbstract)
                .Where(w=>w.GetCustomAttributes(typeof(TestAttribute),true).Any())
                .ToList();
            
            // run all tests method
            types.ForEach(f =>
            {
                var testAtt = (TestAttribute)f.GetCustomAttributes(typeof(TestAttribute), true).First();
                

                var testMethods = f.GetMethods().Where(w => w.IsPublic)
                    .Where(w => w.GetCustomAttributes(typeof(TestMethodAttribute), true).Any()).ToList();
                
                testMethods.ForEach(method =>
                {
                    var attr = (TestMethodAttribute) method.GetCustomAttributes(typeof(TestMethodAttribute), true).First();
                    
                    var testDescr = new TestDescriptor
                    {
                        Type = f,
                        Method = method,
                        Group = f.Name,
                        GroupDescription = string.IsNullOrEmpty(testAtt.Description) ? string.Empty : testAtt.Description,
                        Name = method.Name,
                        NameDescription = string.IsNullOrEmpty(attr.Description) ? string.Empty : attr.Description
                    };
                    
                    this._internalTests.Add(testDescr);
                    
                    testDescr.OnTestComplete += this.TestDescrOnOnTestComplete;
                });

            });
        }

        private void TestDescrOnOnTestComplete(object sender, EventArgs eventArgs)
        {
            var completedTest = this._internalTests.Where(w => w.Completed);
            this._runnerViewModel.FailedTests = completedTest.Count(c=>!c.Success); // failed tests
            this._runnerViewModel.PassedTests = completedTest.Count(c=>c.Success); // passed Tests
            this._runnerViewModel.TotalTime = this._runnerViewModel.Tests.Items.Sum(s=>s.Item1.Time);
            if(this._internalTests.Count()==completedTest.Count())
                this._runnerViewModel.SetAllTestRunned();
        }
    }
}