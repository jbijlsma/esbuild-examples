# Intro

Example of npm package written in typescript

# Deploying

Update the version in package.json:

```json
{
  ...
  "version": "0.0.1",
  ...
}
```

Then publish to the npm / local verdaccio registry:

```bash
pnpm i
npm run build
npm publish
```

If using verdaccio, make sure to run /verdaccio/start.sh in a seperate (vscode) terminal and check if .npmrc for the correct verdaccio port.

You can check in a folder which registry npm uses with:

```bash
npm config get registry
```
