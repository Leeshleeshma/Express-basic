import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Hello from Express inside a Dev Container!" });
});

app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

app.get("/leeshma", (req, res) => {
  res.status(200).send("leeshma is awesome!");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});