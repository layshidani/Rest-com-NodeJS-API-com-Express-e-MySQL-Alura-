const { default: axios } = require('axios')
const moment = require('moment')
const conection = require('../infra/conection')

class Attendance {
  add(attendance, res) {
    const creationDate = moment().format('YYYY-MM-DD HH:mm:ss')
    const date = moment(attendance.date, 'DD/MM/YYYY').format(
      'YYYY-MM-DD HH:mm:ss'
    )

    const isValidDate = moment(date).isSameOrAfter(creationDate)
    const isValidName = attendance.client.lenght >= 3

    const validations = [
      {
        name: 'date',
        msg: 'Data de agendamento deve ser maior ou igual a hoje',
        valid: isValidDate,
      },
      {
        name: 'client',
        msg: 'Nome deve ter no mínimo 3 caracteres',
        valid: isValidName,
      },
    ]

    const errors = validations.filter((field) => field.valid)
    const hasErrors = errors.lenght

    if (hasErrors) {
      res.status(400).json(errors)
    } else {
      const sql = 'INSERT INTO Attendance SET ?'
      const attendanceDated = { ...attendance, creationDate, date }
      const id = res.id

      conection.query(sql, attendanceDated, (err, result) => {
        err
          ? res.status(400).json(err)
          : res.status(201).json({ attendanceDated })
      })
    }
  }

  list(res) {
    const sql = 'SELECT * FROM attendance'

    conection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result)
    })
  }

  searchById(id, res) {
    const sql = `SELECT * FROM attendance WHERE id=${id}`

    conection.query(sql, async (err, result) => {
      const selectedAttendance = result[0]
      const cpf = selectedAttendance.client

      if (err) {
        res.status(400).json(err)
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)

        selectedAttendance.client = data

        res.status(200).json(selectedAttendance)
      }
    })
  }

  update(id, data, res) {
    const sql = 'UPDATE attendance SET ? WHERE id=?'

    if (data.date) {
      data.date = moment(data.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }

    conection.query(sql, [data, id], (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json({ ...data, id })
    })
  }

  delete(id, res) {
    const sql = 'DELETE FROM attendance WHERE id=?'

    conection.query(sql, id, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json({ id })
    })
  }
}

module.exports = new Attendance()
