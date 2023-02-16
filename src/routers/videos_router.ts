import { Request, Response, Router } from "express";
import {videosRepository} from '../repositories/videos_repositories'
import {HTTP_STATUSES} from '../http/statuses_code'
import { authMiddleware } from '../middlewares/auth-middleware'
import {body} from 'express-validator'
import {imputValidatorMiddlevare} from '../middlewares/imput-validator-middleware'

export const  routerVideos = Router({})





routerVideos.get('/', async (req: Request, res: Response) => {
    const videos = videosRepository.findAllVideos(req.query.title?.toString())
    res.send(videos).sendStatus(HTTP_STATUSES.OK_200)
})

routerVideos.post('/',

    authMiddleware,
    body('title').trim().isLength({min: 10, max: 40}),
    imputValidatorMiddlevare,
    
    (req: Request<{},{},{title: string, author: string},{}>, res: Response) => {
    let error = {};
    
    const newVideo = videosRepository.createVideo(req.body.title, req.body.author)

    if(newVideo){
        res.send(newVideo).sendStatus(HTTP_STATUSES.CREATED_201)
    } else {
        res.send(error).sendStatus(HTTP_STATUSES.BAD_REQUST_400)
    }
    
})

routerVideos.get('/:id', (req: Request, res: Response) => {
    
    const video = videosRepository.findVideosById(+req.params.id)
    video 
    ? res.send(video).sendStatus(HTTP_STATUSES.OK_200)
    : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})


routerVideos.put('/:id', (req: Request, res: Response) => {
    const error= {};

   let updateVideo =  videosRepository.updateVideosById(+req.params.id,
                                                        req.body.title,
                                                        req.body.author,)
    if(updateVideo){
        const video =  videosRepository.findVideosById(+req.params.id)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
   } else {
        res.send(error).sendStatus(HTTP_STATUSES.NOT_FOUND_404)
   }
})

routerVideos.delete('/:id', (req: Request, res: Response) => {

    let isDeleted = videosRepository.deleteVideosById(+req.params.id)
    if(isDeleted){
        return res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        return res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
   
})