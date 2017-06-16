$(document).ready(function(){
    
    document.addEventListener("deviceready", onDeviceReady, false);


    function onDeviceReady(){
        console.log("1");
 
        window.open = cordova.InAppBrowser.open;

        
        $(document).on("click", "#openBrowserTXT", function() {
            var url = "http://muhamadaldiansyah.netne.net/alsecure/foto";
            window.open(url,"location=no");
        });
        
       
        window.plugins.OneSignal
        .startInit("220693a5-4fcd-460e-99e8-29951e2a1423", "244135989382")
        .handleNotificationReceived(function(jsonData) {
    //      alert("Notification received:\n" + JSON.stringify(jsonData));
            console.log('Did I receive a notification: ' + JSON.stringify(jsonData));
            // alert("notif2" + jsonData);
        })
        .handleNotificationOpened(function(jsonData) {
    //      alert("Notification opened:\n" + JSON.stringify(jsonData));
            console.log('didOpenRemoteNotificationCallBack: ' + JSON.stringify(jsonData));   
            // alert("notif3" + jsonData);
        })
        .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
        .endInit();

        window.plugins.OneSignal.getTags(function(tags) {
            console.log('Tags Received: ' + JSON.stringify(tags));
        });
        window.plugins.OneSignal.sendTag("alsecure", "aplikasi_umum");

        

        $("#LihatFoto").click(function (e) {
            e.preventDefault(); 
            x = document.getElementById('BukaFoto');
            x.src = "http://muhamadaldiansyah.netne.net/alsecure/foto/foto-1.jpg";
        });


    };  
});

function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, function() {
        return args[i++];
    });
}













var arr = [""];

function fungsiGambar() {
    var foto_n = '1';
    var URL = parse('http://muhamadaldiansyah.netne.net/alsecure/foto/foto-%s.jpg', foto_n);
    checkImage(URL, 
        function()
        { 
            tambah();
        }, 
        function()
        {
            console.log("bad"); 
        });

    for (var i in arr) {
        document.write(i);
    } 
}

function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, function() {
        return args[i++];
    });
}


function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good; 
    img.onerror = bad;
    img.src = imageSrc;
}

