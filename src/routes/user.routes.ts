import FeedbackController from "../controller/feedback.controller";
import UserController from "../controller/user.controller";

export default (app: any) => {
  app
    .get("/user-info", UserController.getUser)
    .get("/user/:email", UserController.fetchByEmail)
    .get("/user-request-stats/:userId", UserController.getUserPostStats)
    .get("/supporter-request-stats/:userId", UserController.getSupporterStats)
    .get("/search-suggest", UserController.searchSuggest)
    .post("/user-create-pin-post", UserController.userCreatePostPin)
    .post("/user-unpin-post", UserController.userUnPinPost)
    .post("/create-report", UserController.createReport)
    .post("/add-new-feedback", FeedbackController.addNewFeedback)
    .put("/request-done", UserController.requestPostDone)
    // .get("/feedbackByUser", UserController.feedbackByUser)
};
