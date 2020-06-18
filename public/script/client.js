var i = 1;
var myVar;
var socket = io();
$(document).ready(function () {
    // myVar = setInterval(hideItem, 2000);
    $('.msgform').submit(e=>{
        e.preventDefault();
        var today = new Date();
        var date = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+' '+today.getDate()+':'+(today.getMonth()+1)+':'+today.getFullYear();
        console.log('Time from client', date);
        socket.emit('msginfo', {
            message: $('.message').val(),
            time: date,
            image: "image/103618567_896780407493343_1881539328406741835_n.png"
        })
    })
    socket.on('msgdis', (data)=>{
        var string = '<div class="item"><i class="timestamp">Tony Parker: cập nhật trạng thái vào ' + data.time + '</i><div class="content"><p class="status">' + data.message + '</p><img src="' + data.image + '" alt=""></div></div>'
        $('.display').append(string);
    })
    $('.click').click(function(){
        $(".up").trigger('click');
     })
})
function hideItem() {
    var hItem = ".message" + i;
    var j = i + 1;
    var sItem = ".message" + j;
    console.log("Hidden item" + hItem + ", show item" + sItem);
    $(hItem).fadeOut("slow", function () {
        $(sItem).fadeIn("slow");
    });
    i++;
    if (i > 7) {
        clearInterval(myVar);
    }
}
