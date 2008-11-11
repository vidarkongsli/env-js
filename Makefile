
ENV = dist/env.rhino.js
TEST = test/test.js

JAR = java -jar rhino/js.jar

test-rhino:
	@@${JAR} ${TEST}

run-rhino:
	echo "load('dist/env.rhino.js');window.location='test/index.html';" | ${JAR}
