import { db } from '@/database';
import { Entry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IEntry } from '../../../models/Entry';

type Data =
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getEntries(res);
    
        default:
            return res.status(400).json({ message: 'El endpoint no existe' });
    }
}

const getEntries = async( res: NextApiResponse<Data> ) => {
    await db.connect();

    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconnect();
    res.status(200).json(entries);


}