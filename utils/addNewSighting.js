import path from "node:path"
import fs from "node:fs/promises"
import { getData } from "./getData.js"

export async function addNewSighting(newSighting){

    try{
        const pathJSON = path.join('data','data.json')
        const sightings = await getData()
        sightings.push(newSighting)
        await fs.writeFile(pathJSON,JSON.stringify(sightings,null,2),'utf8')
    }
    catch(err){
        throw new Error(err)
    }
}