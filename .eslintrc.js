module.exports = {
  'env': {
    'amd': false,
    'es6': true,
    'browser': true,
    'worker': false,
    'node': false,
    'shared-node-browser': false
  },

  'extends': [
    'eslint:recommended'
  ],

  'parserOptions': {
    'ecmaVersion': 2017,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': false
    }
  },

  'rules': {
    // possible errors
    'no-cond-assign': ['error', 'always'],
    'valid-jsdoc': ['warn', {
      'prefer': {
        'param': 'arg',
        'parameter': 'argument',
        'return': 'returns'
      }
    }],
    // best practice rules
    'curly': 'error',
    'dot-location': ['error', 'property'],
    'dot-notation': ['error', {
      'allowKeywords': false
    }],
    'eqeqeq': ['error', 'smart'],
    'guard-for-in': 'error',
    'no-caller': 'error',
    'no-else-return': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-magic-numbers': ['error', {
      'ignore': [0, 1]
    }],
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-param-reassign': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'prefer-promise-reject-errors': 'error',
    'require-await': 'error',
    // variable rules
    'no-undef-init': 'error',
    'no-use-before-define': 'error',
    // style rules
    'comma-dangle': ['warn', 'only-multiline'],
    'eol-last': ['warn', 'always'],
    'indent': ['error', 2],
    'implicit-arrow-linebreak': ['error', 'beside'],
    'linebreak-style': ['warn', 'unix'],
    'new-cap': 'error',
    'no-lonely-if': 'error',
    'no-tabs': 'warn',
    'no-trailing-spaces': 'warn',
    'quotes': ['error', 'single', {'avoidEscape': false}],
    'semi': ['error', 'never']
  }
}
