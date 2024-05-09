# Build

**NOTE**

For simplicity and to reduce reliance on third party libraries, I made the choice to use relative paths for imports and remove all module aliases. While import readability goes down, build simplicity increases drastically and the build should work universally now across all build pipelines. Building now only requires:

```bash
tsc
```

The tsconfig also has been updated to emit declaration files for each js file with associated typescript types and uses bundlr instead of node module resolution. All module imports are also appended with `.js` extension so that the distribution folder can understand all relative imports and conform with `esm` rules. Below were the required fields to get bundlr to output the compiled javascript that I wanted.

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "moduleResolution": "bundler",
    "module": "es2022",
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "dom",
      "es2022"
    ],
    "baseUrl": "."
  }
}
```