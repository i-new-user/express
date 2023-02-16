"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const videos_router_1 = require("./routers/videos_router");
exports.app = (0, express_1.default)();
const port = 3001;
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
//app.use(authMiddleware)
exports.app.use('/videos', videos_router_1.routerVideos);
exports.app.get('/', (req, res) => {
    console.log(req.body.title);
    res.send('Hello');
});
exports.app.listen(port, () => {
    console.log(`Start port ${port}`);
});
