import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class FilesService {
  testConnection() {
      return 'hello, files'
  }

  async buildApks(fileName:string, channelNames:string[]): Promise<string> {
    console.log('开始测试');
    // const test = ['sina1', 'sina2', 'sina3'];
    const _channelNames = channelNames.join(',');
    const basecmd = `java -jar walle.jar batch -c ${_channelNames} static/upload/${fileName} static/release`;
    console.log(basecmd);
    const promise = new Promise<string>((resolve, rejects) => {
        exec(basecmd, { encoding: 'utf8' }, (err, stdout, stderr) => {
            if (err) {
              console.log(err);
              return;
            }
            resolve(`${stdout}`);
            rejects(stderr)
          });
    })
    return promise

  }
}
