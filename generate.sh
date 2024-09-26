#!/bin/bash

name=$1

cat $name.md | cmark | ./highlight.js > $name.html
