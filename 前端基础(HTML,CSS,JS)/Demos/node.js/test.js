'use strict';
// process.nextTick(function () {
//     console.log('nextTick callback!');
// });
// console.log('nextTick was set!');

// process.on('exit', function (code) {
//     console.log('about to exit with code: ' + code);
// });

// if (typeof window === 'undefined') {
//     console.log('node.js');
// } else {
//     console.log('browser');
// }

//异步读文件
// var fs = require('fs');
// // fs.readFile('test.txt', 'utf-8', function (err, data) {
// //     if (err) {
// //         console.log(err);
// //     } else {
// //         console.log(data);
// //     }
// // });
// fs.readFile('test.txt', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

// var http = require('http');
// var url = require('url');
// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));
// var server = http.createServer(function (request, response) {
//     console.log(request.method + ': ' + request.url);
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.end('<h1>Hello World!</h1>');
// });
// server.listen(8080);
// console.log('Server is running at http://127.0.0.1:8080/');

// var fs = require('fs');
// fs.stat('test.txt', function (err, stat) {
//     if (err) {
//         console.log(err);
//     } else {
//         //是否是文件
//         console.log('isFile: ' + stat.isFile());
//         //是否是目录
//         console.log('isDirectory: ' + stat.isDirectory());
//         if (stat.isFile()) {
//             //文件大小
//             console.log('size: ' + stat.size);
//             //创建时间 Date对象
//             console.log('birth time: ' + stat.birthtime);
//             //修改时间 Date对象
//             console.log('modified: ' + stat.mtime);
//         }
//     }
// })
// var stat = fs.statSync('test.txt');
// console.log(stat.isFile());

// var fs = require('fs');
//打开一个流
// var rs = fs.createReadStream('test.txt', 'utf-8');
// rs.on('data', function (chunk) {
//     console.log('DATA:');
//     console.log(chunk);
// });

// rs.on('error', function (err) {
//     console.log('ERROR: ' + err);
// });
// var ws1 = fs.createWriteStream('test.txt', 'utf-8');
// ws1.write('使用Stream写入文本数据...\n');
// ws1.write('END');
// ws1.write('this is shuai');
// ws1.end();
// var ws2 = fs.createWriteStream('test.txt');
// ws2.write(new Buffer('使用Stream写入二进制数据...n'));
// ws2.write(new Buffer('END','utf-8'));
// ws2.end();
// var rs = fs.createReadStream('test.txt');
// rs.on('end',function () {
//     console.log('END');
// });
// var ws = fs.createWriteStream('new.txt');
// rs.pipe(ws, {end: false});

// var http = require('http');
// var server = http.createServer(function (request, response) {
//     console.log(request.method +': ' + request.url);
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.end('<h1>Hello World</h1>');
// });
// server.listen(8080);
// console.log('it runs');

// var url = require('url');
// console.log(url.parse('http://www.baidu.com'));
// var path = require('path');
// var workDir = path.resolve('.'); //解析当前目录
// var filePath = path.join(workDir, 'pub', 'index.html');
// console.log(filePath);
