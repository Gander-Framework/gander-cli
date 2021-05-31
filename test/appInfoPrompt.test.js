import {fancy} from 'fancy-test'
import {expect} from 'chai'
const appInfoPrompt = require('../src/prompts/appInfoPrompt')


//this is a suite
describe('App Info Prompt', () => {
  //tests go here
  fancy
  // begin mocking stdout
  .stdout()
  .do(() => appInfoPrompt())
})


//this is a suite
describe('App Info Prompt', () => {
  // mock 
})