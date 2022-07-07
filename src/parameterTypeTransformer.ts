import memory from '@qavajs/memory';
import { verify, validationExtractRegexp } from './verify';

export type TransformerType = (AR: any, ER: any) => void;

/**
 * Transformer of all validations
 * @param validationType - string to be resolved
 * @returns verify function
 */
export function validationTransformer(validationType: string): TransformerType {
  const match = validationType.match(validationExtractRegexp) as RegExpMatchArray;
  if (!match) throw new Error(`validation '${validationType}' is not supported`);
  const [_, reverse, validation] = match;
  return function (AR: any, ER: any) {
    verify({ AR, ER, validation, reverse: Boolean(reverse) });
  };
}

/**
 * Parsing data from the memory
 *
 * @param alias - memory alias or plain value
 * @returns value from the memory, could be anything
 */
export function memoryTransformer(alias: string): any {
  return memory.getValue(alias);
}
