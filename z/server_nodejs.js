const http = require('http');
const fs = require('fs');

var server = http.createServer(function (req, res) {
    const url = req.url; //リクエストからURLを取得
    const tmp = url.split('.'); //splitで . で区切られた配列にする
    const ext = tmp.slice(-1)[0]; //tmp配列の最後の要素(外部ファイルの拡張子)を取得
    const path = '.' + url; //リクエストされたURLをサーバの相対パスへ変換する

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