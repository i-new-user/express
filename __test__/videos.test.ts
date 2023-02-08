import { doesNotMatch } from 'assert'
import  request  from 'supertest'
import {app} from '../src/index'
import {videos, VideosType, HTTP_STATUSES, error} from '../src/index'



describe('Test CRUD',() => {
    test('GET /videos --> return all videos and status 200', async() => {
        const res = await request(app).get('/videos')

        expect(res.status).toBe(HTTP_STATUSES.OK_200)
    })  
    test('POST /videos --> return all videos and status 200', async() => {
        const res = await request(app).get('/videos')

        expect(res.status).toBe(HTTP_STATUSES.OK_200)
    })   
    
})
