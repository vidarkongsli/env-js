#!/bin/sh

# Usage: test-jquery.sh [version]
# Currently supported versions: 1.3.2, 1.3.1, and 1.2.6
#
# This script will check out the jQuery development tree from Subversion if necessary,
# massage the testing scripts as necessary, copy our latest version of env.js into place,
# and then run the test scripts.

if [ -n "$1" ]; then VERSION="$1"; else VERSION="1.3.2"; fi
JQUERY_DIR="test/vendor/jQuery/$VERSION"

ant concat

if [ ! -d "$JQUERY_DIR" ]; then
  svn export http://jqueryjs.googlecode.com/svn/tags/$VERSION/ $JQUERY_DIR
fi

cp dist/env.rhino.js $JQUERY_DIR/build/runtest/env.js
cp rhino/js.jar $JQUERY_DIR/build/js.jar
cp bin/jquery-$VERSION-test.js $JQUERY_DIR/build/runtest/test.js

cp test/testrunner.js $JQUERY_DIR/build/runtest/testrunner.js
perl -pi~ -e "s/^JAR(.*)\.jar$/JAR\1.jar -w -debug/" $JQUERY_DIR/Makefile

cd $JQUERY_DIR
make runtest
