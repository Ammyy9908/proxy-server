const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  request(
    {
      url: `https://serpapi.com/search.json?engine=google&q=${q}&location=Delhi%2C+India&google_domain=google.co.in&gl=in&hl=en&tbm=shop&num=100&api_key=286a9da99c5c9703897b9027a90cc452909618e671dbc42fc942869d2c4f1b34`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
