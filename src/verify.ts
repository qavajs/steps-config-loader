import { expect } from 'chai';

export const validations = {
  EQUAL: 'equal',
  HAVE_MEMBERS: 'have member',
  MATCH: 'match',
  CONTAIN: 'contain',
  ABOVE: 'above',
  BELOW: 'below',
};

type VerifyInput = {
  AR: any;
  ER: any;
  validation: string;
  reverse: boolean;
};

const validationFns = {
  [validations.EQUAL]: (expectClause: any, ER: any) => expectClause.eql(ER),
  [validations.HAVE_MEMBERS]: (expectClause: any, ER: any) => expectClause.have.members(ER),
  [validations.MATCH]: (expectClause: any, ER: any) => expectClause.match(ER instanceof RegExp ? ER : new RegExp(ER)),
  [validations.CONTAIN]: (expectClause: any, ER: any) => expectClause.contain(ER),
  [validations.ABOVE]: (expectClause: any, ER: any) => expectClause.above(ER),
  [validations.BELOW]: (expectClause: any, ER: any) => expectClause.below(ER),
};

/**
 * Basic verification function
 * @param {VerifyInput} object with all needed data for validation
 */
export function verify({ AR, ER, validation, reverse }: VerifyInput): void | Error {
  const expectClause = reverse ? expect(AR).to.not : expect(AR).to;
  const validate = validationFns[validation];
  if (!validate) throw new Error(`validation '${validation}' is not supported`);
  validate(expectClause, ER);
}
