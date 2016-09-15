/**
 * Created by Kevinaskin on 9/11/2016.
 */
(function () {
    function Main() {
        this.getElements();
        this.getData();
        this.getListData();

    }
    Main.prototype.getinnerHtml = function () {
        var that = this;
        var nameBtn = document.getElementsByClassName('nameBtn');
        for(var i =0;i<nameBtn.length;i++){
            (function (i) {
                nameBtn[i].onclick = function () {
                    that.searchinput.value = nameBtn[i].innerHTML;
                }
            })(i);
        }
    };
    Main.prototype.getListData = function () {
        var that = this;
        $.post('/admin/currentUser').done(function (data) {
            $.post('/admin/list', {
                teacherid: data.currentUser
            }).done(function (data) {
                var string_list='<h3>Student_list:</h3>';
                for (var i = 0; i < data.length; i++) {
                    string_list += "<p class='nameBtn'>" + data[i].studentid + "</p>"
                }
                that.listcontainer.innerHTML = string_list;
                that.getinnerHtml();
            })
        })


    };
    Main.prototype.getElements = function () {
        this.delBtn = document.getElementById('delbtn');
        this.searchinput = document.getElementById('searchinput');
        this.searchBtn = document.getElementById('searchbtn');
        this.listcontainer = document.getElementById('listcontainer');
    };
    Main.prototype.getData = function () {
        var that = this;
        this.searchBtn.onclick = function () {
            if (that.searchinput.value) {
                $.post('/admin', {
                    studentid: that.searchinput.value
                }).done(function (data) {
                    console.log(data);
                    switch (data.code) {
                        case 0:
                            $.post('/admin/list', {
                                teacherid: data.currentUser
                            }).done(function (data) {
                                var string_list='<h3>Student_list:</h3>';
                                for (var i = 0; i < data.length; i++) {
                                    // console.log(data[i]);
                                    string_list += "<p class='nameBtn'>" + data[i].studentid + "</p>"
                                }
                                that.listcontainer.innerHTML = string_list;
                                that.getinnerHtml();
                            });
                            break;
                        case 1:
                            alert(data.msg);
                            break;
                        case 2:
                            alert(data.msg);
                    }
                })
            } else {
                alert("Please enter a Student's name");
            }
        };
        this.delBtn.onclick = function () {
            if (that.searchinput.value) {
                $.post('/admin/del', {
                    studentid: that.searchinput.value
                }).done(function (data) {
                    console.log(data);
                    switch (data.code) {
                        case 4:
                            $.post('/admin/list', {
                                teacherid: data.currentUser
                            }).done(function (data) {
                                var string_list='<h3>Student_list:</h3>';
                                for (var i = 0; i < data.length; i++) {
                                    // console.log(data[i]);
                                    string_list += "<p class='nameBtn'>" + data[i].studentid + "</p>"
                                }
                                that.listcontainer.innerHTML = string_list;
                                that.getinnerHtml();
                            });
                            break;
                        case 3:
                            alert(data.msg);
                            break;
                    }
                })
            } else {
                alert("Please enter a Student's name");
            }
        }
    };

    new Main();
})();