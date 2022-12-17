// to convert a File type to base64 string to be saved in the database
// componenet which loads the images in the applciation //
export function getBase64(file, func) {
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => func(reader.result)
  reader.onerror = function (error) {
    console.log('Error: ', error)
  }
}

let colors = [
  '#FFE6AE',
  'rgb(255 220 241)',
  '#FFF1CB',
  '#E3FCEF',
  '#ECEDF2',
  '#D3ECFF',
]

export const getColor = (i) => {
  return colors[i % colors.length]
}
