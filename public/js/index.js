// 檢查input
document.querySelector('.generate').onclick = () => {
  const pattern = /^http:\/\/|https:\/\/|www\..{1,}\.com$/
  let input = document.querySelector('.input')
  if (!input.value.match(pattern)) {
    alert(`網頁格式錯誤    ===>    "${input.value}"`)
  }
}

// 複製按鈕
document.querySelector('.copy').onclick = () => {
  const link = document.querySelector('.link')
  window.getSelection().selectAllChildren(link)
  document.execCommand("Copy")
  alert("複製成功")
}
