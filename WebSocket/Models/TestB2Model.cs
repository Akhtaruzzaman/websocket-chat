using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebSocket.Models
{
    public class TestB2Model : IDisposable
    {
        public int MyPropertyTestB2 { get; set; }
        public TestB2Model(int sl)
        {
            this.MyPropertyTestB2 = sl;
        }
        public int Sqrt()
        {
            return MyPropertyTestB2 * MyPropertyTestB2;
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
