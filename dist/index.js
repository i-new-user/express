"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.HTTP_STATUSES = exports.videos = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
const port = 3001;
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
exports.videos = [
    {
        id: 1,
        title: "Ocean",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: ["P144"]
    },
    {
        id: 2,
        title: "Spaсe",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: ["P144"]
    },
    {
        id: 3,
        title: "Nature",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: ["P144"]
    }
];
exports.HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUST_400: 400,
    NOT_FOUND_404: 404
};
exports.error = { "errorsMessages": [{
            "message": "If video for passed id doesn't exist",
            "field": "If video for passed id doesn't exist"
        }]
};
exports.app.delete('/testing/all-data', (req, res) => {
    exports.videos.splice(0, exports.videos.length);
    res.status(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.get('/videos', (req, res) => {
    res.status(exports.HTTP_STATUSES.OK_200).json(exports.videos);
});
exports.app.post('/videos', (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let availableResolutions = req.body.availableResolutions;
    let newVideo = {
        id: +(new Date),
        title: title,
        author: author,
        canBeDownloaded: req.body.canBeDownloaded || true,
        minAgeRestriction: req.body.minAgeRestriction || null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: req.body.availableResolutions || ['P144'],
    };
    if (!title || title.length > 40 || typeof title !== 'string' ||
        !author || author.length > 20 || typeof author !== 'string') {
        res.status(exports.HTTP_STATUSES.BAD_REQUST_400).json(exports.error);
    }
    else {
        exports.videos.push(newVideo);
        res.status(exports.HTTP_STATUSES.CREATED_201).json(newVideo);
    }
});
exports.app.get('/videos/:id', (req, res) => {
    let video = exports.videos.find(v => v.id === +req.params.id);
    video
        ? res.status(exports.HTTP_STATUSES.OK_200).json(video)
        : res.status(exports.HTTP_STATUSES.NOT_FOUND_404);
});
exports.app.put('/videos/:id', (req, res) => {
    let video = exports.videos.find(v => v.id === +req.params.id);
    if (video) {
        video.title = req.body.title;
        video.author = req.body.author;
        res.status(exports.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.status(exports.HTTP_STATUSES.NOT_FOUND_404);
    }
});
exports.app.delete('/videos/:id', (req, res) => {
    for (let i = 0; i < exports.videos.length; i++) {
        if (exports.videos[i].id === +req.params.id) {
            exports.videos.splice(i, 1);
            res.status(exports.HTTP_STATUSES.NO_CONTENT_204);
            return;
        }
    }
    res.status(exports.HTTP_STATUSES.NOT_FOUND_404);
});
exports.app.listen(port, () => {
    console.log(`Start port ${port}`);
});
