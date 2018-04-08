const
    http = require('http'),
    qs = require('querystring'),
    request = require('request-promise-native');

const
    hostname = '127.0.0.1',
    port = 3333;


const server = http.createServer((req, res) => {

    if (req.url == '/weather') { //过滤其它请求

        // Step one: 请求得到ip地址
        request(`http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=${req.headers['x-real-ip']}`)
            .then((body) => {
                const parsedData = JSON.parse(body);
                // console.log(`当前城市: ${parsedData.city}`)
                return parsedData.city;
            })
            .then((city) => {
                // Step two: 请求得到天气信息
                return request(`http://www.sojson.com/open/api/weather/json.shtml?city=${qs.escape(city)}`)
            })
            .then(body2 => {
                // console.log(`body2: ${body2}`)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json;charset=UTF-8');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end(body2);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })

    } else {
        res.statusCode = 200;
        res.end('Hello~');
    }

});

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});




