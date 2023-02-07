import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello world !!! >>>>>>>><h1>')
})

app.listen(port)