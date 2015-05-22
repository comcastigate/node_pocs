window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
	
	field.onkeyup = function(e) {
        if (e.which == 13) {  // detect the enter key
            sendButton.onclick(); // fire a sample click,  you can do anything
        }
    };

 
    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text });
		field.value = '';
    };
 
}