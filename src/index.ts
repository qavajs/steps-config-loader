import { Before, defineParameterType } from '@cucumber/cucumber';
import path from 'path';
import memory from '@qavajs/memory';
import { validationTransformer, memoryTransformer } from './parameterTypeTransformer';

declare global {
    var config: any;
}

defineParameterType({
    name: 'text',
    regexp: /'(.+)'/,
    transformer: memoryTransformer
});

defineParameterType({
    name: 'validation',
    regexp: /(.+)/,
    transformer: validationTransformer
});

Before(function () {
    const configPath = process.env.CONFIG as string;
    const profile = process.env.PROFILE as string;
    global.config = require(path.join(process.cwd(), configPath))[profile];
    memory.register(config.memory ?? {});
});
