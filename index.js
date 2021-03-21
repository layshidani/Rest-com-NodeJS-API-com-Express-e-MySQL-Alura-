const customExpress = require('./config/customExpress')
const conection = require('./infra/conection')
const Tables = require('./infra/tables')

conection.connect((error) => {
  if (error) {
    console.warn('>> error', error)
  } else {
    console.log('>> conectado com sucesso')

    Tables.init(conection)

    const app = customExpress()

    app.listen(3000, () => console.log('>> servidor rodando na porta 3000'))
  }
})
