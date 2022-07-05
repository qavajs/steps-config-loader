import { expect } from 'chai';
import { test, jest } from '@jest/globals';
import * as cucumber from '@cucumber/cucumber';

jest.mock('@cucumber/cucumber');

test('should import index', async () => {
  await import('../index.js');
  // @ts-ignore
  expect(cucumber.Before.mock.calls.length).to.equal(1);
  // @ts-ignore
  expect(cucumber.defineParameterType.mock.calls.length).to.equal(6);
});
