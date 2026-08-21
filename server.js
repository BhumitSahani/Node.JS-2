import http from "node:http"
import  {serverStatic} from "./utils/serverStatic.js"
import { handleGet, handlePost, handleNews } from "./handlers/routeHandlers.js"


const __dirname = import.meta.dirname


const server = http.createServer(async(req,res) => {

    if(req.url === '/api'){
        if(req.method === 'GET') {
            return handleGet(res)
        }
        else if(req.method === 'POST'){
            handlePost(req,res)
        }
    }
        else if(req.url === '/api/news') {
            return await handleNews(req,res)
        }
    else if(!req.url.startsWith('/api')) {
    return await serverStatic(req,res, __dirname)
    }
})



server.listen(8000, ()=> console.log("Connected to server"))

