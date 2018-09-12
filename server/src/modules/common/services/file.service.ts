import { Injectable } from '@nestjs/common';

import { createWriteStream, unlinkSync, lstatSync } from 'fs';
import * as mkdirp from 'mkdirp';
import * as shortid from 'shortid';
import * as path from 'path';

@Injectable()
export class FileService {

    async storeFS(file): Promise<any> {
        const { stream, filename, mimetype, encoding } = await file;

        const folderId = shortid.generate();
        const rootPath = path.join('.', 'uploads', folderId);
        mkdirp.sync(rootPath);

        const filePath = `${rootPath}/${filename}`;

        return new Promise((resolve, reject) =>
          stream
            .on('error', error => {
              if (stream.truncated)
                // Delete the truncated file
                unlinkSync(filePath);
              reject(error);
            })
            .pipe(createWriteStream(filePath))
            .on('finish', () => {
              const size = lstatSync(filePath).size;
              const pathDB = `uploads/${folderId}/${filename}`;
              resolve(
              {
                filename,
                mimetype,
                encoding,
                size,
                path: pathDB,
              });
              },
            )
            .on('error', error => reject(error)),
        );
    }

   async removeFS(filepath: string): Promise<any> {
    const rootPath = path.join('.');
    return new Promise((resolve, reject) => {
        try {
          unlinkSync(`${rootPath}/${filepath}`);
          resolve(true);
        } catch (err) {
          reject(err);
        }
    });
  }

}
