/**
 * Created by Kevinaskin on 9/9/2016.
 */
(function () {

    var subbtn = document.getElementById('subbtn');
    var loginbox = document.getElementById('loginbox');
    var _username = document.getElementById('username');

    function getValue() {
        var username = $('#username').val();
        var password = $('#password').val();
        var radio = $("input[name='type']:checked").val();
        if (username) {
            if (password) {
                $.post('/registdata', {
                    username: username,
                    psd: password,
                    typedata: radio
                }).done(function (data) {
                    console.log(data);
                    switch (data.code) {
                        case 1062:
                            alert('the Username has been registed.');
                            break;
                        case 0:
                            location.href = "/";
                            break;
                    }
                })
            } else {
                document.getElementById('password').placeholder = 'Please enter Password';
            }
        } else {
            document.getElementById('username').placeholder = 'Please enter Username';
        }

    }

    function loginSubmit() {
        _username.focus();
        loginbox.tabIndex = '-1';
        subbtn.onclick = function () {
            getValue();
        };
        loginbox.onkeydown = function () {
            if (event.keyCode == 13 || event.which == 13 || event.charCode == 13) {
                getValue();
            }
        };

    }

    loginSubmit();

})();
