#!/bin/bash
#!/bin/bash

VERSION=$1

rm -rf ./dist/$VERSION/assets 2> /dev/null
rm -rf ./dist/$VERSION/classes 2> /dev/null
rm -rf ./dist/$VERSION/modules 2> /dev/null
rm -rf ./dist/$VERSION/interfaces 2> /dev/null
rm -fv ./dist/$VERSION/*.html