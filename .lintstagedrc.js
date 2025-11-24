module.exports = {
  // TypeScript/JavaScript files
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],

  // JSON, Markdown, YAML files
  '*.{json,md,mdx,yml,yaml}': ['prettier --write'],

  // CSS/SCSS files
  '*.{css,scss}': ['prettier --write'],

  // Run type check on TypeScript files
  '*.{ts,tsx}': [() => 'tsc --noEmit'],
};
