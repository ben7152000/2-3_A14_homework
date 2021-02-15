# 短網址產生器 (Url-Shortener)

## 環境建置與需求 (Prerequisites)
1. Node.js : v14.15.4
2. Express : v4.17.1
3. Nodemon : v2.0.7
4. Body-Parser: v1.19.0
5. Express-Handlebars: v5.2.0
6. Mongoose: v5.11.16

## 安裝與執行步驟 (Installation and Execution)
1. 將專案複製到本機 (兩種方法)
> (1) 打開終端機輸入 
`git clone https://github.com/ben7152000/2-3_A14_homework.git`</br>
(2) 點選 download ZIP 下載

2. 進入專案資料夾安裝工具包
> 打開終端機輸入
`npm install`

3. 執行種子
> 打開終端機輸入
`npm run seed`

4. 執行專案
> 打開終端機輸入 
`npm run dev`

4. 使用瀏覽器瀏覽</br>
> 打開瀏覽器在網址列輸入 localhost:3000 即可瀏覽

## 功能描述 (Features)
1. 可以在輸入框內，輸入想加密的網址
2. 完成後會跳轉至成功加密網頁，會在網址後方加入5個亂碼 (0-9;A-Z;a-z)
3. 可以點擊複製鈕，複製該網址