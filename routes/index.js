const express = require('express')
const router = express.Router()
const Url = require('../models/url')

// 隨機產生字元
function randomChar () {
  const n = Math.floor(Math.random () * 62)
  if(n < 10) return n // 0 - 9
  if(n < 36) return String.fromCharCode (n + 55) // 65 - 90 => A - Z
  return String.fromCharCode(n + 61) // 97 - 122 => a - z
}

// 隨機產生5個亂數 => 0 - 9, A - Z, a - z
function randomString (length) { 
  let string = ''
  while (string.length < length) string += randomChar ()
  return string
}

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  const url = req.body.url
  const baseUrl = process.env.NODE_ENV ? 'https://blooming-taiga-19733.herokuapp.com' : 'localhost:3000'
  let newUrl

  // 比對網址格式是否正確 否則回傳錯誤
  const pattern = /^http:\/\/|https:\/\/|www\..{1,}\.com$/
  if (!url.match(pattern)) {
    console.log('網址輸入錯誤')
    res.render('index')
    return
  }

  // 比對輸入的url是否在資料庫內
  // 有的話直接取出並在後方加密
  // 否則在資料庫建立新的url並在後方加密
  await Url.find()
    .lean()
    .exec()
    .then(result => {
      result.find(element => {
        if (url === element.originUrl) {
          return newUrl = `${baseUrl}/${element.path}`
        } else {
          const path = randomString(5)
          Url.create({
            originUrl: url,
            path
          })
          return newUrl = `${baseUrl}/${path}`
        }
      })
    })
    .then(() => res.render('url', { newUrl }))
    .catch(err => console.log(err))
})

module.exports = router