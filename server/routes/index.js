// При переходе по соответствующему пути будет выполняться обработка запроса
const Router = require('express')
const router = new Router()

const userRouter = require('./UserRouter');

router.use('/users', userRouter);

module.exports = router

/*const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)*/