import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(texto: string | null | undefined, limite: number = 50, sufixo: string = '...'): string {
    if (!texto) return '';
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + sufixo;
  }
}