import { Body, Controller, Get, Post, UploadedFile ,UseInterceptors} from '@nestjs/common';
import { FilesService } from './files.service';
import {FileInterceptor} from '@nestjs/platform-express';
import multer = require('multer')
import { ChannelDto } from './dto/channelDto';

@Controller('files')
export class FilesController {

    constructor(private filesService:FilesService){}

    @Get('/test')
    testConnection() {
        return this.filesService.testConnection();
    }

    

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'static/upload')
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        })
    }))
    async uploadFile(@UploadedFile() file) {
      console.log(file);
      return file;
    }

    @Post('build')
    async buildChannels(@Body() channelDto: ChannelDto) {
        console.log(channelDto);
        if(ChannelDto.isValid(channelDto)) {
            try{
                return await this.filesService.buildApks(channelDto.fileName, channelDto.channelNames);
            }catch(ex) {
                return ex
            }
          
        }
        return '参数错误!'
       
    }
}
