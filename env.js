// Which copy of the app this is. The live site uses the live backend; the test site
// (https://bhav1509.github.io/Purrsuade-test/, published with scripts/deploy-test.sh) and this computer (localhost)
// use the test backend, so nothing tried there reaches real players or their progress.
const TEST_SITE=['localhost','127.0.0.1'].includes(location.hostname)||location.pathname.startsWith('/Purrsuade-test/');
// The test site shares the address bhav1509.github.io with the live one, and so the browser's storage: its saved
// data (progress, sign-in, device id…) goes under its own names.
const storeKey=k=>TEST_SITE?'test-'+k:k;
