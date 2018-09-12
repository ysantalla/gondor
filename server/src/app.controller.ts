import * as fs from 'fs';
import * as path from 'path';

import { Get, Controller, Param, Res } from '@nestjs/common';
import { Prisma } from './generated/prisma';

@Controller()
export class AppController {
  constructor(
      private readonly prisma: Prisma,
  ) {}

  @Get('download/:id')
  async download(
      @Param('id') id: string,
      @Res() res: any,
  ) {
    const file = await this.prisma.query.file({where: {id}});
    const filePath = path.join('.', file.path);
    if (fs.existsSync(filePath)) {
        res.header('Content-disposition', 'attachament; filename=' + file.filename);
        res.header('Content-type', file.mimetype);
        res.download(filePath, file.filename);
    } else {
        res.write('File not found');
    }
  }
}
