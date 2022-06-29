import memory from '@qavajs/memory';
import { verify } from './verify';

export interface TransformerType {
  (AR: any, ER: any): void;
}

export interface WaitFunction {
  (validation: string, reverse: boolean, timeout: number, ...args: Array<any>): Promise<void>;
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
 * @param alias
 * @returns value from the memory, could be anything
 */
export function memoryTransformer(alias: string): any {
  return memory.getValue(alias);
}

export function waitTransformer(condition: string) {
  const regexp: RegExp = /(not )?to (?:be )?(.+)/;
  const [ _, reverse, validation ] = condition.match(regexp) as RegExpMatchArray;
  return async function (waitFn: WaitFunction, timeout: number, ...args: Array<any>) {
    await waitFn(validation, Boolean(reverse), timeout, ...args)
  }
}

export async function aliasTransformer(alias: string) {
  return async (aliasResolver: Function) => aliasResolver(await memory.getValue(alias))
}

export function lazyAliasTransformer(alias: string) {
  return async (aliasResolver: Function) => async () => aliasResolver(await memory.getValue(alias))
}

