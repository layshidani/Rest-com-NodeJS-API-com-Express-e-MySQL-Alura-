class Tables {
  init(conection) {
    this.conection = conection

    console.log('-> Tabelas foram chamadas')

    this.createAttendance()
    this.createPets()
  }

  createAttendance() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Attendance (id int NOT NULL AUTO_INCREMENT,
      client varchar(11) NOT NULL,
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

  createPets() {
    const query = `CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, name varchar(50), image varchar(200), PRIMARY KEY (id))`

    this.conection.query(query, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Tabela PETS criada com sucesso!')
      }
    })
  }
}

module.exports = new Tables()
