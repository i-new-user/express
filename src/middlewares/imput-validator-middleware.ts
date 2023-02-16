import { Request, Response, NextFunction} from "express";
import { validationResult } from "express-validator";

export const imputValidatorMiddlevare = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    errors.isEmpty() ?  next() : res.status(400).json({data: {},
                                                       resultCode: 1, 
                                                       errorsMessages: errors.array().map(e =>{
                                                           return {
                                                            message: e.msg,
                                                            field: e.param
                                                           }
                                                       })}) ;

}