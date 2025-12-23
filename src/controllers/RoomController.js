const {
    User,
    Room,
    Category,
    WorkTime,
    WorkTimeRoom
} = require("../models");


const TAG = "app:RoomController";
const myDebugger = require("../utils/debugger")(TAG);

const catchAsync = require("../utils/catchAsync");
const Helper = require("../utils/Helper");


exports.getAllRooms = catchAsync(async (request, response, next) => {

    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const allRooms = await Room.findAll({
            include: [
                {
                    model: Category,
                    as: "belongs_category",
                }, {
                    model: User,
                    as: "belongs_user",
                    attributes: {exclude: ["password"]}
                }
            ],
            limit,
            offset: skip
        }
    );

    response.status(200).json({
        status: "success",
        data: {
            allRooms: allRooms,
        },
    });
});

exports.getRoom = catchAsync(async (request, response, next) => {
    const {roomId} = request.params;

    const room = await Room.findAll(
        {
            where: {
                id: roomId
            },
            include: [
                {
                    model: Category,
                    as: "belongs_category",
                }, {
                    model: User,
                    as: "belongs_user",
                    attributes: {exclude: ["password"]}
                }, {
                    model: WorkTime,
                    as: "workTimes"
                }
            ]
        }
    );

    response.status(200).json({
        status: "success",
        data: {
            room,
        },
    });

});

exports.createRoom = catchAsync(async (request, response, next) => {
    const {
        userId,
        title,
        description,
        picture,
        price,
        max_ticket,
        seo,
        categoryId,
        commission,
        start_time,
        end_time
    } = request.body;

    const {workTimeId} = request.params;

    // in UTM start_time & end_time are in the same object but in roomModel are seperated
    // price_for_ticket is repetition of ticket so should be remove from RoomModel

    const room = await Room.create({
        title,
        description,
        picture,
        price,
        userId,
        max_ticket,
        seo,
        categoryId,
        commission,
        start_time,
        end_time,
    });

    let work_time;
    if (workTimeId !== undefined) {
        work_time = await WorkTimeRoom.create({
            workTimeId,
            roomId: room.id
        });
    }

    response.status(201).json({
        status: "success",
        data: {
            room,
            work_time
        }
    });
});

exports.addThisRoomToThisWorkTime = catchAsync(async (request, response, next) => {
    const {roomId, workTimeId} = request.params;

    const work_time = await WorkTimeRoom.create({
        roomId,
        workTimeId
    });

    response.status(200).json({
        status: "success",
        data: {
            work_time
        }
    });
});

exports.updateRoom = catchAsync(async (request, response, next) => {
    const {
        title,
        description,
        price,
        max_ticket,
        seo,
        categoryId,
        commission,
        start_time,
        end_time
    } = request.body;

    const {roomId} = request.params;


    const updatedRoom = await Room.update(
        {
            title,
            description,
            price,
            max_ticket,
            seo,
            categoryId,
            commission,
            start_time,
            end_time,
        },
        {
            where: {id: roomId},
            returning: true
        }
    );


    response.status(200).json({
        status: "success",
        room: {...updatedRoom[1]}["0"]
    });
});

exports.deleteRoom = catchAsync(async (request, response, next) => {
    const {roomId} = request.params;

    await Room.destroy({where: {id: roomId}});

    response.status(204).json({
        status: "success",
    });
});
