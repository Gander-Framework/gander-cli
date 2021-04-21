const fs = require('fs')
const yaml = require('js-yaml')
const path = require('path')

const utils = {
  display: (response, error) => {
    console.log('response: ', response)
    console.log('error: ', error)
  },

  sleep: milliseconds => {
    const date = Date.now()
    let currentDate = null
    do {
      currentDate = Date.now()
    } while (currentDate - date < milliseconds)
  },

  readConfig: () => {
    const config = path.resolve(__dirname, '../fleet-infrastructure.yaml')
    try {
      let fileContents = fs.readFileSync(config, 'utf8')
      let data = yaml.load(fileContents)
      return data
    } catch (error) {
      console.log(error)
    }
  },

  writeConfig: data => {
    let yamlStr = yaml.dump(data)
    fs.writeFileSync('fleet-infrastructure.yaml', yamlStr, 'utf8')
  },
}

module.exports = utils
