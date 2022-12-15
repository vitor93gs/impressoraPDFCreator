Configurando o .env:

*SQL_USER=""*

A chave SQL_USER deve ser o usuário habilitado no MS SQL Server para ler a database que contém a table "pac", exemplo: SQL_USER:"usuario_teste".

*SQL_USER_PASSWORD=""*
A chave SQL_USER_PASSWORD deve ser a senha do usuário habilitado no MS SQL Server para ler a database que contém a table "pac", exemplo: SQL_USER_PASSWORD:"senha_exemplo_123".

*SQL_DATABASE=""*

A chave SQL_DATABASE deve ser o nome da database que contém a table "pac", exemplo: SQL_DATABASE:"DB_QUE_CONTÉM_A_TABELA_PAC".

*SQL_SERVER=""*

A chave SQL_SERVER deve ser o nome do server MS SQL SERVER que contém a database que contém table "pac", exemplo: SQL_DATABASE:"DESKTOP-UI2LHOP".

*SQL_PORT=""*

A chave SQL_PORT deve ser a porta do server MS SQL SERVER, exemplo: SQL_DATABASE:"1244".

*PORT=""*

A chave PORT deve ser a porta na qual o executável vai escutar as requisições no host local, essa porta vai ser a porta que deve ser configurada no PDFCreator para mandar as requisições HTTP, exemplo: PORT:"8000".

*ID_USER=""*

A chave ID_USER deve ser uma chave específica para cada usuário do executável, exemplo: ID_USER="123".

*CHANNEL_NAME=""*

A chave CHANNEL_NAME deve ser uma chave específica para cada Tablet do usuário do executável, exemplo: CHANNEL_NAME="tablet_1".

*NOPAPER_URL=""*

A chave NOPAPER_URL deve ser a URL para a qual as requisições HTTP POST com os dados do paciente e o arquivo impresso vâo ser mandadas, exemplo: NOPAPER_URL="https://nopaper.com/post_nova_impressao".

*URL_TESTE=""*

A chave URL_TESTE deve ser a URL para qual será mandado uma requisição HTTP POST teste, sem ser feita nenhuma consulta a base de dados, para fins de teste. exemplo: URL_TESTE="http://localhost:8000/rota_teste".




Configurando o PDFCREATOR:

Após baixar o PDFCREATOR abra o programa, abra a aba "Perfis" no canto superior esquerdo.
Na aba Perfis abra a caixa "Salvar", no popup da opção Salvar, selecione a opção só salvar arquivos temporariamente, clique em "OK" e volte para a aba Perfis.
Novamente na aba Perfis, delete todas as ações, depois de deletar todas as ações, crie uma nova ação no botão "Adicionar ação +".
No popup de adicionar ação escolha HTTP (fica na coluna "Enviar"), depois crie uma nova conta HTTP, clicando no botão "+" ao lado direito da área de selecionar conta HTTP. Na criação de conta HTTP coloque na URL o seguinte: http://127.0.0.1:PORT/pdf (caso esteja em produção) ou http://127.0.0.1:PORT/pdfteste (caso você vá testar a requisição do executável, sem fazer consulta a base de dados), onde *PORT* é a chave PORT do .env. Clique em salvar, depois OK.
Salve as mudanças feitas na aba Perfis e a configuração do PDFCREATOR está feita.




Imprimindo arquivos pelo PDFCREATOR

Quando for fazer uma impressão, selecione como destino a impressora digital "PDFCreator", e mande salvar imprimir.
Uma tela de impressão do PDFCREATOR vai se abrir, no Nomedo_arquivo coloque o número do PAC_REG do paciente de uma das duas formas seguintes:

1- PAC_REG.pdf (exemplo: 2955.pdf)
2- PAC_REG-qualquer_outro_texto.pdf (exemplos: 2955-avaliação_física_08_mar_2022.pdf , 2955-avaliação fisica marcia conceição.pdf)

Caso o nome do arquivo não bata com esses formatos o executável retornará um erro.
Clique em salvar, você deve receber depois de alguns segundos a resposta OK do executável.