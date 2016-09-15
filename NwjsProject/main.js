/**
 * Created by Kevinaskin on 9/12/2016.
 */
(function () {
    var socket = io("http://localhost:3000");
    socket.on('getlogindata', function () {
        socket.emit('currentUser', {currentUser: window.localStorage.loginUser});
        $.post('http://localhost:3000/admin/list', {teacherid: window.localStorage.loginUser}).done(function (data) {
            console.log(data);//学生名单列表
            var p_html = 'Supposed to Join the class :<br>';
            for (var i = 0; i < data.length; i++) {
                p_html += "Student" + (i + 1)+":<span style='color:dodgerblue'>" + data[i].studentid + "</span>; ";
            }
            $('#student_list').html(p_html);
        })
    });
    console.log(window.localStorage.loginUser);


    var gui = require('nw.gui');
    gui.Screen.Init();
    gui.Screen.chooseDesktopMedia(["window", "screen"],
        function (streamId) {
            var vid_constraint = {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: streamId,
                    maxWidth: 1920,
                    maxHeight: 1080
                },
                optional: []
            };
            navigator.webkitGetUserMedia({audio: false, video: vid_constraint}, function (stream) {
                document.getElementById("desktop_video").src = URL.createObjectURL(stream);
            }, function (error) {
                console.error(error);
            });
        }
    );

    var sendBtn = document.getElementById('send-btn');
    sendBtn.onclick = function () {

    }

})();