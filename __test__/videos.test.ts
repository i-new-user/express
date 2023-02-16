import { doesNotMatch } from 'assert'
import  request  from 'supertest'
import {app} from '../src/index'
// import {videos, VideosType, HTTP_STATUSES, error} from '../src/index'

describe('/videos',() => {
   
    beforeAll( async () => {
        await request(app).delete('/testing/all-data')
    })
    it('shold return 200 and empty array', async () => {
        await request(app)
            .get('/videos')
            .expect(  200,[] )
    })

    it('shold return 200 and empty array', async () => {
        await request(app)
            .get('/videos')
            .expect( 200 )
    })
})
