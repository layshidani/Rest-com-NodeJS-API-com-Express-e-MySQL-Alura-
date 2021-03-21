const Attendance = require('../models/attendaces')

module.exports = (app) => {
  app.get('/atendimentos', (req, res) => Attendance.list(res))

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Attendance.searchById(id, res)
  })

  app.post('/atendimentos', (req, res) => {
    const attendance = req.body

    Attendance.add(attendance, res)
  })

  // forma nao semantica app.post('edit/atendimentos/:id')
  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body

    Attendance.update(id, data, res)
  })

  // forma nao semantica app.post('delete/atendimentos/:id')
  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Attendance.delete(id, res)
  })
}
