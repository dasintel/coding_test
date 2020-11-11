# DAS Coding Test

## Introduction

One of the core pieces of functionality at DAS is our reports system. This system allows customers to define customised workflows which combine DAS data with data entered by the user to produce reports which are consumed in the form of PDFs emailed to the user along with API requests.

At the heart of this system is our rules engine. Visually, it can be represented as follows:

```
+-------------+          +-------------+          +-------------+
|             |          |             |          |             |
| Questions A +----------+ Questions C +----------+ Questions D |
|             |          |             |          |             |
+-----+-------+          +-------------+          +-------------+
      |
      |
      |
      |
+-----+-------+
|             |
| Questions B |
|             |
+-------------+

```

Each "Questions" block contains a rule group. Each rule group can contain a number of rules or further rule groups nested under it. This allows us to define a number of questions but also the rules around how those questions must be answered, including comparisons with other questions.

Once a block of questions has been completed, the user can move on to the next block. In the above diagram, completing "Questions A" would allow the user to move on to either "Questions B" or "Questions C".

## Simple example

Given the following configuration:

```javascript
const ruleGroupAll = {
  logic: ruleGroup.OP.ALL,
  rules: [
    {
      "answer": "yes",
      "operation": rule.OP.IS,
      "question": "Do you have a drivers license?"
    },
    {
      "answer": "yes",
      "operation": rule.OP.IS_NOT,
      "question": "Are you under 15?"
    }
  ]
}
```

For these two questions, the user must answer "yes" that they have a drivers license and that they are not under 15 to progress. This is an "ALL" group logic so all questions must satisfy the answer criteria for the user to progres.

## Complex example

```javascript
const ruleGroupNested = {
  logic: ruleGroup.OP.ANY,
  rules: [
    {
      "answer": "no",
      "operation": rule.OP.IS,
      "question": "Do you have trouble walking long distances?"
    }
  ],
  ruleGroups: [
    {
      logic: ruleGroup.OP.ANY,
      rules: [
        {
          "answer": "yes",
          "operation": rule.OP.IS,
          "question": "Did you have lunch today?"
        },
        {
          "answer": "yes",
          "operation": rule.OP.IS,
          "question": "Did you have morning tea today?"
        }
      ],
    }
  ]
}
```

This question set contains three questions. The first must be answered "no" and either of the second two (Did you have lunch / morning tea) must be answered yes. You can see here that a rule group can contain a mixture of top level rules and nested rule groups.

## The coding test

Your job is to provide the function for checking the rule groups (see the file `src/ruleGroup.js`). We have already provided a rule.js function along with tests to show how it works. We have also provided tests for the `ruleGroup` functions but these will fail until an implementation has been provided.

**Feel more comfortable in a language that is not JavaScript?** We get it, JavaScript is not the worlds greatest language, however it is part of our stack. If you would like, feel free to solve this problem in a language of your choosing. One caveat exists with using a different language, we do need to be able to run a similar set of tests that exist in the JavaScript implementation.

## Steps

1. Clone / download our coding test repository.

2. Implement the function under `ruleGroup` until the tests pass. If you cannot get all tests to pass, please complete as many as possible.

3. Tar your solution and send the archive to samr@dasintel.io

## Setup

To make running the coding test easier, we have provided a setup that will easily work with Docker if you have it installed. Simply:

1. Run `make build` to produce a docker image to work with.
2. Run `make test` to check your implementation.

You can make changes then re-run `make test` to check your implementation.
