import {MongoClient} from 'mongodb'

const client = new MongoClient(`mongodb+srv://mroglan:${process.env.DATABASE_PASS}@cluster0-2fwso.mongodb.net/waltonecon`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default async function database() {
    if(!client.isConnected()) await client.connect()
    //const dbClient = client
    const db = client.db('waltonecon')
    return db
}