const router = require('express').Router()
const userController = require('../controllers/users')

router.get("/", userController.indexUser)
router.post("/create", userController.createUser)
router.get("/:id", userController.userDetails)
router.put("/update/:id", userController.updateUser)
router.delete("/delete/:id", userController.deleteUser)
router.post("/bookFlight/:id", userController.bookFlight)
router.delete("/cancelFlight/:id", userController.cancelFlight)

module.exports = router