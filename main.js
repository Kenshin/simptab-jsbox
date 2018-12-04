
server();

function server() {
    // Create a server
    var port   = 6060,
        server = $server.new();

    // Observe events
    server.listen({
        didStart: server => {
            $delay( 1, () => {
                $ui.toast( "已成功启动服务!" );
            });
        },
        didConnect: server => {},
        didDisconnect: server => {},
        didStop: server => {},
        didCompleteBonjourRegistration: server => {},
        didUpdateNATPortMapping: server => {}
    });

    // Create a handler
    var handler = {};

    // Handler filter
    handler.filter = rules => {
        var method = rules.method,
            url    = rules.url;
        return "data"; // default, data, file, multipart, urlencoded
    }

    // Handler response
    handler.response = request => {

        var url  = request.data.string,
            code = 200;

        console.log( request.data );

        if ( url != "" ) {
            $delay( 2, () => {
                $ui.toast( "接受完毕，开始下载，请稍等!" );
                download( url );
            });
        } else {
            code = 500;
            $ui.error( "导入发生了错误，请稍后再试！" );
        }

        return {
            type: "data", // default, data, file, error
            props: {
                json: {
                    "status": code,
                }
            }
        };
    }

    // Register handler
    server.addHandler( handler );

    // Options
    var options = {
        port: port,
    };

    // Start the server
    server.start( options );
}

function download( url ) {
    $http.download({
        url: url,
        progress: function(bytesWritten, totalBytes) {
            var percentage = bytesWritten * 1.0 / totalBytes;
            console.log( percentage )
            $ui.progress( percentage )
        },
        handler: function( resp ) {
            $photo.save({
                data: resp.data,
                handler: function(success) {
                    $ui.alert({
                        title: "壁纸下载成功！",
                        actions: [
                            {
                                title: "完成",
                                handler: function() {
                                    //TO-DO
                                }
                            },
                            {
                                title: "是否打开相册？",
                                handler: function() {
                                    $app.openURL("photos-redirect://");
                                }
                            }
                        ]
                    });
                }
            })
        }
    });
}

