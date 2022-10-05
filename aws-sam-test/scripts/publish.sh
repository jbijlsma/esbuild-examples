 #!/usr/bin/env bash

# Make sure ./dist folder has the latest esbuild bundle
npm run build

# Add node_modules prod folder to ./publish
mkdir -p ./publish
cp ./package.json ./publish
cd ./publish
pnpm install -P
rm -rf ./node_modules/.pnpm
rm ./node_modules/.modules.yaml

# Copy esbuild bundle to ./publish
cd ..
cp ./dist/index.js ./publish

# Create zip file
cd ./publish
zip -r index.zip *