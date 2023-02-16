import express, {Request, Response, Router} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import {body} from 'express-validator'
import {routerVideos} from './routers/videos_router'
import { authMiddleware } from './middlewares/auth-middleware';
import {HTTP_STATUSES} from './http/statuses_code'
import { videos } from './repositories/videos_repositories';

export const app = express();
const port = 3001;

app.use(cors())
app.use(bodyParser.json())
//app.use(authMiddleware)

app.use('/videos', routerVideos)



app.get('/', (req: Request, res: Response) => {
    res.send('Hello')
})
app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.splice(0, videos.length);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
   
})



app.listen(port, () => {
    console.log(`Start port ${port}`)
})