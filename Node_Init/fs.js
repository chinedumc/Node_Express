const fs = require('fs')

// const files = fs.readdirSync('./')
// console.log(files)

// fs.readdir('./', (err, files) => {
//   if(err) console.log('Error', err)
//   else console.log('Result', files)
// })

// Reading Files
// fs.readFile('./docs/textFile.txt', (err, data) => {
//   if(err){
//     console.log(err)
//   }
//   console.log(data.toString())
// })

// Writing Files
// fs.writeFile('./docs/textFile.txt', 'Learnt NodeJS', () => {
//   console.log('file was written ')
// })

// fs.writeFile('./docs/textFile2.txt', 'Learning NodeJS', () => {
//   console.log('new file created and text written')
// })

//directories
if(!fs.existsSync('./docs2')){
  fs.mkdir('./docs2', (err) => {
    if(err) {
      console.log(err)
    }
    // console.log('folder created')
    fs.writeFile('./docs2/textFile2.txt', 'Learned NodeJS', () => {
      console.log('created file and written')
    })
  })
} 
// else {
//   fs.rmdir('./docs2', (err) => {
//     if(err) {
//       console.log(err)
//     } 
//     console.log('folder deleted')
//   })
// }

//deleting files
if (fs.existsSync('./docs2/textFile3.txt')) {
  fs.unlink('./docs2/textFile3.txt', (err) => {
    if (err) {
      console.log(err)
    }
    console.log('file deleted')
  })
}

// reading and writing streams
const readStream = fs.createReadStream('./docs2/largeText.txt', {encoding: 'utf8'})
const writeStream = fs.createWriteStream('./docs2/largeText2.txt')
// readStream.on('data', (chunk) => {
//   console.log('---NEW CHUNK---')
//   console.log(chunk)

//   writeStream.write('\nNEW CHUNK\n')
//   writeStream.write(chunk)
// })

readStream.pipe(writeStream)
