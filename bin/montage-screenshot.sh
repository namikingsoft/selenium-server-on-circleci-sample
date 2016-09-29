#!/bin/sh -eu

names=$(
  find screenshot -type f \
  | grep "\-\-" \
  | perl -pe 's/\-\-.*$//g;' \
  | uniq
)

for name in $names; do
  montage \
    -label %f \
    -frame 2 \
    -geometry +10+10 \
    "${name}--*" "${name}.png"
done
