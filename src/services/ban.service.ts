import { BadRequestError } from "../utils/errors";
import Ban from "../models/ban.model";
const { Op } = require("sequelize");
import { map } from "lodash";
import { NOTI_TYPE } from "../constants/notification";
import NotificationService from "./notification.service";
import Admin from "../models/admin.model";
import ActivityServices from "./activity.service";

/**
 * To create a new class
 */
const list = async (ctx) => {
  try {
    const res = await Ban.findAll({});
    return res;
  } catch (error) {
    throw new BadRequestError({
      field: "id",
      message: "Failed to create this item.",
    });
  }
};

const createBan = async (ctx, payload) => {
  const adminId = ctx?.admin?.id;
  const { userId, type, banDate, eventId, postId, commentId } = payload;
  // const banDate = new Date(Date.now());
  let unBanDate;
  try {
    if (type === "1-1" || type === "2-1" || type === "3-1") {
      unBanDate = new Date(banDate + 1 * 24 * 60 * 60 * 1000);
    } else if (type === "1-2" || type === "2-2" || type === "3-2") {
      unBanDate = new Date(banDate + 3 * 24 * 60 * 60 * 1000);
    } else if (type === "1-3" || type === "2-3" || type === "3-3") {
      unBanDate = new Date(banDate + 5 * 24 * 60 * 60 * 1000);
    } else if (type === "1-4" || type === "2-4" || type === "3-4") {
      unBanDate = new Date(banDate + 7 * 24 * 60 * 60 * 1000);
    }
    const res = await Ban.create({
      userId: userId,
      type: type,
      banDate: banDate,
      unbanDate: unBanDate,
      banBy: adminId,
      eventId: eventId,
    });

    let notiType;
    if (type.includes("1-")) {
      notiType = NOTI_TYPE.BanPost;
    } else if (type.includes("2-")) {
      notiType = NOTI_TYPE.BanRegister;
    } else if (type.includes("3-")) {
      notiType = NOTI_TYPE.BanComment;
    }

    const adminName = await Admin.findOne({
      where: {
        id: adminId,
      },
      attributes: ["name"],
      raw: true,
    });

    const log = await ActivityServices.create({
      userId: adminId,
      userName: adminName,
      action: notiType,
      content: `ban user ${userId} with type: ${type}`,
    });

    const notification = {
      userId: userId,
      postId: postId,
      commentId: commentId,
      eventId: eventId,
      notificationType: notiType,
      fromUserId: adminId,
      fromUserName: adminName,
    };
    await NotificationService.create(notification);

    return { status: 200 };
  } catch (error) {
    throw new BadRequestError({
      field: "id",
      message: "Failed to create this item.",
    });
  }
};

// const deleteBan = async () => {
//   const today = new Date(Date.now());
//   try {
//     const listBan = await Ban.findAll({
//       where: {
//         unbanDate: {
//           [Op.gt]: today,
//         }
//       },
//       attributes: ["id"],
//       raw: true,
//     });

//     const res = await Promise.all(
//       map(listBan, async(ban) => {
//         await Ban.destroy({
//           where: {
//             id: ban.id,
//           }
//         })
//       })
//     )
//   } catch (error) {
//     return error;
//   }
// }

const updateBan = async (ctx, payload) => {
  const adminId = ctx?.admin?.id;
  const { userId, type, eventId } = payload;
  const today = new Date(Date.now());
  // const banDate = new Date(Date.now());
  try {
    const ban = await Ban.findOne({
      where: {
        userId,
        unbanDate: {
          [Op.gt]: today,
        },
        type,
      },
      attributes: ["id", "banDate", "postId", "commentId"],
      raw: true,
    });
    let tempUnBanDate;
    if (ban !== null) {
      if (type === "1-1" || type === "2-1" || type === "3-1") {
        tempUnBanDate = new Date(ban.banDate + 1 * 24 * 60 * 60 * 1000);
      } else if (type === "1-2" || type === "2-2" || type === "3-2") {
        tempUnBanDate = new Date(ban.banDate + 3 * 24 * 60 * 60 * 1000);
      } else if (type === "1-3" || type === "2-3" || type === "3-3") {
        tempUnBanDate = new Date(ban.banDate + 5 * 24 * 60 * 60 * 1000);
      } else if (type === "1-4" || type === "2-4" || type === "3-4") {
        tempUnBanDate = new Date(ban.banDate + 7 * 24 * 60 * 60 * 1000);
      }
      const res = await Ban.update(
        {
          unbanDate: tempUnBanDate,
          updateBy: adminId,
          eventId: eventId,
        },
        {
          where: {
            id: ban.id,
          },
        }
      );

      const adminName = await Admin.findOne({
        where: {
          id: adminId,
        },
        attributes: ["name"],
        raw: true,
      });

      const log = await ActivityServices.create({
        userId: adminId,
        userName: adminName,
        action: type,
        content: `update ban user ${userId} type: ${type}`,
      });

      let notiType;
      if (type.includes("1-")) {
        notiType = NOTI_TYPE.UpdateBanPost;
      } else if (type.includes("2-")) {
        notiType = NOTI_TYPE.UpdateBanRegister;
      } else if (type.includes("3-")) {
        notiType = NOTI_TYPE.UpdateBanComment;
      }

      const notification = {
        userId: userId,
        postId: ban.postId,
        commentId: ban.commentId,
        eventId: eventId,
        notificationType: notiType,
        fromUserId: adminId,
        fromUserName: adminName,
      };
      await NotificationService.create(notification);

      return { status: 200 };
    } else {
      return "Ban expired!!!";
    }
  } catch (error) {
    throw new BadRequestError({
      field: "id",
      message: "Failed to create this item.",
    });
  }
};

const getUserStatusInEvent = async (userId, eventId) => {
  try {
    const banUserInEvent = await Ban.findAll({
      where: {
        userId,
        eventId,
      },
      attributes: ["type", "unbanDate"],
      raw: true,
    });
    return banUserInEvent;
  } catch (error) {
    throw new BadRequestError({
      field: "id",
      message: "Can not find user",
    });
  }
};

export default {
  list,
  createBan,
  updateBan,
  getUserStatusInEvent,
};
