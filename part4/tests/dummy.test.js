const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper').dummy

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper(blogs)
  assert.strictEqual(result, 1)
})