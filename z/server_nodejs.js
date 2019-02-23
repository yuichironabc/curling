const http = require('http');
const fs = require('fs');

var server = http.createServer(function (req, res) {
    const url = req.url;
    const tmp = url.split('.');
    const ext = tmp.slice(-1)[0];
    const path = '.' + url;

    fs.readFile(path, function (err, data) {
        let contentType = "";
        switch (ext) {
            case 'html':
                contentType = "text/html";
                break;
            case 'css':
                contentType = "text/css";
                break;
            case 'js':
                contentType = "text/javascript";
                break;
            case 'mp3':
                contentType = "audio/mpeg";
                break;
        }

        res.writeHead(200, {
            "Content-Type": contentType
        });
        res.end(data, 'utf-8');
    });
}).listen(8080);