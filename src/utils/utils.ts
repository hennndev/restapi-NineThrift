import { BadRequestException } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { UserDataDto } from 'src/auth/dto/user-data.dto'

let dbFolderPath = path.join(__dirname, '../../db')

const checkDbIsExist = () => {
    if(!fs.existsSync(dbFolderPath)) {
        fs.mkdirSync(dbFolderPath)
    }
    return fs.existsSync(path.join(dbFolderPath, 'users.json'))
}

export const readUserDB = (): Array<UserDataDto> => {
    if(!checkDbIsExist()) {
        fs.writeFileSync(path.join(dbFolderPath, 'users.json'), JSON.stringify([]), 'utf-8')
    }
    const workdirPath = path.join(dbFolderPath, 'users.json')
    const readData = fs.readFileSync(workdirPath, "utf-8")
    const parsedData = JSON.parse(readData)
    return parsedData
}
export const writeUserDB = (data: string) => {
    if(!checkDbIsExist()) {
        fs.writeFileSync(path.join(dbFolderPath, 'users.json'), JSON.stringify("[]"))
    }
    const workdirPath = path.join(dbFolderPath, 'users.json')
    fs.writeFile(workdirPath, data, (err) => {
        if(err) {
            throw new BadRequestException("Failed register and create new user")
        }
    })
}