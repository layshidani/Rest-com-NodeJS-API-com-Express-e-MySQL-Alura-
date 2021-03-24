const connection = require('../infra/conection')
const fileUpload = require('../files/filesUpload')

class Pet {
  add(pet, res) {
    const sql = 'INSERT INTO Pets SET ?'

    fileUpload(pet.image, pet.name, (err, newPath) => {
      if (!err) {
        const newPet = {
          name: pet.name,
          image: newPath,
        }

        connection.query(sql, newPet, (err) => {
          err ? res.status(400).json(err) : res.status(200).json(newPet)
        })
      } else {
        res.status(400).json({ err })
      }
    })
  }
}

module.exports = new Pet()
