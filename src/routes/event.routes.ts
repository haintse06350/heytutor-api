import EventController from "../controller/event.controller";

export default (app) => {
  app
    .post("/event/create", EventController.create)
    .put("/event/:id", EventController.edit)
    .delete("/event/:id", EventController.deleteEvent)
    .get("/get-event-post/:eventId", EventController.getNumberPostOfEvent)
    .get("/get-list-post-of-event/:eventId", EventController.getListPostOnEvent)
    .get("/get-event-stats/:eventId", EventController.getEventStats)
    .get("/get-list-event-of-user", EventController.getEventByUser)
    .get("/get-event-detail/:eventId", EventController.getEventUserPostDetail)
    .get("/get-event-by-duration", EventController.getEventByDuration)
    // .get("/listActiveUser/:eventId", EventController.listActiveUser)
    .get("/getListEventNotEnroll", EventController.getListEventNotEnroll)
    .get("/listEventByAdmin", EventController.listEventByAdmin)
    .get("/get-event-title", EventController.getEventTitle);
};
