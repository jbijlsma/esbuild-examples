# Intro

Simple example of using esbuild with aws sam.

# Deploy

```bash
npm run deploy
```

# Initial setup

Install the AWS SAM cli:

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

There is also the AWS Toolkit for Visual Studio Code and Jetbrains IntelliJ based IDEs (including Rider).

```bash
mkdir sam-lambda
cd sam-lambda
sam init

npm run unit
npm run lint
sam deploy --guided
sam sync --stack-name {stackname}

sam local start-api [OPTIONS]
sam local start-lambda [OPTIONS]
```
