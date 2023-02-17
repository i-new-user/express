"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videos = exports.error = exports.HTTP_STATUSES = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
const port = 3001;
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
exports.HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUST_400: 400,
    NOT_FOUND_404: 404
};
exports.error = { "errorsMessages": [{
            "message": "If video for passed id doesn't exist",
            "field": "title"
        }]
};
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
        title: "Nature",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: ["P144"]
    },
    {
        id: 3,
        title: "Space",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: ["P144"]
    }
];
exports.app.get('/', (req, res) => {
    res.send('Hello');
});
exports.app.delete('/testing/all-data', (req, res) => {
    exports.videos.splice(0, exports.videos.length);
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.post('/videos', (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let availableResolutions = req.body.availableResolutions;
    let newVideo = {
        id: +(new Date().toISOString()),
        title: title,
        author: author,
        canBeDownloaded: req.body.canBeDownloaded || false,
        minAgeRestriction: req.body.minAgeRestriction || null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: availableResolutions || ["P144"],
    };
    !title || title.length > 40 || typeof title !== 'string' ||
        !author || author.length > 20 || typeof author !== 'string' ?
        res.send(exports.error).sendStatus(exports.HTTP_STATUSES.BAD_REQUST_400) :
        exports.videos.push(newVideo);
    res.send(newVideo).sendStatus(exports.HTTP_STATUSES.CREATED_201);
});
exports.app.get('/videos', (req, res) => {
    res.send(exports.videos).sendStatus(exports.HTTP_STATUSES.OK_200);
});
exports.app.get('/videos/:id', (req, res) => {
    let video = exports.videos.find(v => v.id === +req.params.id);
    video ?
        res.send(video).sendStatus(exports.HTTP_STATUSES.OK_200) :
        res.send(exports.error).sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
});
exports.app.put('/videos/:id', (req, res) => {
    let video = exports.videos.find(v => v.id === +req.params.id);
    if (video) {
        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = req.body.availableResolutions || ["P144"];
        video.canBeDownloaded = req.body.canBeDownloaded || false;
        video.minAgeRestriction = req.body.titminAgeRestrictionle || 17;
        video.publicationDate = req.body.publicationDate || new Date().toISOString();
        if (video.title.length > 40 || video.author.length > 20 || video.availableResolutions.length < 1) {
            res.sendStatus(exports.HTTP_STATUSES.BAD_REQUST_400);
        }
        else {
            res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
        }
    }
    else {
        res.send(exports.error).sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
    }
});
exports.app.delete('/videos/:id', (req, res) => {
    for (let i = 0; i < exports.videos.length; i++) {
        if (exports.videos[i].id === +req.params.id) {
            exports.videos.splice(i, 1);
            res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
            return;
        }
        res.send(exports.error).sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
    }
    res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
});
exports.app.listen(port, () => {
    console.log(`Start port ${port}`);
});
// app.post('/videos', (req: Request, res: Response) => {
//     let title = req.body.title;
//     let author = req.body.author;
//     let availableResolutions = req.body.availableResolutions;
//     let newVideo ={
//         id: +(new Date),
//         title: title,
//         author: author,
//         canBeDownloaded: req.body.canBeDownloaded || true,
//         minAgeRestriction: req.body.minAgeRestriction || null,
//         createdAt: new Date().toISOString(),
//         publicationDate: new Date( new Date().setDate(new Date().getDate() + 1) ).toISOString(),
//         availableResolutions: req.body.availableResolutions || ['P144'],
//     }
//     if(!title || title.length > 40 || typeof title !== 'string' ||
//        !author || author.length > 20 || typeof author !== 'string'){
//         res.sendStatus(HTTP_STATUSES.BAD_REQUST_400).send(error)
//     } else {
//         videos.push(newVideo);
//         res.sendStatus(HTTP_STATUSES.CREATED_201).send(newVideo)
//     }
// })
// app.get('/videos/:id', (req: Request, res: Response) => {
//     let video = videos.find(v => v.id === +req.params.id)
//     video 
//     ? res.sendStatus(HTTP_STATUSES.OK_200).send(video) 
//     : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
// })
// app.put('/videos/:id', (req: Request, res: Response) => {
//    let video = videos.find(v => v.id === +req.params.id)
//    if(video){
//          video.title = req.body.title;
//          video.author = req.body.author;
//         res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
//    } else {
//           res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
//    } 
// })
// app.delete('/videos/:id', (req: Request, res: Response) => {
//     for(let i = 0; i < videos.length; i++){
//         if(videos[i].id === +req.params.id){
//             videos.splice(i,1)
//             res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
//             return;
//         }
//     }
//     res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
// })
