var WS = {
    start: function () {
        this.event.onMessage();
    },
    event: {
        init: new WebSocket('ws://192.168.100.11:8090'),
        // init: new WebSocket('ws://localhost:8090'),
        onOpen: function(e) {
            return this.init.onopen = function (e) {
                console.log(e);
            };
        },
        onError: function(e) {
            return this.init.onerror = function (e) {
                return console.log(e);
            };
        },
        onClose: function (e) {
            return this.init.close();
        },
        onSend: function (e) {
            JSON.parse(e);
            var data = JSON.stringify({'action' : 'event', 'message' : e});
            return this.init.send(data);
        },
        onMessage: function (e) {
            return this.init.onmessage = function(e) {
                var response = JSON.parse(e.data);
                var notif = response.notif;
                if (response.type && response.type == 'event') {
                    if($(response.data.tab).length){
                        $.each(response, function(i, item) {
                                $.each(item.tab, function(i, list) {
                                    if ($('#'+ list ).length && $('#'+ list ) !== 'undefined') {
                                        TABS.reload('#' + list);
                                        Lobibox.notify('success', notif);
                                    }
                                });
                        });
                    }
                }
            }
        }
    }
};
WS.start();

/*$(function() {
    var event = new WebSocket('ws://localhost:8090');
    event.onmessage = function(e) {
        var response = JSON.parse(e.data);
        $.each(response, function(i, item) {
            if (item.pjax && item.pjax !== 'undefined') {
                $.each(item.pjax, function(i, list) {
                    console.log(list);
                });
            }
        });
        if (response.type && response.type == 'event' && $(response.tab).length) {
            responseTab(response.tab);
        }
    };
});*/
