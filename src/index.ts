import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
const port = 3003;

app.use(cors())
app.use(bodyParser.json())


let videos = [
    {
        id: 1,
        title: "Ocean",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date( new Date().setDate(new Date().getDate() + 1) ).toISOString(),
        availableResolutions: ["P144"]
     },
     {
        id: 2,
        title: "Spaсe",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date( new Date().setDate(new Date().getDate() + 1) ).toISOString(),
        availableResolutions: ["P144"]
   },
   {
        id: 3,
        title: "nature",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date( new Date().setDate(new Date().getDate() + 1) ).toISOString(),
        availableResolutions: ["P144"]
    }
]

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    
    BAD_REQUST_400: 400,
    NOT_FOUND_404: 404
}

const error = {"errorsMessages":[{
    "message": "If video for passed id doesn't exist",
     "field": "If video for passed id doesn't exist"
 }]
}

app.get('/', (req: Request, res: Response) => {
    
    res.send('<h1>Hello world !!! >>>>>>>><h1>')
})

app.get('/videos', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).json(videos)
})

app.listen(port, () => {
    console.log('Start')
})