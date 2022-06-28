import { Before, defineParameterType } from '@cucumber/cucumber';
import path from 'path';
import memory from '@qavajs/memory';
import { validationTransformer, memoryTransformer } from '@parameterTypeTransformer';

declare global {
  // eslint-disable-next-line no-var
  var config: any;
}

/**
 * Parameter type for parsing data from the memory or providing simple data to the step definition
 */
defineParameterType({
  name: 'text',
  regexp: /'(.+)'/,
  transformer: memoryTransformer,
});

/**
 * Parameter type for basic validations
 */
defineParameterType({
  name: 'validation',
  regexp: /(.+)/,
  transformer: validationTransformer,
});

/**
 * Basic initialization hook
 */
Before(async function () {
  const configPath = process.env.CONFIG as string;
  const profile = process.env.PROFILE as string;
  global.config = (await import(path.join(process.cwd(), configPath)))[profile];
  memory.register(config.memory ?? {});
});
