#!/usr/bin/env bash
# Publish what's in this folder right now (committed or not) to the test site,
# https://bhav1509.github.io/Purrsuade-test/ (GitHub repo bhav1509/Purrsuade-test, Pages from main). The test site
# uses the test backend (env.js, cloud.js), so live players never see it. main and the live site are left alone.
#
#   scripts/deploy-test.sh
#
# The build is stamped X.Y.Z-test.MMDDHHMM (shown in Settings → About; it also refreshes phones' offline copy).
set -euo pipefail
cd "$(dirname "$0")/.."
remote=https://github.com/bhav1509/Purrsuade-test.git

node --check env.js && node --check app.js && node --check cloud.js && node --check room-art.js
node scripts/check-prompt.mjs

cur=$(sed -n "s/^const APP_VERSION='\([0-9]*\.[0-9]*\.[0-9]*\)';.*/\1/p" app.js)
build="$cur-test.$(date +%m%d%H%M)"

# A snapshot of the working folder in a throwaway index (what .gitignore ignores stays out), with the build stamp
# written into the copies of app.js, sw.js and index.html only. The test build also gets the icons with a TEST band
# (icons/test, made by scripts/make-test-icons.mjs) and the name "Test Purrsuade" for the installed app.
idx=$(mktemp); trap 'rm -f "$idx"' EXIT
export GIT_INDEX_FILE=$idx
git read-tree HEAD
git add -A
stamp(){ git update-index --cacheinfo "100644,$(sed "$2" "$1" | git hash-object -w --stdin),$1"; }
stamp app.js "s/^const APP_VERSION='[^']*';/const APP_VERSION='$build';/"
stamp sw.js "s/^const CACHE='[^']*';/const CACHE='purrsuade-v$build';/"
stamp index.html "s/?v=[0-9.]*\"/?v=$build\"/g; s/\(apple-mobile-web-app-title\" content=\"\)Purrsuade\"/\1Test Purrsuade\"/; s/\(icons\/[a-z0-9-]*\.png\)\"/\1?v=$build\"/g"
stamp manifest.webmanifest 's/"name": "Purrsuade"/"name": "Purrsuade (test)"/; s/"short_name": "Purrsuade"/"short_name": "Test Purrsuade"/'
for f in icons/test/*; do git update-index --cacheinfo "100644,$(git hash-object -w "$f"),icons/${f#icons/test/}"; done
tree=$(git write-tree)
unset GIT_INDEX_FILE
commit=$(git commit-tree "$tree" -p HEAD -m "Test build $build (from $(git rev-parse --short HEAD) plus local changes)")

git -c http.postBuffer=524288000 -c http.version=HTTP/1.1 push -q -f "$remote" "$commit:refs/heads/main"
echo "Published test build $build → https://bhav1509.github.io/Purrsuade-test/ (live in a minute or two)"
