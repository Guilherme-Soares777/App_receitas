import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
// A função transform é chamada automaticamente quando a pipe é usada no template.
// Ela recebe o valor original (texto) e retorna o valor transformado.
transform(
texto: string | null | undefined, // texto recebido do template
limite: number = 50, // tamanho máximo permitido antes do corte
sufixo: string = '...' // o que será adicionado ao final do texto cortado
): string {

// Se não existir texto, retorna string vazia para evitar erro
if (!texto) return '';

// Se o texto já for menor que o limite, devolve ele mesmo sem alterar
if (texto.length <= limite) return texto;

// Se for maior que o limite, corta o texto e adiciona o sufixo
return texto.substring(0, limite) + sufixo;
  }
}
