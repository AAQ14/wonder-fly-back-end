const router = require('express').Router()
const userController = require('../controllers/users')

router.get("/", userController.indexUser)
router.post("/create", userController.createUser)
router.get("/:id", userController.userDetails)
router.put("/update/:id", userController.updateUser)
router.delete("/delete/:id", userController.deleteUser)

module.exports = router