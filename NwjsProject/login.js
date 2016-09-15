/**
 * Created by Kevinaskin on 9/13/2016.
 */
(function () {
    function Main() {
        this.getElements();
        this.loginPost();
    }

    Main.prototype.getElements = function () {
        this.subbtn = document.getElementById('subbtn');
        this.username = document.getElementById('username');
        this.password = document.getElementById('password');
    };
    Main.prototype.loginPost = function () {
        var that = this;
        this.subbtn.onclick = function () {
            if(that.username){
                if(that.password){
                    $.post('http://localhost:3000/logincheck',{
                        username:that.username.value,
                        psd:that.password.value
                    }).done(function (data) {
                        switch (data.code){
                            case 1:
                                alert('Wrong Password');
                                break;
                            case 2:
                                alert('No Such Username');
                                break;
                            default:
                                window.localStorage.loginUser = that.username.value;
                                location.href = 'index.html';
                                break;
                        }
                    })
                }else{
                    that.password.placeholder = 'Please enter password here';
                }
            }else{
                that.username.placeholder = 'Please enter username here';
            }
        }
    };

    new Main();
})();