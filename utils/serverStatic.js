import path from "node:path"
import fs from "node:fs/promises"
import {sendResponse} from "./sendResponse.js"
import { getContentType } from "./getContentType.js"

export async function serverStatic(req,res,baseDir){

    // if(req.url === '/favicon.ico') {
    //     res.writeHead(204,{'Content-Type': 'image/x-icon'})
    //     return res.end()
    // }

    const publicDir = path.join(baseDir,"public")
    const dataDir = path.join(baseDir,"data")
    const filePath = path.join(
        publicDir,
        req.url === '/' ? "index.html" : req.url
    )
    const ext = path.extname(filePath).toLowerCase()
    const contentType =  getContentType(ext)
    try{
        const content = await fs.readFile(filePath)
        sendResponse(res,200,contentType,content)
    }
    catch(err){
        const errorContent = await fs.readFile(path.join(publicDir, "404.html"))
        if(err.code === "ENOENT"){
            sendResponse(res,404,"text/html",errorContent)
        }
        else{
            sendResponse(res,500,"text/html",`<html><h1>Server Error: ${err.code}</h1></html>`)
        }

    }
}