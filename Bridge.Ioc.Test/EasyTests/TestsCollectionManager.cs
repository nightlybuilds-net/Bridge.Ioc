using System.Collections.Generic;
using Bridge.Html5;

namespace Bridge.EasyTests
{
    internal class TestsCollectionManager : CollectionManager<TestDescriptor>
    {
        private int _count = 0;
        
        protected override List<HTMLElement> GenerateElement(TestDescriptor item)
        {
            var res = new List<HTMLElement>();
            
            var row1 = new HTMLTableRowElement();
            
            
            row1.ClassList.Add(this._count%2==0?"whiteRow":"greyRow"); // alternate
            if(item.Success)
                row1.ClassList.Add("passedTest"); // failed test row

            var cell1 = row1.InsertCell();
            var cell2 = row1.InsertCell();
            var cell3 = row1.InsertCell();

            // CELL1
            cell1.ClassName = item.Success ? "test-ok" : "test-ko";
            // row index
            cell1.AppendChild(new HTMLUnknownElement("strong")
            {
                InnerHTML = $"{this._count +1} {item.Name}"
            });
            
//            cell1.AppendChild(new HTMLSpanElement()
//            {
//                InnerHTML = $"{item.Name}"
//            });

            cell1.AppendChild(new HTMLBRElement());
            
            cell1.AppendChild(new HTMLUnknownElement("i")
            {
                InnerHTML = $" {item.NameDescription}",
                ClassName = "w3-text-grey"
            });
            // ----------

            // CELL2
            cell2.AppendChild(new HTMLUnknownElement("i")
            {
                ClassName = "fa fa-object-group"
            });
            
            cell2.AppendChild(new HTMLSpanElement()
            {
                InnerHTML = $"{item.Group}"
            });
            
            cell2.AppendChild(new HTMLBRElement());

            
            cell2.AppendChild(new HTMLUnknownElement("i")
            {
                InnerHTML = $" {item.GroupDescription}",
                ClassName = "w3-text-grey"
            });
            // ----------
            
            // CELL3
            cell3.ClassName = "w3-right";
            cell3.AppendChild(new HTMLUnknownElement("i")
            {
                ClassName = "fa fa-clock-o"
            });
            
            cell3.AppendChild(new HTMLSpanElement()
            {
                InnerHTML = $"{item.Time} ms"
            });
            // ----------
            
            this._count++;
            res.Add(row1);

            if (item.Success) return res;

            var row2 = new HTMLTableRowElement();
            
            row2.ClassName = this._count%2==0 ? "whiteRow":"greyRow";
            var cell = row2.InsertCell();

            cell.ColSpan = 3;
            cell.ClassName = "test-ko inner-row";

            cell.AppendChild(new HTMLParagraphElement()
            {
                ClassName = "error-message"
            }).AppendChild(new HTMLUnknownElement("i")
            {
                ClassName = "w3-text-grey",
                InnerHTML = item.Error
            });

            cell.AppendChild(new HTMLUnknownElement("pre")
            {
                InnerHTML = item.Stack
            });

            res.Add(row2);

            return res;
        }

        public override HTMLElement Container { get; } = Document.GetElementById("tableTestsList");
    }
}