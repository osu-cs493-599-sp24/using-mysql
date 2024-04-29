const { Router } = require('express')
const { ValidationError } = require("sequelize")

const Lodging = require("../models/lodging")
const Reservation = require("../models/reservation")

const router = Router()

router.get('/', async function (req, res, next) {
    let page = parseInt(req.query.page) || 1
    page = page < 1 ? 1 : page
    const pageSize = 10
    const offset = (page - 1) * pageSize

    const result = await Lodging.findAndCountAll({
        limit: pageSize,
        offset: offset,
        // where: { zip: "97330" }
    })
    res.status(200).send({
        lodgings: result.rows,
        count: result.count
    })
})

router.post('/', async function (req, res, next) {
    try {
        const lodging = await Lodging.create(req.body, [
            "name",
            "description",
            "street",
            "city",
            "state",
            "zip",
            "price"
        ])
        console.log("  -- lodging:", lodging.toJSON())
        res.status(201).send({
            id: lodging.id
        })
    } catch (e) {
        if (e instanceof ValidationError) {
            res.status(400).send({
                err: e.message
            })
        } else {
            next(e)
        }
    }
})

router.get('/:id', async function (req, res, next) {
    const id = req.params.id
    const lodging = await Lodging.findByPk(id, {
        include: Reservation
    })
    if (lodging) {
        // const reservations = await lodging.getReservations()
        // console.log(" -- reservations:", reservations)
        res.status(200).send(lodging)
    } else {
        next()
    }
})

router.patch('/:id', function (req, res, next) {
    const id = req.params.id
    res.status(200).send({})
})

router.delete('/:id', function (req, res, next) {
    const id = req.params.id
    res.status(204).send()
})

module.exports = router
