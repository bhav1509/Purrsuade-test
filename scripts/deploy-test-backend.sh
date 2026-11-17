#!/usr/bin/env bash
# Create or update the test backend: a separate copy of everything in cloud/template.yaml (its own sign-in, progress
# bucket, usage table and API function), CloudFormation stack `purrsuade-test`. The live backend is never touched.
# The test site and localhost use it (env.js, cloud.js).
#
#   scripts/deploy-test-backend.sh
#
# Uses the `purrsuade` AWS profile. Deploy code bundles go to a small bucket, created on the first run.
set -euo pipefail
cd "$(dirname "$0")/.."
profile=purrsuade region=ap-southeast-2 stack=purrsuade-test
aws=(aws --profile "$profile" --region "$region")
bucket="purrsuade-deploy-$("${aws[@]}" sts get-caller-identity --query Account --output text)"

"${aws[@]}" s3api head-bucket --bucket "$bucket" 2>/dev/null ||
  "${aws[@]}" s3api create-bucket --bucket "$bucket" --create-bucket-configuration "LocationConstraint=$region" >/dev/null

# Package the function with production dependencies only, then put the dev tools back.
(cd cloud/src && npm ci --omit=dev --silent)
packaged=$(mktemp -t purrsuade-test).yaml
"${aws[@]}" cloudformation package --template-file cloud/template.yaml --s3-bucket "$bucket" --s3-prefix "$stack" \
  --output-template-file "$packaged" >/dev/null
(cd cloud/src && npm install --silent)

"${aws[@]}" cloudformation deploy --stack-name "$stack" --template-file "$packaged" \
  --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND --no-fail-on-empty-changeset --tags Project=purrsuade Env=test \
  --parameter-overrides DomainPrefix=purrsuade-test \
    AppOrigins=https://bhav1509.github.io,http://localhost:8080 \
    AppUrls=https://bhav1509.github.io/Purrsuade-test/,http://localhost:8080/ \
    DailyCoachLimit=20 GlobalDailyCoachLimit=100
rm -f "$packaged"

echo "Test backend ready. For the TEST_SITE values in cloud.js:"
"${aws[@]}" cloudformation describe-stacks --stack-name "$stack" --query 'Stacks[0].Outputs[].[OutputKey,OutputValue]' --output text
