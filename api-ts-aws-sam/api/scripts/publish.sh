 #!/usr/bin/env bash

# Clean previous ./publish folder
rm -rf ./publish
mkdir ./publish

# Make sure ./dist folder has the latest esbuild bundle
npm run build

# Make a copy of package.json without the devDependencies and copy it to the ./publish folder 
npm run copy-package-json

# Add node_modules prod folder to ./publish
cd ./publish
npm install --omit dev

# Copy esbuild bundle to ./publish
cd ..
cp ./dist/* ./publish

# Copy resources to ./publish
cp ./resources/* ./publish