/* --------------------------- Init some functions -------------------------- */
// Saving 2d array to csv
function arrayToCsv(data) {
  return data
    .map(
      (row) =>
        row
          .map(String) // convert every value to String
          .map((v) => v.replaceAll('"', '""')) // escape double colons
          .map((v) => `"${v}"`) // quote it
          .join(',') // comma-separated
    )
    .join('\r\n') // rows starting on new lines
}

// Download data
function downloadBlob(content, filename, contentType) {
  // Create a blob
  var blob = new Blob([content], { type: contentType })
  var url = URL.createObjectURL(blob)

  // Create a link to download it
  var pom = document.createElement('a')
  pom.href = url
  pom.setAttribute('download', filename)
  pom.click()
}

/* ------------------------ Get the data and download ----------------------- */
const tables = document.getElementsByTagName('table')

let allData = []

for (let table of tables) {
  let data = []

  const cells = table.getElementsByTagName('td')

  for (let cell of cells) {
    data.push(cell.textContent.replace(/(\r\n|\n|\r)/gm, '').trim())
  }
  allData.push(data)
}

let csv = arrayToCsv(allData)
// downloadBlob(csv, 'export.csv', 'text/csv;charset=utf-8;')
