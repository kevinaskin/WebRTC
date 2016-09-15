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
        if (username) {
            if (password) {
                $.post('/logincheck', {
                    username: username,
                    psd: password
                }).done(function (data) {
                    switch (data.code) {
                        case 0:
                            location.href = "/classroom";
                            break;
                        case 1:
                            alert('Wrong Password');
                            break;
                        case 2:
                            alert('No such Username');
                            break;
                        case 3:
                            location.href='/classroom/teacher';
                            break;
                        case 4:
                            location.href='/nwjs-client/index';
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
