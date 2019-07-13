const { exec } = require('child_process')
const path = require('path')

let currentDeviceName = ''
let isVerbose = false

const call = (code) => {
  return new Promise((resolve, reject) => {
    const command = `adb ${currentDeviceName ? `-s ${currentDeviceName}` : ''} ${code}`

    if (isVerbose) console.log(command, '\n')

    exec(command, (err, stdout, stderr) => {
      if (err) reject(new Error(err + ''))
      resolve(stdout)
    })
  })
}


const rawDevices = () => call('devices')

const devices = async () => {
  return (await rawDevices())
    .split(/\n/)
    .map(line => line.split('\t'))
    .filter(line => line.length > 1)
    .map(device => ({ name: device[0].trim(), status: device[1].trim() }))
}

const use = (device) => currentDeviceName = device.name

const verbose = (value) => isVerbose = value


const touch = (x, y) => call(`shell input tap ${x} ${y}`)

const swipe = (x1, y1, x2, y2, ms = 200) => call(`shell input swipe ${x1} ${y1} ${x2} ${y2} ${ms} `)

const screenshot = (filename = 's.png', localSavePath = './') => call(`shell screencap -p > ${path.resolve(localSavePath, filename)}`)




module.exports = {
  devices,
  use,
  verbose,
  touch,
  swipe,
  screenshot
}
