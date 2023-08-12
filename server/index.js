require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload') // Возможность хранить изображения на сервере
const path = require('path')
//const models = require('./models/models')
const router = require('./routes/index') // связующий роутер
const errorHandler = require('./middlewares/ErrorHandlingMiddleware') // Регистрируем Middleware

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors()) // запросы к серверу
app.use(express.json()) // приложение может работать с json
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(process.env.ROOT_API, router) // основной url по которому приложение будет обрабатывать пути (корень строки)
app.use(errorHandler) // обработка ошибок, ВСЕГДА последний Middleware

const start = async () => {
    try {
        await sequelize.authenticate() // Устанавливается подключение к БД
        await sequelize.sync() // Сверяет данные БД с нашими данными (корректность типов)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()