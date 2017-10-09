const http = require('http');
const qs = require('querystring');

const hostname = '127.0.0.1';
const port = 3333;


const server = http.createServer((req, res) => {

    if (req.url == '/weather') { //过滤其它请求

        http.get(`http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=${req.headers['x-real-ip']}`, (res2) => {

            res2.setEncoding('utf8');
            let rawData = '';
            res2.on('data', (chunk) => {
                rawData += chunk;
            });
            res2.on('end', () => {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData.city)
                const url = "http://www.sojson.com/open/api/weather/json.shtml?city=" + qs.escape(parsedData.city);

                http.get(url, (res3) => {
                    res3.setEncoding('utf8');
                    let rawData2 = '';
                    res3.on('data', (chunk) => {
                        rawData2 += chunk;
                    });
                    res3.on('end', () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.end(rawData2);
                    });
                }).on('error', (e) => {
                    console.error(`Got error: ${e.message}`);
                });
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });

    }else {
        res.statusCode = 200;
        res.end('Hello~');
    }

});

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});




