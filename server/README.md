# 文件说明
这是服务端文件，使用NodeJS对天气接口进行封装处理，并且使用Nginx反向代理，从而解决CSP的安全问题。
    
测试接口：http://node.zeakhold.com/weather


## 程序逻辑
- 首先使用[淘宝的接口](http://ip.taobao.com/service/getIpInfo.php?ip=115.159.152.210)获取访问者IP对应的地理位置（所在城市）
- 然后用地理位置作为参数去请求[sojson.com](https://www.sojson.com/blog/234.html)的天气预报接口
- 最后将获取到的天气信息返回给访问端


## Node部署
使用forever模块持久运行app.js

    $ npm install forever -g
    $ forever start app.js


Ps.可以指定app.js中的日志信息和错误日志输出文件，-o 就是console.log输出的信息，-e 就是console.error输出的信息：  

    forever start -o out.log -e err.log app.js  


## Nginx配置

    server {
        listen	80;
        server_name  node.zeakhold.com;
    
        location / {
            proxy_pass http://localhost:3333;
            proxy_set_header Host $host;  
            proxy_set_header X-Real-IP $remote_addr;  
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
        }
    
        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
    
