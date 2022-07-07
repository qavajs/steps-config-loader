import { defineParameterType } from '@cucumber/cucumber';
import { memoryTransformer, validationTransformer } from './parameterTypeTransformer';
import { validationRegexp } from './verify';
/**
 * Parameter type for parsing data from the memory or providing simple data to the step definition
 */
defineParameterType({
  name: 'text',
  regexp: /'(.+)'/,
  transformer: memoryTransformer,
  useForSnippets: false,
});

/**
 * Parameter type for basic validations
 */
defineParameterType({
  name: 'validation',
  regexp: validationRegexp,
  transformer: validationTransformer,
  useForSnippets: false,
});

/**
 * Used for returning key code by key name
 */
defineParameterType({
  regexp: /"([^"\\]*(\\.[^"\\]*)*)"/,
  transformer(keyName: string) {
    const KEYS: any = {
      Enter: 'Enter',
      'Ctrl+A': process.platform === 'darwin' ? ['Meta', 'a'] : ['\uE009', 'a'],
      Tab: 'Tab',
      ArrowRight: 'ArrowRight',
      ArrowLeft: 'ArrowLeft',
    };
    return KEYS[keyName];
  },
  name: 'key',
  useForSnippets: false,
});

/**
 * Used for returning negative value
 */
defineParameterType({
  regexp: /not |/,
  transformer(negation: string) {
    return !!negation;
  },
  name: 'negation',
  useForSnippets: false,
});

/**
 * Used for returning ignoring case condition
 */
defineParameterType({
  regexp: /| ignoring case/,
  transformer(condition: string) {
    return !!condition;
  },
  name: 'caseSensitive',
  useForSnippets: false,
});

/**
 * Used to compare numbers
 */
defineParameterType({
  regexp: /equal|below|above/,
  transformer(condition: string) {
    const CONDITIONS: any = {
      equal: 'equal',
      below: 'isBelow',
      above: 'isAbove',
    };
    return CONDITIONS[condition];
  },
  name: 'numberComparison',
  useForSnippets: false,
});
