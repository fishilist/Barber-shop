// Указываем методы запроса и функцию его обработки
const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/checkRoleMiddleware')

//router.post('/registration', checkRole('ADMIN'), UserController.registration)
router.get('/auth', authMiddleware, UserController.check) // Добавили промежуточный Middleware
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.put('/:id', UserController.update);
router.get('/', UserController.getAll)
router.get('/:id', UserController.getOne)
router.delete('/:id', UserController.delete);

module.exports = router
