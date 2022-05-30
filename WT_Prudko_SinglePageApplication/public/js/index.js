import Router from "./paramHashRouter.js";
import Routes from "./routes.js";
import CommentHandler from "./addCommentB4app.js";

window.router = new Router(Routes,"welcome");
window.comHandler= new CommentHandler("commentForm");