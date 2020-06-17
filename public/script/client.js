// var i = 1;
// var myVar;
// var socket = io.connect("http://localhost:1007");
// $(document).ready(function () {
//     // myVar = setInterval(hideItem, 2000);
// })
// function hideItem() {
//     var hItem = ".message" + i;
//     var j = i + 1;
//     var sItem = ".message" + j;
//     console.log("Hidden item" + hItem + ", show item" + sItem);
//     $(hItem).fadeOut("slow", function () {
//         $(sItem).fadeIn("slow");
//     });
//     i++;
//     if (i > 7) {
//         clearInterval(myVar);
//     }
// }

var socket = io.connect('http://localhost:1007');
socket.on('connect', function (data) {
    socket.emit('join', 'Hello server from client');
});