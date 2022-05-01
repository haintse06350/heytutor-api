import { BadRequestError } from "../utils/errors";
import Course from "../models/course.model";

/**
 * To create a new course
 */
const addCourse = async (payload) => {
  try {
    const input = {
      id: payload.courseId,
      deptId: payload.deptId,
      courseName: payload.courseName,
      courseCode: payload.courseCode,
    };
    const res = await Course.create(input);
    return res;
  } catch (error) {
    throw new BadRequestError({
      field: "id",
      message: "Failed to create this item.",
    });
  }
};

const list = async (limit, offset) => {
  try {
    const listData = await Course.findAndCountAll({
      limit: parseInt(limit, 10) || 1000,
      offset: parseInt(offset, 10) || 0,
    });
    return listData;
  } catch (error) {
    throw new BadRequestError({
      field: "id",
      message: "Something went wrong!.",
    });
  }
};

export default {
  addCourse,
  list,
};
