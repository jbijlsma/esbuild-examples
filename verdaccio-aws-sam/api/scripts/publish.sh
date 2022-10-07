 #!/usr/bin/env bash

# Clean previous ./publish folder
rm -rf ./publish
mkdir ./publish

# Make sure ./dist folder has the latest esbuild bundle
npm run build

# Make a copy of package.json without the devDependencies and copy it to the ./publish folder 
cp ./package.json ./publish

# Add node_modules prod folder to ./publish
cd ./publish
npm install --omit dev

# Copy esbuild bundle to ./publish
cd ..
cp ./dist/* ./publish