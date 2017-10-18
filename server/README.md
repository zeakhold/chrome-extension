# 文件说明
    这是服务端文件，使用NodeJS对天气接口进行封装处理，并且使用Nginx反向代理，从而解决CSP的安全问题。
    
PS:不打算自己搭建的可以忽略本文件夹，直接使用我的天气API就行了：http://node.zeakhold.com/weather


## 程序逻辑
- 首先使用新浪的接口获取访问者IP对应的地理位置（所在城市）
- 然后用地理位置作为参数去请求sojson.com的天气预报接口
- 最后将获取到的天气信息返回给访问端


## Node部署
使用forever模块持久运行app.js

    $ npm install forever -g
    $ forever start app.js


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
    
