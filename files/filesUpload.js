// fileSystem
const fs = require('fs')
const path = require('path')

// fs.read('./assets/dog (1).jpg', (err, buffer) => {
//   console.log('img foi bufferizada', buffer)

//   fs.writeFile('./assets/dog (4).jpg', buffer, err => {
//     console.log('img foi escrita');
//   })
// })

module.exports = (filePath, fileName, callbackImg) => {
  const validType = ['jpg', 'png', 'jpeg']
  const type = path.extname(filePath)
  const isValidType = validType.indexOf(type.substring(1)) !== -1

  if (isValidType) {
    const newFilePath = `./assets/imgs/${fileName}${type}`

    fs.createReadStream(filePath)
      .pipe(fs.createWriteStream(newFilePath))
      .on('finish', () => callbackImg(false, newFilePath))
  } else {
    const err = 'Extensão do arquivo inválida'
    callbackImg(err)
    console.log('Erro. Extensão do arquivo inválida')
  }
}
