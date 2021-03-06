import { Application } from "express";
import BanController from "../controller/ban.controller";

export default (app: Application) => {
  app
    // .get("/list-ban", BanController.list)
    .put("/create-ban", BanController.createBan)
    .put("/update-date", BanController.updateBan);
};
