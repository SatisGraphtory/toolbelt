import * as prettier from "prettier";

const prettierConfig = {
  printWidth: 110,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'preserve',
  jsxSingleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  endOfLine: 'lf',
} as const;

export function pretty(code: string) {
  try {
    return prettier.format(code, {
      ...prettierConfig,
      filepath: '<any>.ts',
    });
  } catch (error) {
    process.stderr.write(`\n\n${code}\n\n`);
    throw new Error(error.message);
  }
}
