import memory from '@qavajs/memory';
import { verify } from '@verify';

export interface TransformerType {
  (AR: any, ER: any): void;
}

/**
 * Transformer of all validations
 * 
 * @param p 
 * @returns function with verify inside
 */
export function validationTransformer(p: string): TransformerType {
  const regexp = /(does not )?(.+)s?/;
  const [_, reverse, validation] = p.match(regexp) as RegExpMatchArray;
  return function (AR: any, ER: any) {
    verify({ AR, ER, validation, reverse: Boolean(reverse) });
  };
}

/**
 * Parsing data from the memory
 * 
 * @param p 
 * @returns value from the memory, could be anything
 */
export function memoryTransformer(p: string): any {
  return memory.getValue(p);
}
