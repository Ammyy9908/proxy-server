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
      url: `https://serpapi.com/search.json?engine=google&q=${q.replace("&", "%26")}&location=Delhi%2C+India&google_domain=google.co.in&gl=in&hl=en&tbm=shop&num=100&api_key=bd35b539b48cbca316f875077afbec267a47b507ebabf9e45fbf22e0647c5c79`,
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
