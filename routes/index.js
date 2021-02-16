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

// 另一種產生亂數方法
// function randomChar () {
//   const n = Math.floor(Math.random () * 62)
//   const randomCharTable = ['0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ']
//   return randomCharTable[n]
// }

// 隨機產生5個亂數 => 0 - 9, A - Z, a - z
function randomString (length) { 
  let string = ''
  while (string.length < length) string += randomChar ()
  return string
}

// 比對網址格式是否正確 否則回傳錯誤
function checkUrl (req, res, next) {
  const url = req.body.url
  const pattern = /^http:\/\/|https:\/\/|www\..{1,}\.com$/
  if (!url.match(pattern)) {
    console.log('網址輸入錯誤')
    res.redirect('/')
    return
  }
  next()
}

router.get('/', (req, res) => {
  res.render('index')
})

  // 比對輸入的url是否在資料庫內
  // 有的話直接取出並在後方加密
  // 將取出的陣列放入arr陣列中
  // 判斷arr陣列是否值
  // 否則在資料庫建立新的url並在後方加密
router.post('/', checkUrl ,async (req, res) => {
  const url = req.body.url
  let newUrl
  const arr = []
  const baseUrl = process.env.NODE_ENV ? 'https://blooming-taiga-19733.herokuapp.com' : 'localhost:3000'

  await Url.find()
    .lean()
    .exec()
    .then(result => {
      result.find(element => {
        if (element.originUrl === url) {
          arr.push(element)
          return newUrl = `${baseUrl}/${element.path}`
        }
      })
      if (arr[0] === undefined) {
        const path = randomString(5)
        Url.create({
          originUrl: url,
          path
        })
        return newUrl = `${baseUrl}/${path}`
      }
    })
    .then(() => {
      if (url.match(/^http:\/\/|https:\/\//)) {
        res.render('url', { newUrl, url })
      } else {
        res.render('url', {newUrl, url: `http://${url}`})
      }
  })
    .catch(err => {
      res.render('requestError')
      console.log(err)
    })
})

router.get('/:path', (req, res) => {
  const path = req.params.path
  Url.find({path})
    .then(element => {
      if (!element[0]) {
        res.render('error')
      } else {
        const originUrl = element[0].originUrl
        if (originUrl.match(/^http:\/\/|https:\/\//)) {
          res.redirect(originUrl)
        } else {
          res.redirect(`http://${originUrl}`)
        }
      }
    })
    .catch(err => {
      res.render('requestError')
      console.log(err)
    })
})

module.exports = router