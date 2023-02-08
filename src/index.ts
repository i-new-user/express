import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
const port = 3005;

app.use(cors())
app.use(bodyParser.json())

export type VideosType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    createdAt: string
    publicationDate: string
    availableResolution: Array<ResolutionsType>
}

export type ResolutionsType = Array<string>
    
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
        title: "Nature",
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


app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.splice(0, videos.length);
    res.status(HTTP_STATUSES.NO_CONTENT_204)
   
})

app.get('/videos', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).json(videos)
})

app.post('/videos', (req: Request, res: Response) => {
    
    let title = req.body.title;
    let author = req.body.author;
    let availableResolutions = req.body.availableResolutions;

    let newVideo ={
        id: +(new Date),
        title: title,
        author: author,
        canBeDownloaded: req.body.canBeDownloaded || true,
        minAgeRestriction: req.body.minAgeRestriction || null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date( new Date().setDate(new Date().getDate() + 1) ).toISOString(),
        availableResolutions: req.body.availableResolutions || ['P144'],
    }
    
    if(!title || title.length > 40 || typeof title !== 'string' ||
       !author || author.length > 20 || typeof author !== 'string' ||
       !availableResolutions || availableResolutions.length < 1){

        res.status(HTTP_STATUSES.BAD_REQUST_400).json(error)
    } else {
        videos.push(newVideo);
        res.status(HTTP_STATUSES.CREATED_201).json(newVideo)
    }
})

app.get('/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
  
    !video 
    ? res.status(HTTP_STATUSES.NOT_FOUND_404)
    : res.status(HTTP_STATUSES.OK_200).json(video)
})


app.put('/videos', (req: Request, res: Response) => {
   
})

app.delete('/videos/:id', (req: Request, res: Response) => {

    for(let i = 0; i < videos.length; i++){
        if(videos[i].id === +req.params.id){
            videos.splice(i,1)
            res.status(HTTP_STATUSES.NO_CONTENT_204)
            return;
        }
    }
    res.status(HTTP_STATUSES.NOT_FOUND_404)
})



app.listen(port, () => {
    console.log('Start')
})