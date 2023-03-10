import express, {Request, Response, Router} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import {body} from 'express-validator'



export const app = express();
const port = 3001;

app.use(cors())
app.use(bodyParser.json())




export type VideosType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: Number | null
    createdAt: string
    publicationDate: string
    availableResolution: ResolutionsType
}


export type ResolutionsType = Array<string>


export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    
    BAD_REQUST_400: 400,
    NOT_FOUND_404: 404
}

export const error = {"errorsMessages":[{
    "message": "If video for passed id doesn't exist",
     "field": "title"
 }]
}
    
export let videos = [
    {
        id: 1,
        title: "Ocean",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction:  null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date( new Date().setDate(new Date().getDate() + 1) ).toISOString(),
        availableResolutions: ["P144"]
     },
     {
        id: 2,
        title: "Nature",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction:  null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date( new Date().setDate(new Date().getDate() + 1) ).toISOString(),
        availableResolutions: ["P144"]
     },
     {
        id: 3,
        title: "Space",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction:  null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date( new Date().setDate(new Date().getDate() + 1) ).toISOString(),
        availableResolutions: ["P144"]
     }
]


app.get('/', (req: Request, res: Response) => {
    res.send('Hello')
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.splice(0, videos.length);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
   
})

app.post('/videos', (req: Request, res: Response) => {
   
   let title = req.body.title
   let author = req.body.author
   let availableResolutions = req.body.availableResolutions
   
   let newVideo = {
    id: +(new Date().toISOString()),
    title: title,
    author: author,
    canBeDownloaded: req.body.canBeDownloaded || false,
    minAgeRestriction: req.body.minAgeRestriction || null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date( new Date().setDate(new Date().getDate() + 1) ).toISOString(),
    availableResolutions:  availableResolutions || ["P144"],

   }

   !title || title.length > 40 || typeof title !== 'string' ||
   !author || author.length > 20 || typeof author !== 'string' ?

   res.send(error).sendStatus(HTTP_STATUSES.BAD_REQUST_400) :
  
   videos.push(newVideo)
   res.send(newVideo).sendStatus(HTTP_STATUSES.CREATED_201) ;
  
})

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos).sendStatus(HTTP_STATUSES.OK_200)
})

app.get('/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    video ?
    res.send(video).sendStatus(HTTP_STATUSES.OK_200) :
    res.send(error).sendStatus(HTTP_STATUSES.NOT_FOUND_404) ;
})

app.put('/videos/:id', (req: Request, res: Response) => {

    let video = videos.find(v => v.id === +req.params.id)

    if (video){

        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = req.body.availableResolutions || ["P144"];
        video.canBeDownloaded = req.body.canBeDownloaded || false;
        video.minAgeRestriction = req.body.titminAgeRestrictionle || 17;
        video.publicationDate = req.body.publicationDate || new Date().toISOString();

       if(video.title.length > 40  ||  video.author.length > 20 ||  video.availableResolutions.length < 1  ){

           res.sendStatus(HTTP_STATUSES.BAD_REQUST_400)
       } else {
           res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
       }

    } else {
        res.send(error).sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

})



app.delete('/videos/:id', (req: Request, res: Response) => {
    
    for(let i = 0; i < videos.length; i++){
        if(videos[i].id === +req.params.id){
            videos.splice(i,1)
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
            return;
        }
        res.send(error).sendStatus(HTTP_STATUSES.NOT_FOUND_404) ;
    }

    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404) ;
})










app.listen(port, () => {
    console.log(`Start port ${port}`)
})























































































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

