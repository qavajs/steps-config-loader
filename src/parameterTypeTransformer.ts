import memory from '@qavajs/memory';
import { verify } from './verify';

export function validationTransformer(p: string) {
    const regexp: RegExp = /(does not )?(.+)s?/;
    const [ _, reverse, validation ] = p.match(regexp) as RegExpMatchArray;
    return function (AR: any, ER: any) {
        verify({ AR, ER, validation, reverse: Boolean(reverse) })
    }
}

export function memoryTransformer(p: string) {
    return memory.getValue(p)
}
