require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const myModule = require("./pdfcontroller");
const sendPDF = myModule.sendPDF;
const sendPDFTeste = myModule.sendPDFTeste;

// test sql connection

app.get("/test", async (req, res) => {
  let string = "2956";
  let result = await sql.getdata(string);
  console.log(result);
  res.send("ok");
});

app.post("/pdf", async (req, res) => {
  sendPDF(req, res);
});

app.post("/pdfteste", async (req, res) => {
  sendPDFTeste(req, res);
});

app.listen(port, () => {
  console.log(`Aplicativo rodando na porta ${port}`);
});

process.on("uncaughtException", (err) => {
  console.error(`there was an uncaught error: ${err}`);
  process.exit;
});
