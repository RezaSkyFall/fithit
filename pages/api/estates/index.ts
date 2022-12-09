// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../data/dbConnect';
import EstateModel from '../../../models/EstateModel'
import { IEstate } from '../../../types/IEstate'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IEstate[]>
) {

    try {
        await dbConnect();
        let estates: IEstate[] = await EstateModel.find();
        res.status(200).json(estates)
    } catch (error) {
        console.log(error)
        res.status(503)
    }
}
