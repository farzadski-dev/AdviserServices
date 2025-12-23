const express = require("express");
const router = express.Router({ mergeParams: true });

const AuthController = require("../../../AuthService/Controllers/AuthController");
const auth = new AuthController();

const TicketController = require("../../../controllers/TicketController");

router
	.route("/")
	.post(auth.protect, TicketController.createTicket)
	.get(TicketController.getAllTicketsOnThisRoom);

router
	.route("/:ticketId")
	.get(TicketController.getTicket)
	.delete(TicketController.deleteTicket);

router.put("/:ticketId/ticket-status", TicketController.updateTicketStatus);
router.put("/:ticketId/is-entered", TicketController.updateTicketIsEntered);

module.exports = router;
