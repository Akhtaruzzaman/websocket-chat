$(document).ready(function () {
    if (!getUrlParameter("username") || !getUrlParameter("room")) {
        window.location.href = "/";
    }
    else {
        var connection = new WebSocketManager.Connection("wss://localhost:5001/chat");
        connection.enableLogging = true;

        connection.connectionMethods.onConnected = () => {
            connection.invoke("Connected", getUrlParameter("username"), getUrlParameter("room"), "connected");
        }

        connection.connectionMethods.onDisconnected = () => {

        }

        connection.clientMethods["pingMessage"] = (username, room, message) => {
            if (getUrlParameter("room") == room) {
                var messageText = '<span>' + username + '</span> : ' + message;
                if (getUrlParameter("username") == username) {
                    $('#messages').append('<div class="alert alert-primary text-right" role="alert">' + messageText + '</div>');
                }
                else {
                    $('#messages').append('<div class="alert alert-info" role="alert">' + messageText + '</div>');
                }
                $('#messages').scrollTop($('#messages').prop('scrollHeight'));
            }
        }
        connection.clientMethods["pingConnected"] = (username, room, message) => {
            if (getUrlParameter("room") == room) {
                var messageText = '<span>' + username + '</span> : ' + message;
                if (getUrlParameter("username") != username) {
                    $('#messages').append('<div class="alert alert-primary text-right" role="alert">' + messageText + '</div>');
                }
            }
        }

        connection.start();

        var $messagecontent = $('#message-content');
        $messagecontent.keyup(function (e) {
            if (e.keyCode == 13) {
                var message = $messagecontent.val().trim();
                if (message.length == 0) {
                    return false;
                }
                connection.invoke("SendMessage", getUrlParameter("username"), getUrlParameter("room"), message);
                $messagecontent.val('');
            }
        });
        $('#btn-send').click(function () {
            var message = $messagecontent.val().trim();
            if (message.length == 0) {
                return false;
            }
            connection.invoke("SendMessage", getUrlParameter("username"), getUrlParameter("room"), message);
            $messagecontent.val('');
        });
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }

});

