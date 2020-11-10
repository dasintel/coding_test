const ruleGroup = require('./ruleGroup.js');
const rule = require('./rule.js');

const ruleGroupAll = {
  logic: ruleGroup.OP.ALL,
  rules: [
    {
      "answer": "y",
      "operation": rule.OP.IS,
      "question": "A"
    },
    {
      "answer": "z",
      "operation": rule.OP.IS_NOT,
      "question": "B"
    }
  ]
}

const ruleGroupAny = {
  logic: ruleGroup.OP.ANY,
  rules: [
    {
      "answer": "y",
      "operation": rule.OP.IS,
      "question": "A"
    },
    {
      "answer": "z",
      "operation": rule.OP.IS_NOT,
      "question": "B"
    }
  ]
}

const ruleGroupNested = {
  logic: ruleGroup.OP.ANY,
  rules: [
    {
      "answer": "u",
      "operation": rule.OP.IS,
      "question": "A"
    },
    {
      "answer": "v",
      "operation": rule.OP.IS,
      "question": "B"
    }
  ],
  ruleGroups: [
    {
      logic: ruleGroup.OP.ANY,
      rules: [
        {
          "answer": "w",
          "operation": rule.OP.IS,
          "question": "C"
        },
        {
          "answer": "x",
          "operation": rule.OP.IS,
          "question": "D"
        }
      ],
      ruleGroups: [
        {
          logic: ruleGroup.OP.ALL,
          rules: [
            {
              "answer": "y",
              "operation": rule.OP.IS,
              "question": "E"
            },
            {
              "answer": "z",
              "operation": rule.OP.IS,
              "question": "F"
            }
          ]
        }
      ]
    }
  ]
}

describe('checkGroup', () => {
  describe(ruleGroup.OP.ALL, () => {
    test('with correct answers', () => {
      expect(ruleGroup.checkGroup(ruleGroupAll, {
        A: 'y',
        B: 'no_match'
      })).toBe(true)
    })

    test('with incorrect answers', () => {
      expect(ruleGroup.checkGroup(ruleGroupAll, {
        A: 'z',
        B: 'no_match'
      })).toBe(false)
    })
  })

  describe(ruleGroup.OP.ANY, () => {
    test('with correct answers', () => {
      expect(ruleGroup.checkGroup(ruleGroupAny, {
        A: 'z',
        B: 'no_match'
      })).toBe(true)
    })

    test('with incorrect answers', () => {
      expect(ruleGroup.checkGroup(ruleGroupAny, {
        A: 'z',
        B: 'z'
      })).toBe(false)
    })
  })

  describe('with nested checks', () => {
    test('with correct answers', () => {
      expect(ruleGroup.checkGroup(ruleGroupNested, {
        A: 'u',
        B: 'no_match',
        C: 'w',
        D: 'no_match',
        E: 'y',
        F: 'z',
      })).toBe(true)
    })

    test('with incorrect answers', () => {
      expect(ruleGroup.checkGroup(ruleGroupNested, {
        A: 'u',
        B: 'no_match',
        C: 'w',
        D: 'no_match',
        E: 'y',
        F: 'no_match_',
      })).toBe(false)
    })
  })
})
