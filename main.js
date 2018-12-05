
//server();

var version = "1.0.0",
    app     = $server.new(),
    options = {
        host: $device.wlanAddress,
        port: 3100,
    };

server();
main();

/**
 * Init
 */
function main() {
    options.host == "error" && $ui.error( "请先连接网络" );
    $ui.render({
        views: [{
            type: "scroll",
            layout: $layout.fill,
            views: [
                {
                    type: "image",
                    props: {
                      src: "/assets/logo@384.png"
                    },
                    layout: function(make, view) {
                      make.centerX.equalTo(view.super)
                      make.size.equalTo($size(128, 128))
                      make.top.offset( 20 );
                    }
                },
                {
                    type: "label",
                    props: {
                        text: "简 Tab " + version + " 正式版",
                        font: $font(13),
                        textColor: $color("#333333b3"),
                        align: $align.center
                    },
                    layout: function(make, view) {
                        make.width.equalTo( view.super );
                        make.top.offset( 130 );
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "host",
                        font: $font(13),
                        align: $align.center,
                        textColor: $color("#333333b3"),
                        text: "监听地址 👉 " + options.host + ":" + options.port,
                    },
                    layout: function(make, view) {
                        make.width.equalTo( view.super );
                        make.top.offset( 160 );
                    },
                },
                {
                    type: "input",
                    props: {
                        id: "port",
                        placeholder: "默认端口为 " + options.port,
                    },
                    layout: function(make, view) {
                        make.width.equalTo( view.super );
                        make.top.offset( 180 );
                        make.height.equalTo( 50 );
                    },
                    events: {
                        changed: function() {
                            options.port     = $("port").text;
                            $( "host" ).text = "监听地址 👉 " + options.host + ":" + options.port;
                        }
                    }
                },
                {
                    type: "button",
                    props: {
                        id: "app",
                        title: "开启监测 >>",
                        bgcolor: $color("#008962")
                    },
                    layout: function(make, view) {
                        make.width.equalTo( view.super );
                        make.top.offset( 240 );
                        make.height.equalTo( 50 );
                    },
                    events: {
                        tapped: function( sender ) {
                            var text = $( "app" ).title;
                            if ( text.startsWith( "开启" ) ) {
                                app.start( options );
                                $( "app" ).title = "关闭监测 >>";
                                $( "app" ).bgcolor = $color("#F44336");
                            } else {
                                app.stop();
                                $( "app" ).title = "开启监测 >>";
                                $( "app" ).bgcolor = $color("#008962");
                            }
                        }
                    }
                },
                {
                    type: "button",
                    props: {
                        title: "新手入门 >>",
                        bgcolor: $color("#1dba90")
                    },
                    layout: function(make, view) {
                        make.width.equalTo( view.super );
                        make.top.offset( 300 );
                        make.height.equalTo( 50 );
                    },
                    events: {
                        tapped: function( sender ) {
                            readme( "README.md" );
                        }
                    }
                },
                {
                    type: "button",
                    props: {
                        title: "关于简 Tab >>",
                        bgcolor: $color("#1dba90")
                    },
                    layout: function(make, view) {
                        make.width.equalTo( view.super );
                        make.top.offset( 360 );
                        make.height.equalTo( 50 );
                    },
                    events: {
                        tapped: function( sender ) {
                            $ui.alert({
                                title: "嗨，很高兴遇见你！",
                                message: "\n我叫 Kenshin，是简 Tab 的作者，这是简 Tab 在 iOS 上面的一次「尝试」。\n\n很感谢 JSBox 的开发者 - 钟颖为我们带来一个这么棒的工具！\n\n希望在 New Tab 上的一些图片也能给你的手机带来一些别样风景。\n\n",
                                actions: [
                                    {
                                        title: "请杯咖啡 ☕",
                                        handler: function() {
                                            $app.openURL("http://sr.ksria.cn/zhifu_m2.png");
                                        }
                                    },
                                    {
                                        title: "再想想",
                                    }
                                ]
                            });
                        }
                    }
                },
                {
                    type: "button",
                    props: {
                        id: "update",
                        title: "检查更新 >>",
                        bgcolor: $color("#1976d2")
                    },
                    layout: function(make, view) {
                        make.width.equalTo( view.super );
                        make.top.offset( 420 );
                        make.height.equalTo( 50 );
                    },
                    events: {
                        tapped: function( sender ) {
                            $ui.loading( true );
                            if ( $("update").title == "点击更新 >>" ) {
                                $ui.loading( false );
                                $app.openURL("https://xteko.com/redir?url=http://st.ksria.cn/jsbox/simptab-" + version + ".box?" + Math.round(+new Date()) + "&name=%E7%AE%80%20Tab");
                                return;
                            }
                            $http.get({
                                url: "http://st.ksria.cn/versions.json?" + Math.round(+new Date()),
                                handler: function( resp ) {
                                    $ui.loading( false );
                                    if ( resp.error != null ) {
                                        $ui.error( "发生了错误，请稍后再试！" );
                                        return;
                                    }
                                    if ( resp.data.jsbox != version ) {
                                        $ui.toast( "有可用更新。" );
                                        $("update").title   = "点击更新 >>";
                                        $("update").bgcolor = $color("#FF5252");
                                        version = resp.data.jsbox;
                                    } else {
                                        $ui.toast( "无需更新。" );
                                    }
                                }
                            });
                        }
                    }
                },
                {
                    type: "button",
                    props: {
                        title: "我的作品 >>",
                        bgcolor: $color("#8BC34A")
                    },
                    layout: function(make, view) {
                        make.width.equalTo( view.super );
                        make.top.offset( 480 );
                        make.height.equalTo( 50 );
                    },
                    events: {
                        tapped: function( sender ) {
                            $app.openURL( "http://kenshin.wang/project.html" );
                        }
                    }
                }
            ]
        }]
    });
}

function server() {

    app.listen({
        didStart: app => {
            $delay( 0.1, () => {
                $ui.toast( "已成功启动服务!" );
            });
        },
        didConnect: app => {},
        didDisconnect: app => {},
        didStop: app => {
            $delay( 1, () => {
                $ui.toast( "已成功停止服务!" );
            });
        },
        didCompleteBonjourRegistration: app => {},
        didUpdateNATPortMapping: app => {}
    });

    var handler = {};

    handler.filter = rules => {
        var method = rules.method,
            url    = rules.url;
        return "data"; // default, data, file, multipart, urlencoded
    }

    handler.response = request => {

        var url  = request.data.string,
            code = 200;

        //console.log( request.data );

        if ( url != "" ) {
            $delay( 2, () => {
                $ui.toast( "接受完毕，开始下载，请稍等!" );
                //download( url );
                base64toPNG( url );
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
                    "name": $device.info.name
                }
            }
        };
    }

    app.addHandler( handler );
}

function base64toPNG( base64 ) {
    var decodeBase64 = function ( string ) {
            var url  = $objc( "NSURL"  ).$URLWithString( string ),
                file = $objc( "NSData" ).$dataWithContentsOfURL( url );
            return file.rawValue();
        },
        data = decodeBase64( base64 );
    savePhoto( data );
}

function download( url ) {
    $http.download({
        url: url,
        progress: function(bytesWritten, totalBytes) {
            var percent = bytesWritten * 1.0 / totalBytes;
            $ui.progress( percent );
            //console.log( percent )
            //$( "progress" ).value( percent );
        },
        handler: function( resp ) {
            savePhoto( resp.data );
        }
    });
}

function savePhoto( data ) {
    $photo.save({
        data: data,
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