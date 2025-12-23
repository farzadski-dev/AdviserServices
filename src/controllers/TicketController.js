const TAG = "app:TicketController";
const myDebugger = require("../utils/debugger")(TAG);

const {Room, Ticket} = require("../models");
const catchAsync = require("../utils/catchAsync");
const Helper = require("../utils/Helper");

exports.createTicket = catchAsync(async (request, response, next) => {
    const {seo} = request.body;
    const {roomId} = request.params;
    const userId = request.user.id;

    const room = await Room.findByPk(roomId);

    if (!room) {
        return response.status(404).json({
            status: "failed",
            errorMessage: `This room with this id: ${roomId} is not exist!`
        });
    }

    if (!Helper.isRoomReachedHalfTime(room.start_time, room.end_time)) {
        return response.status(409).json({
            status: "failed",
            errorMessage: `This room with this id: ${roomId} closed soon, you can't get ticket on this room!`
        });
    }


    const tickets = await Ticket.findAll({
        where: {
            roomId
        }
    });

    if (isThisUserAlreadyHaveATicket(tickets, userId)) {
        return response.status(409).json({
            status: "failed",
            errorMessage: `This user already have a ticket for this room with this id: ${roomId}`
        });
    }

    if (tickets.length === Number(room.max_ticket)) {
        return response.status(409).json({
            status: "failed",
            errorMessage: `There is no more ticket available on this room with this id: ${roomId}!`
        });
    }

    const ticket = await Ticket.create({
        seo,
        roomId,
        userId,
        ticket_number: tickets.length + 1
    });

    response.status(201).json({
        status: "success",
        dat: {
            ticket
        }
    });

});

exports.getAllTicketsOnThisRoom = catchAsync(async (request, response, next) => {
    const {roomId} = request.params;

    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const tickets = await Ticket.findAll({
        where: {
            roomId
        },
        limit,
        offset: skip
    });

    response.status(200).json({
        status: "success",
        data: {
            tickets
        },
    });
});

exports.getTicket = catchAsync(async (request, response, next) => {
    const {ticketId} = request.params;

    const ticket = await Ticket.findAll({
        include: [
            {
                model: Room,
                as: "belongs_room",
            }
        ],
        where: {
            id: ticketId
        }

    });

    response.status(200).json({
        status: "success",
        data: {
            ticket: ticket[0]
        },
    });
});

exports.updateTicketAllSpecs = catchAsync(async (request, response, next) => {
    const {
        ticket_id,
        room_id,
        user_id,
        ticket_number,
        status,
        is_entered,
        seo
    } = request.body;

    await Ticket.update(
        {
            room_id,
            user_id,
            ticket_number,
            status,
            is_entered,
            seo,
        },
        {where: {ticket_id: ticket_id}, returning: true}
    );

    response.status(201).json({
        status: "success",
    });
});

exports.updateTicketStatus = catchAsync(async (request, response, next) => {
    const {status} = request.body;
    const {ticketId} = request.params;


    const updatedTicketStatus = await Ticket.update(
        {
            status,
        },
        {where: {id: ticketId}, returning: true}
    );

    response.status(200).json({
        status: "success",
        data: {
            ticket: {...updatedTicketStatus[1]}["0"]
        }
    });
});

exports.updateTicketIsEntered = catchAsync(async (request, response, next) => {
    const {is_entered} = request.body;
    const {ticketId} = request.params;
    const updatedTicket = await Ticket.update(
        {
            is_entered,
        },
        {
            where: {id: ticketId},
            returning: true
        }
    );

    response.status(201).json({
        status: "success",
        data: {
            ticket: {...updatedTicket[1]}["0"]
        }
    });
});

exports.deleteTicket = catchAsync(async (request, response, next) => {
    const {ticketId} = request.params;

    await Ticket.destroy({where: {id: ticketId}});

    response.status(204).json({
        status: "success",
    });
});

function isThisUserAlreadyHaveATicket(tickets, userId) {
    let isThisUserHaveATicket = false;
    tickets.map(t => {
        if (t.userId === userId)
            isThisUserHaveATicket = true;
    });

    return isThisUserHaveATicket;
}
