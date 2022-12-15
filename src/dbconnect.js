const config = require("./dbconfig");
const sql = require("mssql");

async function getdata(PAC_REG) {
  try {
    let pool = await sql.connect(config);
    console.log("sql server connected!");
    let res = await pool
      .request()
      .query(
        `SELECT PAC_REG, PAC_NOME, PAC_NASC, PAC_NUMCPF FROM pac where PAC_REG = ${PAC_REG}`
      );
    let response = {};
    response.nome = res.recordsets[0][0].PAC_NOME.trim();
    response.data_nascimento = res.recordsets[0][0].PAC_NASC;
    response.cpf = res.recordsets[0][0].PAC_NUMCPF;
    response.reg = res.recordsets[0][0].PAC_REG;
    return response;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getdata: getdata,
};
