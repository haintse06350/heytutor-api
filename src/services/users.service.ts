import User from "../models/user.model";
import Post from "../models/post.model";
import { NotFoundError } from "../utils/errors";
import { Op } from "sequelize";

/**
 * To information of a user
 */
const getUserInfo = async (userId: number) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      throw new NotFoundError({
        field: "id",
        message: "User is not found",
      });
    }

    return user;
  } catch (error) {}
};

/**
 * To information of a user by email
 */
const fetchByEmail = async (email: string) => {
  try {
    const user = await User.findOne({
      where: { email },
      raw: true,
      // logging: console.log,
    });

    return user;
  } catch (error) {
    throw new NotFoundError({
      field: "email",
      message: "User is not found",
    });
  }
};

/**
 * Get user's request's count number of user
 */
const totalRequestNumber = async (userId: number) => {
  try {
    const numberRequest = await Post.count({
      where: { userId },
    });

    return numberRequest;
  } catch (error) {
    throw new NotFoundError({
      field: "userId",
      message: "User is not found",
    });
  }
};

/**
 * Get total subject in request of user by userId
 */
const getTotalSubject = async (userId: number) => {
  try {
    const subject = await Post.findAll({
      where: { userId },
      group: ["hashtag"],
      attributes: ["hashtag"],
      raw: true,
    });

    return subject;
  } catch (error) {
    throw new NotFoundError({
      field: "userId",
      message: "User is not found",
    });
  }
};

/**
 * Get number of request in resolved status of user
 */
const getNumberOfRequestResolved = async (_userId: number) => {
  try {
    const listStatus = await Post.count({
      where: { userId: _userId, isResolved: 1 },
      // logging: true,
    });

    return listStatus;
  } catch (error) {
    throw new NotFoundError({
      field: "userId",
      message: "User is not found",
    });
  }
};

/**
 * Get number of request in pending status of user
 */
const getNumberOfRequestPending = async (_userId: number) => {
  try {
    const listStatus = await Post.count({
      where: { userId: _userId, isPending: 1 },
      // logging: true,
    });

    return listStatus;
  } catch (error) {
    throw new NotFoundError({
      field: "userId",
      message: "User is not found",
    });
  }
};

/**
 * Get number of request in active status of user
 */
const getNumberOfRequestActive = async (_userId: number) => {
  try {
    const listStatus = await Post.count({
      where: { userId: _userId, isActive: 1 },
      // logging: true,
    });

    return listStatus;
  } catch (error) {
    throw new NotFoundError({
      field: "userId",
      message: "User is not found",
    });
  }
};

/**
 * Get number of request by status of user
 */

const getUserPostStats = async (_userId: number) => {
  try {
    const [
      requestCount,
      totalRequestCount,
      requestResolvedCount,
      requestPendingCount,
      requestActiveCount,
    ] = await Promise.all([
      totalRequestNumber(_userId),
      getTotalSubject(_userId),
      getNumberOfRequestResolved(_userId),
      getNumberOfRequestPending(_userId),
      getNumberOfRequestActive(_userId),
    ]);
    return {
      requestCount,
      totalRequestCount,
      requestResolvedCount,
      requestPendingCount,
      requestActiveCount,
    };
  } catch (error) {
    throw new NotFoundError({
      field: "userId",
      message: "User is not found",
    });
  }
};

// const totalNumberSubscribeOfSupporter = async (_userId: number) => {
//   try {
//     Subscribe.count({
//       where: {
//         subscribeId: {
//           [Op.like]: _userId,
//         },
//       },
//     });
//   } catch (error) {
//     throw new NotFoundError({
//       field: "userId",
//       message: "User is not found",
//     });
//   }
// };

const totalNumberConfirmedOfSupporter = async (_userId: number) => {
  try {
    Post.count({
      where: {
        supporterCF: _userId,
      },
    });
  } catch (error) {
    throw new NotFoundError({
      field: "userId",
      message: "User is not found",
    });
  }
};

// const totalNumberPendingOfSupporter = async (_userId: number) => {
//   try {
//     Subscribe.hasMany(Post, { foreignKey: "id " });
//     Post.belongsTo(Subscribe, { foreignKey: "requestId" });

//     Post.count({
//       where: {
//         subscriberId: {
//           [Op.like]: _userId.toString(),
//         },
//         isPending: 1,
//       },
//     });
//   } catch (error) {
//     throw new NotFoundError({
//       field: "userId",
//       message: "User is not found",
//     });
//   }
// };

// const totalNumberActiveOfSupporter = async (_userId: number) => {
//   try {
//     Subscribe.hasMany(Post, { foreignKey: "id " });
//     Post.belongsTo(Subscribe, { foreignKey: "requestId" });

//     Post.count({
//       where: {
//         subscriberId: {
//           [Op.like]: _userId.toString(),
//         },
//         isActive: 1,
//       },
//     });
//   } catch (error) {
//     throw new NotFoundError({
//       field: "userId",
//       message: "User is not found",
//     });
//   }
// };

// const totalNumberResolvedOfSupporter = async (_userId: number) => {
//   try {
//     Subscribe.hasMany(Post, { foreignKey: "id " });
//     Post.belongsTo(Subscribe, { foreignKey: "requestId" });

//     Post.count({
//       where: {
//         subscriberId: {
//           [Op.like]: _userId.toString(),
//         },
//         isResolved: 1,
//       },
//     });
//   } catch (error) {
//     throw new NotFoundError({
//       field: "userId",
//       message: "User is not found",
//     });
//   }
// };

const getSupporterStats = async (_userId: number) => {
  try {
    const [
      // totalRequestCount,
      requestConfirmedCount,
      // requestResolvedCount,
      // requestPendingCount,
      // requestActiveCount,
    ] = await Promise.all([
      // totalNumberSubscribeOfSupporter(_userId),
      totalNumberConfirmedOfSupporter(_userId),
      // totalNumberPendingOfSupporter(_userId),
      // totalNumberActiveOfSupporter(_userId),
      // totalNumberResolvedOfSupporter(_userId),
    ]);
    return {
      // totalRequestCount,
      requestConfirmedCount,
      // requestResolvedCount,
      // requestPendingCount,
      // requestActiveCount,
    };
  } catch (error) {
    throw new NotFoundError({
      field: "userId",
      message: "User is not found",
    });
  }
};

export default {
  getUserInfo,
  fetchByEmail,
  getUserPostStats,
  getSupporterStats,
};