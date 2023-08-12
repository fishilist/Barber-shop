const bcrypt = require('bcrypt') // Шифрует данные
const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiError');
const {User} = require('../tables/tables') // Импортируем нужный тип из БД

const generateJwt = (user) => {
    let data = {}
    let keys = ['id', 'name', 'surname', 'email', 'phone']
    for (const key of keys) {
        data[key] = user[key]
    }
    let secretKey = process.env.SECRET_KEY;
    let options = {
        expiresIn: '24h' // Сколько живет токен
    }
    let callback = (err, asyncToken) => {
        if (err) throw err;
        console.log("ALARM!", asyncToken);
    }
    return jwt.sign(data, secretKey, options)
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, name, surname, phone} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5) // Шифруем пароль 5 раз и сохраняем его
        const user = await User.create({email, role, password: hashPassword, name, surname, phone}) // Создаем объект пользователя
        const token = generateJwt(user) // Генерируем токен для пользователя
        return res.json({token}) // Отправляем токен пользователю
        //const basket = await Basket.create({userId: user.id}) // Создаем под пользователя корзину с товарами
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        //const token = generateJwt(user.id, user.email, user.role)
        const token = generateJwt(user);
        return res.json({token})
    }

    async delete(req, res, next) {
        const {id} = req.params
        const user = await User.findOne({where: {id}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        await User.destroy({where: {id}})
        return res.json(`Пользователь успешно удален`)
    }

    async update(req, res, next) {
        let {id} = req.params;
        let properties = req.body;
        const user = await User.findOne({where: {id}});
        const update = await user.update(properties);
        return res.json(update)
    }

    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const user = await User.findOne({where: {id}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        return res.json(user)
    }

    async check(req, res, next) {
        const token = generateJwt(req.user)
        // const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name, req.user.surname, req.user.phone)
        return res.json({token})
    }
}

module.exports = new UserController()
