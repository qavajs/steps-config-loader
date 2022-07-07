import { expect } from 'chai';
import { test, beforeAll } from '@jest/globals';
import memory from '@qavajs/memory';
import { memoryTransformer } from '../src/parameterTypeTransformer';

beforeAll(() => {
  memory.register({
    constant: 42,
  });
  memory.setValue('value', 12);
});

test('get constant from memory', () => {
  expect(memoryTransformer('$constant')).eql(42);
});

test('get value from memory', () => {
  expect(memoryTransformer('$value')).eql(12);
});

test('get value that not exits in memory', () => {
  expect(memoryTransformer('value')).eql('value');
});
