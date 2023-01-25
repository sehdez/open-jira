import mongoose from 'mongoose';


/** 
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
**/


const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {
    if ( mongoConnection.isConnected === 1 ){
        console.log('Ya estábamos conectados a la BD');
        return;
    }

    if ( mongoConnection.isConnected > 0 ){
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if( mongoConnection.isConnected === 1 ){
            console.log('Usando conexión anterior');
            return;
        }
        await mongoose.disconnect();
    }
    const urlDB = process.env.MONGO_URL
    await mongoose.connect(urlDB || '');
    mongoConnection.isConnected = 1;
    console.log('Conectado a Mongo', urlDB);
}


export const disconnect =  async() => {

    if( process.env.NODE_ENV === 'development' ) return;

    if( mongoConnection.isConnected === 0 ) return;

    await mongoose.disconnect();
    console.log('Desconectado de MongoDB')
}