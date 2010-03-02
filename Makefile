JAR = java -jar rhino/js.jar

test-rhino:
	ant -emacs

run-rhino:
	echo "load('dist/env.rhino.js');window.location='test/index.html';" | ${JAR}
