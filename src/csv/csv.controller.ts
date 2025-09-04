import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { CsvService } from './csv.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import * as csv from 'csv-parser';



@Controller('csv')
export class CsvController {

    constructor(private readonly csvService: CsvService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: memoryStorage(), 
            fileFilter: (req, file, cb) => {
                if (file.mimetype === 'text/csv') cb(null, true);
                else cb(new Error('Apenas arquivos CSV são permitidos'), false);
            },
        }),
    )
    async create(@UploadedFile() file: Express.Multer.File) {
        const rows = await this.csvService.parseCsv(file.buffer);
        const result = await this.csvService.create(rows);
        return { inserted: result.count };
    }

    @Get()
    async list() {
        return this.csvService.list()
    }


}
