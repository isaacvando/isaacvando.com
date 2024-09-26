#!/bin/bash

name=$1

cat $name.md | cmark | sed 's/<a /<a target="_blank" /g' | ./highlight.js > $name.html
