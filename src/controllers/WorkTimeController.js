const {Room, WorkTime} = require("../models");

const TAG = "app:WorkTimeController";
const myDebugger = require("../utils/debugger")(TAG);

const catchAsync = require("../utils/catchAsync");

exports.getAllWorkTimesIncludeRooms = catchAsync(async (request, response, next) => {
    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const allWorkTimes = await WorkTime.findAll({
            include: [{
                model: Room,
                as: "rooms"
            }],
            limit,
            offset: skip
        },
    );

    response.status(201).json({
        status: "success",
        data: {
            allWorkTimes,
        },
    });
});

exports.getOneWorkTimeIncludeRooms = catchAsync(async (request, response, next) => {
    const {workTimeId} = request.params;

    const workTime = await WorkTime.findAll({
        include: [
            {
                model: Room,
                as: "rooms"
            }
        ],
        where: {
            id: workTimeId
        }
    });

    response.status(200).json({
        status: "success",
        data: {
            workTime
        },
    });
});

exports.createWorkTime = catchAsync(async (request, response, next) => {
    const {date, title, description, picture, seo} = request.body;

    const workTime = await WorkTime.create({
        date,
        title,
        description,
        picture,
        seo
    });

    response.status(201).json({
        status: "success",
        data: {
            workTime
        },
    });

});

exports.deleteWorkTime = catchAsync(async (request, response, next) => {
    const {workTimeId} = request.params;

    await WorkTime.destroy({where: {id: workTimeId}});

    response.status(204).json({
        status: "success",
    });

});

exports.updateWorkTime = catchAsync(async (request, response, next) => {
    const {workTimeId} = request.params;
    const {title, description, picture, seo, date} = request.body;

    const updatedWorkTime = await WorkTime.update(
        {
            title, description, picture, seo, date
        },
        {where: {id: workTimeId}, returning: true}
    );

    response.status(200).json({
        status: "success",
        data: {
            workTime: {...updatedWorkTime[1]}["0"]
        }
    });
});

