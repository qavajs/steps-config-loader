import { Before, After, defineParameterType } from '@cucumber/cucumber';
import path from 'path';
import memory from '@yaatp/memory';

declare global {
    var config: any;
}

defineParameterType({
    name: 'memory',
    regexp: /'(.+)'/,
    transformer: p => memory.getValue(p)
});

Before(function () {
    const configPath = process.env.CONFIG as string;
    const profile = process.env.PROFILE as string;
    global.config = require(path.join(process.cwd(), configPath))[profile];
});

Before(function () {
    memory.register(config.memory ?? {});
});
