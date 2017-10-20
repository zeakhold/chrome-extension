window.onload = () =>{
    let $header = document.getElementById('header'),
        $tbody = document.getElementById('tbody');

    ajax('http://node.zeakhold.com/weather','GET',null,(responseText)=>{
        let data = JSON.parse(responseText);

        let forecast = data.data.forecast,
            yesterday = data.data.yesterday;;

        //填充头部信息
        $header.innerHTML = `<span id="city">${data.city}</span> ` + forecast[0].type + '&nbsp;&nbsp; 空气质量:' + data.data.quality + '&nbsp; 实时温度:' + data.data.wendu;

        //填充昨天天气
        $tbody.innerHTML += `<tr><td>${yesterday.date.split('星')[0]}(昨天)</td><td>${yesterday.type}</td><td>${yesterday.low.split(' ')[1] + '~' + yesterday.high.split(' ')[1]}</td><td>${yesterday.fl}</td></tr>`;

        //填充预测天气
        forecast.forEach((item,i) => {
            $tbody.innerHTML += `<tr><td>${item.date}</td><td>${item.type}</td><td>${item.low.split(' ')[1] + '~' + item.high.split(' ')[1]}</td><td>${item.fl}</td></tr>`
        })

    })


    function ajax(url, method, param, callback) {

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    callback && callback(xhr.responseText);
                }
            }
        }

        xhr.open(method, url, true);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.send(param);
    }

}