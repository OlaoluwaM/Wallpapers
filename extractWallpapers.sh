#!/usr/bin/env bash

cd "$HOME/Pictures/Wallpapers" || exit 1
echo "Extracting Wallpapers"

[[ ! -f ./tarball/wallpapers.tar.gz ]] && {
  echo "Tarball wallpapers.tar.gz not found Exiting"
  exit 1
}

tar -xvf ./tarball/wallpapers.tar.gz

if [ $? -ne 0 ]; then
  echo -e "\nFailed"
else
  echo -e "\nDone!"
fi
