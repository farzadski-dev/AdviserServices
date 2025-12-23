const express = require("express");
const router = express.Router({ mergeParams: true });

const ticketRouter = require("./ticketRoutes");

router.use("/:roomId/tickets", ticketRouter);

const AuthController = require("../../../AuthService/Controllers/AuthController");
const auth = new AuthController();

const RoomController = require("../../../controllers/RoomController");

router
	.route("/")
	.post(auth.protect, auth.allowTo("admin"), RoomController.createRoom)
	.get(RoomController.getAllRooms);

router
	.route("/:roomId")
	.get(RoomController.getRoom)
	.put(auth.protect, auth.allowTo("admin"), RoomController.updateRoom)
	.delete(auth.protect, auth.allowTo("admin"), RoomController.deleteRoom);

router.post(
	"/:roomId/work-times/:workTimeId",
	RoomController.addThisRoomToThisWorkTime
);

module.exports = router;
