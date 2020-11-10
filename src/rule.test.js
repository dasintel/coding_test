const rule = require('./rule.js');

const ruleIs = {
  "answer": "w",
  "operation": rule.OP.IS,
  "question": "A"
}

const ruleIsNot = {
  "answer": "x",
  "operation": rule.OP.IS_NOT,
  "question": "B"
}

const ruleContains = {
  "answer": "y",
  "operation": rule.OP.CONTAINS,
  "question": "C"
}

const ruleUnknown = {
  "answer": "z",
  "operation": "non_existing",
  "question": "D"
}

describe('hasAnswer', () => {
  test('with no answer', () => {
    expect(rule.hasAnswer(ruleIs.question, {})).toBe(false);
  });

  test('with answer', () => {
    expect(rule.hasAnswer(ruleIs.question, {A: "yes"})).toBe(true);
  });
});

describe('getAnswer', () => {
  test('with no answer', () => {
    expect(rule.getAnswer(ruleIs.question, {})).toBe(undefined);
  });

  test('with answer', () => {
    expect(rule.getAnswer(ruleIs.question, {A: "yes"})).toBe("yes");
  });
});


describe('checkAnswer', () => {
  describe(rule.OP.IS, () => {
    test('without answer', () => {
      expect(rule.checkAnswer(ruleIs, {})).toBe(false);
    });

    test('with incorrect answer', () => {
      expect(rule.checkAnswer(ruleIs, {A: "incorrect"})).toBe(false);
    });

    test('with correct answer', () => {
      expect(rule.checkAnswer(ruleIs, {A: ruleIs.answer})).toBe(true);
    });
  });

  describe(rule.OP.IS_NOT, () => {
    test('without answer', () => {
      expect(rule.checkAnswer(ruleIsNot, {})).toBe(true);
    });

    test('with non matching answer', () => {
      expect(rule.checkAnswer(ruleIsNot, {B: "non matching"})).toBe(true);
    });

    test('with correct answer', () => {
      expect(rule.checkAnswer(ruleIsNot, {B: ruleIsNot.answer})).toBe(false);
    });
  });

  describe(rule.OP.CONTAINS, () => {
    test('without answer', () => {
      expect(rule.checkAnswer(ruleContains, {})).toBe(false);
    });

    test('with incorrect answer', () => {
      expect(rule.checkAnswer(ruleContains, {C: "incorrect"})).toBe(false);
    });

    test('with correct answer', () => {
      expect(rule.checkAnswer(ruleContains, {C: `x, y and ${ruleContains.answer}`})).toBe(true);
    });
  });

  test('unknown operation', () => {
    expect(() => {
      rule.checkAnswer(ruleUnknown, {});
    }).toThrow('Unknown operation')
  });
});

describe('checkRule', () => {
  test('with no answer', () => {
    expect(rule.hasAnswer(ruleContains, {})).toBe(false);
  });

  test('with answer', () => {
    expect(rule.checkAnswer(ruleIs, {A: ruleIs.answer})).toBe(true);
  });
});
