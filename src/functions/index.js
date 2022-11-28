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
