const router = require('express').Router()
const flightController = require('../controllers/flights')

router.get('/', flightController.flightIndex)
router.post('/add', flightController.addFlight)
router.get('/:id', flightController.flightDetails)
router.put('/update/:id', flightController.updateFlight)
router.delete('/delete/:id', flightController.deleteFlight)

module.exports = router