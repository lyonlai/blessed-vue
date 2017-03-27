/* @flow */
import {
  isReservedTag,
  isPreTag,
  isUnaryTag,
  mustUseProp,
  canBeLeftOpenTag,
  getTagNamespace
} from 'node-blessed/util/index'
import { createCompiler } from 'compiler/index'

export const baseOptions: CompilerOptions = {
  expectHTML: true,
  modules: [],
  directives: {},
  isPreTag,
  isUnaryTag,
  mustUseProp,
  canBeLeftOpenTag,
  isReservedTag,
  getTagNamespace,
  staticKeys: []
}

const { compile, compileToFunctions } = createCompiler(baseOptions)
export { compile, compileToFunctions }
