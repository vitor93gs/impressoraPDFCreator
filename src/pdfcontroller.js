const fs = require("fs");
const dicer = require("dicer");
const sql = require("./dbconnect");
const axios = require("axios");
let urlTeste = process.env.URL_TESTE;
let noPaperUrl = process.env.NOPAPER_URL;
var pacienteTeste = {
  PAC_REG: 2955,
  PAC_NOME: "IRAILDES PIRES SANTOS",
  PAC_NASC: "1971-12-18T00:00:00.000Z",
  PAC_NUMCPF: "64810607534",
};
// `form-data` library gives us a similar API in Node.js to the `FormData` interface in the browser
const FormData = require("form-data");

function sendPDF(req, res) {
  try {
    const RE_BOUNDARY =
      /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i;
    let m;
    var filename = "";
    let writer = fs.createWriteStream("src/file.pdf");
    const form = new FormData();

    if (
      req.method === "POST" &&
      req.headers["content-type"] &&
      (m = RE_BOUNDARY.exec(req.headers["content-type"]))
    ) {
      const d = new dicer({ boundary: m[1] || m[2] });

      d.on("part", (p) => {
        console.log("Nova impressão!");
        p.on("header", (header) => {
          filename = header["content-disposition"][0];
          if (filename.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]) {
            filename = filename.match(
              /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
            )[1];
            if (
              filename.replaceAll('"', "").replace(".pdf", "").match(/^\d+$/)
            ) {
              filename = filename.replaceAll('"', "").replace(".pdf", "");
            } else {
              filename = filename.replaceAll('"', "");
              if (filename.split("-")[1] === undefined) {
                console.log(
                  "Nome dado à impressão não é só um número e não tem traço!"
                );
                return res.sendStatus(404);
              } else {
                filename = filename.split("-")[0];
                if (!filename.match(/^\d+$/)) {
                  console.log(
                    "Nome dado à impressão nao tem só numeros antes do traço!"
                  );
                  return res.sendStatus(404);
                }
              }
            }
          } else {
            return res.sendStatus(404);
          }
        });
        p.on("data", (data) => {
          if (!res.headersSent) {
            writer.write(data);
          }
        });
        p.on("end", () => {
          console.log("Fim da impressão.");
        });
      });
      d.on("finish", async () => {
        try {
          form.append("params", JSON.stringify(await sql.getdata(filename)));
          form.append("id_user", process.env.ID_USER);
          form.append("channel_name", process.env.CHANNEL_NAME);
          form.append("pdf", fs.createReadStream("src/file.pdf"));
          console.log("Requisição montada e sendo enviada...");
          let resposta = await axios({
            method: "post",
            url: noPaperUrl,
            data: form,
            headers: form.getHeaders(),
          });
          console.log("Resposta do servidor : " + resposta.status + ".");
          if (resposta.status === 200) {
            console.log("Arquivo enviado com sucesso.");
          }
          res.writeHead(200);
          res.end("Form submission successful!");
        } catch (error) {
          console.log(error);
        }
      });
      req.pipe(d);
    } else {
      res.writeHead(404);
      res.end();
    }
  } catch (error) {
    console.error(error);
  }
}

function sendPDFTeste(req, res) {
  try {
    const RE_BOUNDARY =
      /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i;
    let m;
    var filename = "";
    let writer = fs.createWriteStream("src/file.pdf");
    const form = new FormData();

    if (
      req.method === "POST" &&
      req.headers["content-type"] &&
      (m = RE_BOUNDARY.exec(req.headers["content-type"]))
    ) {
      const d = new dicer({ boundary: m[1] || m[2] });

      d.on("part", (p) => {
        console.log("Nova impressão!");
        p.on("data", (data) => {
          if (!res.headersSent) {
            writer.write(data);
          }
        });
        p.on("end", () => {
          console.log("Fim da impressão.");
        });
      });
      d.on("finish", async () => {
        try {
          form.append("parms", JSON.stringify(pacienteTeste));
          form.append("id_user", process.env.ID_USER);
          form.append("channel_name", process.env.CHANNEL_NAME);
          form.append("pdf", fs.createReadStream("src/file.pdf"));
          console.log("Requisição montada e sendo enviada...");
          let resposta = await axios({
            method: "post",
            url: urlTeste,
            data: form,
            headers: form.getHeaders(),
          });
          console.log("Resposta do servidor : " + resposta.status + ".");
          if (resposta.status === 200) {
            console.log("Arquivo enviado com sucesso.");
          }
          res.writeHead(200);
          res.end("Form submission successful!");
        } catch (error) {
          console.log(error);
        }
      });
      req.pipe(d);
    } else {
      res.writeHead(404);
      res.end();
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendPDF: sendPDF,
  sendPDFTeste: sendPDFTeste,
};
