class Tables {
  init(conection) {
    this.conection = conection

    console.log('-> Tabelas foram chamadas')
    this.createAttendance()
  }

  createAttendance() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Attendance (id int NOT NULL AUTO_INCREMENT,
      client varchar(50) NOT NULL,
      pet varchar(20),
      service varchar(20) NOT NULL,
      creationDate datetime NOT NULL,
      date datetime NOT NULL,
      status varchar(20) NOT NULL,
      observations text,
      PRIMARY KEY(id))
    `

    this.conection.query(sql, (error) => {
      if (error) {
        console.warn('error', error)
      } else {
        console.log('Tabela ATTENDANCE criada com sucesso!')
      }
    })
  }
}

module.exports = new Tables()
