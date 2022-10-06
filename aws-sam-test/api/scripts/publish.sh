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
yarn install --prod

# Copy esbuild bundle to ./publish
cd ..
cp ./dist/* ./publish

# Create zip file
cd ./publish
zip -r index.zip *