import memory from '@qavajs/memory';
import { verify } from './verify';

export type TransformerType = (AR: any, ER: any) => void;

/**
 * Transformer of all validations
 *
 * @param p
 * @returns function with verify inside
 */
export function validationTransformer(p: string): TransformerType {
  const regexp = /(?<reverse>does not |not |to not )?(?:to )?(?:be )?((?<validation>.+?)(s|es)?)$/;
  const { reverse, validation } = p.match(regexp)?.groups as { reverse: string; validation: string };
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
