import {validationTransformer} from '../src/parameterTypeTransformer';
import {expect} from 'chai';

type TestParams = {
    validation: string,
    positiveArgs: [any, any],
    negativeArgs: [any, any],
    expectedError: string
}
const tests:Array<TestParams> = [
    {
        validation: 'equals',
        positiveArgs: [1, 1],
        negativeArgs: [1, 2],
        expectedError: 'expected 1 to deeply equal 2'
    },
    {
        validation: 'does not equals',
        positiveArgs: [1, 2],
        negativeArgs: [1, 1],
        expectedError: 'expected 1 to not deeply equal 1'
    },
    {
        validation: 'matches',
        positiveArgs: ['expression', '^expression$'],
        negativeArgs: ['expression', '^espresso$'],
        expectedError: '\'expression\' to match /^espresso$/'
    },
    {
        validation: 'does not match',
        positiveArgs: ['expression', '^espresso$'],
        negativeArgs: ['expression', '^expression$'],
        expectedError: '\'expression\' not to match /^expression$/'
    },
    {
        validation: 'contains',
        positiveArgs: ['expression', 'expr'],
        negativeArgs: ['expression', 'esp'],
        expectedError: 'expected \'expression\' to include \'esp\''
    },
    {
        validation: 'does not contain',
        positiveArgs: ['expression', 'esp'],
        negativeArgs: ['expression', 'expr'],
        expectedError: 'expected \'expression\' to not include \'expr\''
    },
    {
        validation: 'have members',
        positiveArgs: [[1,2,3], [3,2,1]],
        negativeArgs: [[1,2,3], [4]],
        expectedError: 'expected [ 1, 2, 3 ] to have the same members as [ 4 ]'
    },
    {
        validation: 'does not have members',
        positiveArgs: [[1,2,3], [4]],
        negativeArgs: [[1,2,3], [3,2,1]],
        expectedError: 'expected [ 1, 2, 3 ] to not have the same members as [ 3, 2, 1 ]'
    },
];

test.each(tests)('$validation', ({validation, positiveArgs, negativeArgs, expectedError}) => {
    const verify = validationTransformer(validation);
    const catcherPositive = () => verify(...positiveArgs);
    const catcherNegative = () => verify(...negativeArgs);
    expect(catcherPositive).to.not.throw();
    expect(catcherNegative).to.throw(expectedError);
});
