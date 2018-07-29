// 天气预报服务端
// 测试接口：http://node.zeakhold.com/weather

const http = require('http');
const qs = require('querystring');
const request = require('request-promise-native');

const HOST_NAME = '127.0.0.1';
const PORT = 3333;


const server = http.createServer((req, res) => {

    if (req.url == '/weather') { //过滤其它请求
        console.log(`新进请求：${req.headers['x-real-ip']}`)

        // Step one: 请求得到ip地址
        request(`http://ip.taobao.com/service/getIpInfo.php?ip=${req.headers['x-real-ip']}`)
            .then((body) => {
                const parsedData = JSON.parse(body);
                console.log(`所在城市: ${parsedData.data.city}`)
                return parsedData.data.city;
            })
            .then((city) => {
                // Step two: 请求得到天气信息
                return request(`https://www.sojson.com/open/api/weather/json.shtml?city=${qs.escape(city)}`)
            })
            .then(body2 => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json;charset=UTF-8');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end(body2);
            })
            .catch((err) => {
                console.log(`[!!!]请求出错了：${err}`)
                throw err;
            })

    } else {
        res.statusCode = 200;
        res.end('Hello~');
    }

});

server.listen(PORT, HOST_NAME, () => {
    console.log(`服务器运行在 http://${HOST_NAME}:${PORT}/ \n\n`);
});




