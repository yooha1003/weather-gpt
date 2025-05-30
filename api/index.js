const express = require("express");
const request = require("request");
const app = express();

const baseApiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";

const forwardRequest = (endpoint, req, res) => {
    const { serviceKey, ...query } = req.query;
    const options = {
        url: `${baseApiUrl}/${endpoint}`,
        qs: { serviceKey, ...query },
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.setHeader("Content-Type", "application/xml;charset=utf-8");
            res.send(body);
        } else {
            res.status(response?.statusCode || 500).send(error || "Internal Error");
            console.error("API error:", response?.statusCode, error);
        }
    });
};

app.get("/ultra-srt-ncst", (req, res) => forwardRequest("getUltraSrtNcst", req, res));
app.get("/ultra-srt-fcst", (req, res) => forwardRequest("getUltraSrtFcst", req, res));
app.get("/vilage-fcst", (req, res) => forwardRequest("getVilageFcst", req, res));
app.get("/fcst-version", (req, res) => forwardRequest("getFcstVersion", req, res));

app.listen(3000, () => {
    console.log("서버 실행 중: http://localhost:3000/ultra-srt-ncst?serviceKey=Hk%2FN%2BBOSJC66biuLuC5Xa9aZV5PLx0peXy2H7GvdsTLr3EvwE%2BkQIqnggSASFMO3TARrxwPH%2Br6qdRS0ngd0WQ%3D%3D");
});
