# Run regular publish
npm run publish

# Create sam-publish folder that contains the exact same structure 
# as when the sam build command would have been used 
rm -rf ./.aws-sam
mkdir ./.aws-sam
cp ./samconfig.toml ./.aws-sam

mkdir ./.aws-sam/build
cp ./template.yaml ./.aws-sam

# Sam expects a folder for each Resource in ./template.yaml
# sam deploy will zip everything, so we don't need to do that here 
mkdir ./.aws-sam/build/ApiFunction
cp -r ./publish/* ./.aws-sam/build/ApiFunction