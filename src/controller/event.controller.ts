import EventServices from "../services/event.service";

const create = (req, res, next) => {
  EventServices.create(req.ctx, req.body)
    .then((evt) => res.json(evt))
    .catch(next);
};

const edit = (req, res, next) => {
  EventServices.edit(req.body)
    .then((evt) => res.json(evt))
    .catch(next);
};

const deleteEvent = (req, res, next) => {
  EventServices.deleteEvent(req.params.eventId)
    .then((evt) => res.json(evt))
    .catch(next);
};

const getNumberPostOfEvent = (req, res, next) => {
  EventServices.getNumberPostOfEvent(req.params.eventId)
    .then((evt) => res.json(evt))
    .catch(next);
};

const getEventUser = (req, res, next) => {
  EventServices.getEventUser(req.params.eventId)
    .then((evt) => res.json(evt))
    .catch(next);
};

const listEventByAdmin = (req, res, next) => {
  EventServices.listEventByAdmin(req.ctx)
    .then((evt) => res.json(evt))
    .catch(next);
};

const getEventStats = (req, res, next) => {
  EventServices.getEventStats(req.params.eventId)
    .then((evt) => res.json(evt))
    .catch(next);
};

const getEventByUser = (req, res, next) => {
  EventServices.listEventByUser(req.ctx)
    .then((evt) => res.json(evt))
    .catch(next);
};

const getEventUserPostDetail = (req, res, next) => {
  EventServices.getEventUserPostDetail(req.ctx.user.id, req.params.eventId)
    .then((evt) => res.json(evt))
    .catch(next);
};

const getEventByDuration = (req, res, next) => {
  EventServices.getEventByDuration()
    .then((evt) => res.json(evt))
    .catch(next);
};

const getEventTitle = (req, res, next) => {
  EventServices.getEventForCreatePost()
    .then((evt) => res.json(evt))
    .catch(next);
};

// const listActiveUser = (req, res, next) => {
//   EventServices.listActiveUser(req.params.eventId)
//     .then((evt) => res.json(evt))
//     .catch(next);
// };

const getListEventNotEnroll = (req, res, next) => {
  EventServices.getListEventNotEnroll(req.ctx, req.body.limit, req.body.offset)
    .then((evt) => res.json(evt))
    .catch(next);
};

const getListPostOnEvent = (req, res, next) => {
  EventServices.getPostOfEvent(req.params)
    .then((evt) => res.json(evt))
    .catch(next);
};

export default {
  create,
  edit,
  deleteEvent,
  getNumberPostOfEvent,
  getEventUser,
  getEventStats,
  getEventByUser,
  getEventUserPostDetail,
  getEventByDuration,
  // listActiveUser,
  getListEventNotEnroll,
  getEventTitle,
  getListPostOnEvent,
  listEventByAdmin,
};
