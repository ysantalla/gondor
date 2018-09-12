import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    for (let i = 0; i < 90; i += 10) {
      const bu_size: number = Math.abs(value) / Math.pow(2.0, i);

      if (parseInt(bu_size.toString(), 10) < Math.pow(2, 10)) {
        const unit = {0: 'bytes', 10: 'KiB', 20: 'MiB', 30: 'GiB', 40: 'TiB', 50: 'PiB', 60: 'EiB', 70: 'ZiB', 80: 'YiB'};
        return `${bu_size.toFixed(2)} ${unit[i]}`;
      }
    }
    return `${value} bytes`;
  }
}
