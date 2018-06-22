var app = require('http');
var fs = require('fs');
var port = 8080;

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    var url = decodeURIComponent((req.url == '/') ? '/index.html' : req.url);

    var file_extension = req.url.lastIndexOf('.');
    var header_type = (file_extension == -1 && req.url != '/')
                    ? 'text/plain'
                    : {
                        '/' : 'text/html',
                        '.html' : 'text/html',
                        '.ico' : 'image/x-icon',
                        '.jpg' : 'image/jpeg',
                        '.png' : 'image/png',
                        '.gif' : 'image/gif',
                        '.css' : 'text/css',
                        '.js' : 'text/javascript',
                        '.ttf': 'font/ttf',
                        '.otf': 'font/ttf',
                        '.woff': 'font/woff',
                        '.woff2': 'font/woff2'
                        }[ req.url.substr(file_extension) ];


    fs.readFile( __dirname + url, (err, data)=>{
        if (err) {
            console.log('==> Error: ' + err);
            console.log('==> Error 404: file not found ' + url);
            
            res.writeHead(404, 'Not found');
            res.end();
        } else {
            res.setHeader('Content-type' , header_type);

            res.end(data);
            console.log( url, header_type );
        }
    })
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err);
    else
        console.log(`Server is starting at port ${port}`);
})