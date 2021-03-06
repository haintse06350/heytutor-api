import PostController from "../controller/post.controller";

export default (app) => {
  app
    .post("/post", PostController.create)
    .put("/update-post", PostController.edit)
    .delete("/post/:id", PostController.deletePost)
    .get("/get-list-post-by-filter", PostController.getListPostByFilter)
    .get("/get-post-detail/:postId", PostController.getPostDetailByPostId)
    .get("/get-list-hashtag", PostController.getListHashtag);
};
