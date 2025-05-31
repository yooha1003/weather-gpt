var express = require("express");
var app = express();

app.get("/weather", function (req, res) {
  const { serviceKey, numOfRows, pageNo, base_date, base_time, nx, ny } = req.query;

  var api_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?";
  var request = require("request");
  var options = {
    url: api_url,
    qs: { serviceKey, numOfRows, pageNo, base_date, base_time, nx, ny },
  };

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "application/xml;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(3000, function () {
  console.log(
    "http://127.0.0.1:3000/weather?serviceKey=Hk%2FN%2BBOSJC66biuLuC5Xa9aZV5PLx0peXy2H7GvdsTLr3EvwE%2BkQIqnggSASFMO3TARrxwPH%2Br6qdRS0ngd0WQ%3D%3D&numOfRows=10&pageNo=1&base_date=20241028&base_time=0600&nx=61&ny=125 app listening on port 3000!"
  );
});
