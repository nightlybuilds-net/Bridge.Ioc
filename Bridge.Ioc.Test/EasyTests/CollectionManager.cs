using System;
using System.Collections.Generic;
using System.Linq;
using Bridge.Html5;

namespace Bridge.EasyTests
{
    /// <summary>
    /// Manage a collection of item
    /// Automatically sync collection with dom
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    internal abstract class CollectionManager<T> 
    {
        /// <summary>
        /// Items collection
        /// </summary>
        public readonly List<Tuple<T, List<HTMLElement>>> Items = new List<Tuple<T, List<HTMLElement>>>();

        /// <summary>
        /// Generate a HtmlElement from T item
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        protected abstract List<HTMLElement> GenerateElement(T item);

        /// <summary>
        /// Called when the new HTMLElement is generated.
        /// Default is AppendChild to Container.
        /// </summary>
        /// <param name="addedElement"></param>
        protected virtual void DomActionOnAdd(Tuple<T, List<HTMLElement>> addedElement)
        {
            addedElement.Item2.ForEach(f =>
            {
                this.Container.AppendChild(f);
            });
        }

        /// <summary>
        /// Container element for collection
        /// </summary>
        public abstract HTMLElement Container { get; }

        public virtual void AddRange(IEnumerable<T> items)
        {
            foreach (var item in items)
            {
                this.Add(item);
            }
        }

        public virtual void Add(T item)
        {
            var internalItem = new Tuple<T, List<HTMLElement>>(item, this.GenerateElement(item));
            this.Items.Add(internalItem);

            this.DomActionOnAdd(internalItem);
        }

        public virtual void Clear()
        {
            // remove all elements from dom
            foreach (var tuple in this.Items)
            {
                // cannot use tuple.Item2.Remove(); ** not supported on EDGE/IE **
                tuple.Item2.ForEach(f =>
                {
                    this.Container.RemoveChild(f);
                });
            }

            this.Items.Clear();
        }

        public bool Contains(T item)
        {
            return this.Items.Select(s => s.Item1).Contains(item);
        }

        public virtual bool Remove(T item)
        {
            if (!this.Contains(item)) return false;

            var internalItem = this.Items.First(f => f.Item1.Equals(item));

            // cannot use tuple.Item2.Remove(); ** not supported on EDGE/IE **
            internalItem.Item2.ForEach(f =>
            {
                this.Container.RemoveChild(f);
            });

            var res = this.Items.Remove(internalItem);

            return res;
        }

        public int Count => this.Items.Count;
        public int IndexOf(T item)
        {
            try
            {
                return this.Items.IndexOf(this.Items.First(f => f.Item1.Equals(item)));
            }
            catch
            {
                return -1;
            }
        }


        public Tuple<T, List<HTMLElement>> this[int index]
        {
            get { return this.Items[index]; }
            set { this.Items[index] = value; }
        }

    }
}