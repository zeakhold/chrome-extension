// 天气预报服务端
// 测试接口：http://node.susamko.com/weather

const http = require('http');
const axios = require('axios')

const cityArr = require('./city')

const HOST_NAME = '127.0.0.1';
const PORT = 3333;


const server = http.createServer((req, res) => {

    if (req.url == '/weather') { //过滤其它请求
        console.log(`新进请求：${req.headers['x-real-ip']}`)

        // Step one: 请求得到ip地址
        axios.get(`http://ip.taobao.com/service/getIpInfo.php?ip=${req.headers['x-real-ip']}`)
            .then(({ data }) => {
                console.log('==>ip地址请求回包：', data)
                return data.data && data.data.city;
            })
            .then((city) => {
                let cityCode

                cityArr.some(item => {
                    if(item['city_name'] === city) {
                        cityCode = item['city_code']
                        return true
                    }
                })

                console.log(`==>所在城市: ${parsedData.data.city}；对应city_code：${cityCode}`)

                // Step two: 请求得到天气信息
                return axios.get(`http://t.weather.sojson.com/api/weather/city/${cityCode}`)
            })
            .then(({ data2 }) => {
                console.log('==>天气接口返回：', data2)

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json;charset=UTF-8');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end(data2);
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




