import { Before, defineParameterType } from '@cucumber/cucumber';
import path from 'path';
import memory from '@qavajs/memory';
import { validationTransformer, memoryTransformer } from '@parameterTypeTransformer';

declare global {
  // eslint-disable-next-line no-var
  var config: any;
}

defineParameterType({
  name: 'text',
  regexp: /'(.+)'/,
  transformer: memoryTransformer,
});

defineParameterType({
  name: 'validation',
  regexp: /(.+)/,
  transformer: validationTransformer,
});

Before(async function () {
  const configPath = process.env.CONFIG as string;
  const profile = process.env.PROFILE as string;
  global.config = (await import(path.join(process.cwd(), configPath)))[profile];
  memory.register(config.memory ?? {});
});
