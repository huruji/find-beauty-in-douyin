const https = require('https');
const querystring = require('querystring');
const { base64Sync } = require('base64-img')
const { api_key, api_secret } = require('./config')


module.exports = function (file, scoreLevel = 75) {
  const base64 = base64Sync(file)
  const data = querystring.stringify({
    api_key,
    api_secret,
    image_base64: base64,
    return_attributes: 'gender,age,beauty'
  })

  const options = {
    host: 'api-cn.faceplusplus.com',
    path: '/facepp/v3/detect',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        let b = {}
        try {
          b = JSON.parse('' + d)
        } catch (err) {
          resolve({
            shouldFollow: false
          })
          return
        }

        const faces = b.faces || []

        let shouldFollow = false
        let score = 0

        for (let i = 0; i < faces.length; i++) {
          const attrs = faces[i].attributes
          score = attrs.beauty.male_score
          if (attrs.gender.value == 'Female' && attrs.beauty.male_score >= scoreLevel) {
            shouldFollow = true
            break
          }
        }
        resolve({
          shouldFollow,
          score
        })
      })

    });
    req.on('error', (e) => {
      resolve(false)
    });
    req.write(data)
    req.end()
  })
}
