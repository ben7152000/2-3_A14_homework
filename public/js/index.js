// 複製按鈕
function copyHandler (id) {
  const url = document.querySelector(`#${id}`)
  window.getSelection().selectAllChildren(url)
  document.execCommand("Copy")
  alert("複製成功")
}

// 檢查input
let input = document.querySelector('.input')
const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
  const pattern = /^http:\/\/|https:\/\/|www\..{1,}\.com$/
  if (!input.value.match(pattern)) {
    alert(`網址格式錯誤 => ${input.value}`)
    input.value = ''
  }
})
