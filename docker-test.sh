#!/bin/bash
docker run -t --volume=$(pwd):/usr/local/lib/blessed-vue -w="/usr/local/lib/blessed-vue" node:6-wheezy ./test.sh
