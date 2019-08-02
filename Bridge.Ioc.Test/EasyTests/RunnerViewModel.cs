using Bridge.Html5;

namespace Bridge.EasyTests
{
    internal class RunnerViewModel
    {
        
        private readonly HTMLElement _totalTests = Document.GetElementById("totalTests");
        private readonly HTMLElement _passedTests = Document.GetElementById("passedTests");
        private readonly HTMLElement _failedTests = Document.GetElementById("failedTests");
        private readonly HTMLElement _totalTime = Document.GetElementById("totalTime");
        private readonly HTMLElement _browserInfo = Document.GetElementById("browserInfo");
        private readonly HTMLElement _loader = Document.GetElementById("loader");


        public TestsCollectionManager Tests = new TestsCollectionManager();

        public RunnerViewModel()
        {
            var hidePassed = Document.GetElementById<HTMLInputElement>("hidePassedTests");
            hidePassed.OnChange += e =>
            {
                var isChecked = hidePassed.Checked;
                var toHide = Document.GetElementsByClassName("passedTest");
                foreach (var htmlElement in toHide)
                {
                    htmlElement.Hidden = isChecked;
                }
            };
        }

        public HTMLInputElement HidePassed { get; set; }


        /// <summary>
        /// Test are running
        /// </summary>
        public bool Running
        {
            set { this._loader.Hidden = !value; }
        }

        /// <summary>
        /// Total tests
        /// </summary>
        public int TotalTests
        {
            set { this._totalTests.InnerHTML = $"{value} tests"; }
        }
        
        /// <summary>
        /// Passed tests count
        /// </summary>
        public int PassedTests
        {
            set { this._passedTests.InnerHTML = $"{value} passed"; }
        }
        
        /// <summary>
        /// Failed tests count
        /// </summary>
        public int FailedTests
        {
            set { this._failedTests.InnerHTML = $"{value} failed"; }
        }
        
        /// <summary>
        /// Total time
        /// </summary>
        public int TotalTime
        {
            set { this._totalTime.InnerHTML = $"Tests completed in {value} ms"; }
        }
        
        /// <summary>
        /// Browser info
        /// </summary>
        public string BrowserInfo
        {
            set { this._browserInfo.InnerHTML = value; }
        }

        /// <summary>
        /// Set all test completed
        /// </summary>
        public void SetAllTestRunned()
        {
            this.Running = false;
        }
    }
}