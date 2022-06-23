import memory from '@qavajs/memory';

export function compareValidationTransformer(p: string) {
    const regexp: RegExp = /(does not )?(.+)s?/;
    const [ _, reverse, validation ] = p.match(regexp) as RegExpMatchArray;
    return {
        reverse: Boolean(reverse),
        validation
    }
}

export function memoryTransformer(p: string) {
    return memory.getValue(p)
}
