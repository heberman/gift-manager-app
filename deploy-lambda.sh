#!/bin/bash

# Function name
FUNCTION_NAME="gift-manager-data"

cd lambda

# Create a ZIP file
zip -r ../function.zip .

cd ..

echo "Deployment package created: function.zip"

aws lambda update-function-code \
      --function-name $FUNCTION_NAME \
      --zip-file fileb://function.zip

# Clean up
rm function.zip

echo "Lambda function $FUNCTION_NAME deployed successfully"