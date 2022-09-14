const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/search/:q", (req, res) => {
  const { q } = req.params;
  request(
    {
      url: `https://serpapi.com/search.json?engine=google&q=${q.replace("&", "%26")}&location=Delhi%2C+India&google_domain=google.co.in&gl=in&hl=en&tbm=shop&num=100&api_key=9b4131dd017c3f32678d9cd1bd0317191f46b9d4666a728786f5488ae300680c`,
    },
    (error, response, body) => {
      console.log(body)
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error });
      }

      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
