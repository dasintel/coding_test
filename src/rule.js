var fp = require('lodash/fp');

const OP = {
  CONTAINS: 'CONTAINS',
  IS: 'IS',
  IS_NOT: 'IS_NOT',
}

const hasAnswer = (question, userAnswers) => {
  return fp.has(question, userAnswers)
}

const getAnswer = (question, userAnswers) => {
  return fp.get(question, userAnswers)
}

/**
 * This fuction is seperate from the checkRule to allow a scenerio where we might want to check despite the user not having an answer.
 */
const checkAnswer = (rule, userAnswers) => {
  answer = getAnswer(rule.question, userAnswers)

  if (rule.operation === OP.IS) {
    return answer === rule.answer;
  } else if (rule.operation === OP.IS_NOT) {
    return answer !== rule.answer;
  } else if (rule.operation === OP.CONTAINS) {
    return fp.includes(rule.answer)(answer);
  } else {
    throw new Error('Unknown operation');
  }
}

/*
 * This is the main entrypoint to checking rules. Unless you need to ignore checking if the user has an answer, use this function.
 */
const checkRule = (rule, userAnswers) => {
  if (hasAnswer(rule.question, userAnswers) === false) {
    return false;
  }

  return checkAnswer(rule, userAnswers)
}

module.exports = {
  OP,
  checkAnswer,
  checkRule,
  getAnswer,
  hasAnswer,
}
