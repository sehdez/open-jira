import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';

type Data = 
    | { message: string }
    | IEntry


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if( !mongoose.isValidObjectId(id) ){
        return res.status(400).json({ message: 'No es un id válido' + id })
    }
    
    switch ( req.method ) {
        case 'GET':
            return getEntry(req, res);
        case 'PUT':
            return putEntry( req, res );
    
        default:
            return res.status(400).json({ message: 'El endpoint no existe' });
    }
    
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    try{
        db.connect();
        
        const entry = await Entry.findById(id);
        db.disconnect();
        if(!entry){
            return res.status(400).json({ message: 'No se encontró una entrada con el id ' + id });
        }

        return res.status(200).json(entry);

    }catch(e){
        db.disconnect();
        console.log(e)
        return res.status(500).json({ message: 'Algo salió mal revisar consola del servidor' });
    }

}

const putEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query;

    try{
        db.connect();
        
        const entryToUpdate = await Entry.findById(id);
        db.disconnect();

        if ( !entryToUpdate ){
            return res.status(400).json({ message: 'No existe la entrada con el id ' + id })
        }
        const {
            description = entryToUpdate.description,
            status = entryToUpdate.status
        } = req.body;
        
        if( !status || !(status === 'pending' || status === 'in-progress' || status === 'finished')  )
            return res.status(400).json({ message: 'El campo status debe tener los siguientes valores: pending, in-progress, finished '})
        
            const updateEntry = await Entry.findByIdAndUpdate(id,{ description, status },{runValidators: true, new: true});

        return res.status(200).json(updateEntry!);

    }catch(e){
        db.disconnect();
        console.log(e)
        return res.status(500).json({ message: 'Algo salió mal revisar consola del servidor' });
    }
}