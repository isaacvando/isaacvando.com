#!/bin/bash

name=$1

export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

cat $name.md | ./highlight.js > $name.html
