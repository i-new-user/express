import { Request, Response, NextFunction } from "express";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.token === '11'){
        next();
    }else{
        res.sendStatus(401)
    }
}