//let express = require('express');
//
//let app = express();
//
//let server = app.listen(3000);
//
//
//
//app.use(express.static('../mine'));
//
//app.get('/admin',(req,res) =>{
//    res.send('welcome admin');
//})
//
const http=require('http'); //including http module
const url=require('url'); //including url module
const fs=require('fs'); //including file system module
const path=require('path'); //path module

const port=3000;
const hostname='127.0.0.1';
//mimetypes are the types that are going to be suported by our server.
//if we wish we can add as many mime types as possible
const mimeTypes = {
    'html':'text/html',
    'css':'text/css',
    'js':'text/javascript',
    'png':'image/png',
    'jpeg':'image/jpeg',
    'jpg':'image/jpg'
};

//createServer() creates a simple server
http.createServer((req, res) => {
    //parses the url into a string form
    var myuri = url.parse(req.url).pathname;

    var filename = path.join(process.cwd(), unescape(myuri));
    console.log('file you are looking for is:'+filename);
    var loadFile;
    try{
        //lstatSync loads the requested file
        loadFile = fs.lstatSync(filename);
    }
    catch(error){
        //fires if the file isn't found
         res.writeHead(404, {'Content-Type':'text/plain'});
        res.write('404 file not found');
        res.end();
        return;
    }
    
    //if the url that we are searching for is a string
    if(loadFile.isFile()){
        //seperate the filename and its extension and chek if the extension is present in the mimetypes
        var mimeType = mimeTypes[path.extname(filename).split('.').reverse()[0]];
        //if everything is ok.. send a server response of 200-OK
        res.writeHead(200, {'Content-Type':mimeType});
        //file can send in the form of streams
        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);
    }
    //if the url we are looking for is a directory
    else if(loadFile.isDirectory()){
        //302-directory related server response, and by default it opens up index.html file
        res.writeHead(302, {'Location':'index.html'});
        res.end();
    }
    else{
        //else 500-internal server error
        res.writeHead(500, {'Content-Type':'text/plain'});
        res.write('500 internal error');
        res.end();
    }
}).listen(port, hostname, () => {
    console.log('server is running....!!!');
});