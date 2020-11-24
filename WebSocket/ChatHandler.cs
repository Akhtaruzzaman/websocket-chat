using System.Dynamic;
using System.Threading.Tasks;
using WebSocketManager;

namespace WebSocket
{
    public class ChatHandler : WebSocketHandler
    {
        private readonly ChatManager _chatManager;
        public ChatHandler(WebSocketConnectionManager webSocketConnectionManager, ChatManager chatManager) : base(webSocketConnectionManager)
        {
            _chatManager = chatManager;
        }

        public async Task Connected(string username, string room, string message)
        {
            await InvokeClientMethodToAllAsync("pingConnected", username, room, message);
        }
        public async Task SendMessage(string username, string room, string message)
        {
            dynamic dynamicMessage = new ExpandoObject();
            dynamicMessage.username = username;
            dynamicMessage.room = room;
            dynamicMessage.message = message;
            _chatManager.Messages.Add(dynamicMessage);
            await InvokeClientMethodToAllAsync("pingMessage", username, room, message);
        }
    }
}
