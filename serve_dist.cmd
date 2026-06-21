@echo off
echo Starting HTTP server for eternal heart status bar...
echo Server at http://localhost:6622/
cd /d "%~dp0dist"
node -e "const http=require('http'),fs=require('fs'),path=require('path'),distDir=path.resolve('.');http.createServer((req,res)=>{let urlPath=decodeURIComponent(req.url.split('?')[0]),filePath=path.join(distDir,urlPath);if(filePath=path.resolve(filePath),!filePath.startsWith(distDir)){res.writeHead(403);return res.end('Forbidden');}if(fs.existsSync(filePath)&&fs.statSync(filePath).isDirectory())filePath=path.join(filePath,'index.html');const ext=path.extname(filePath),mime={'.html':'text/html;charset=utf-8','.js':'application/javascript','.css':'text/css'};fs.readFile(filePath,(err,data)=>{err?(res.writeHead(404),res.end('Not Found')):(res.writeHead(200,{'Content-Type':mime[ext]||'text/plain','Access-Control-Allow-Origin':'*'}),res.end(data));})}).listen(6622,()=>console.log('Server ready on port 6622'))"
