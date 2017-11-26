#!/usr/bin/env bash

nodeAvailable() {
  which node >> /dev/null;
  if [ $? = "1" ]; then
    echo "Please install node and npm from: https://nodejs.org/en/";
    return 1  ;
  else
    echo "node already installed proceeding"
    return 0;
  fi
}

xcodeAvailable() {
  xcode-select --install >> /dev/null;
  if [ "$?" = "1" ]; then
    echo "Xcode already installed";
    return 0;
  else
    echo "Xcode not installed. Please install via prompt.";
    return 1;
  fi
}

moveFacebookSDK() {
  if [ -d ~/Documents/FacebookSDK ]; then
    echo "FacebookSDK already exsits, Do you want to overwrite it? [YES/NO]";

    read answer;

    if [ $answer = 'YES' ]; then
      echo "Overwriting FacebookSDK!";
      rm -rf ~/Documents/FacebookSDK;
      cp -fR ./vendor/FacebookSDK ~/Documents;
      return 1;
    else
      echo "Keep your current FacebookSDK!";
      return 0;
    fi
  else
    echo "Copying in FacebookSDK to ~/Documents/FacebookSDK";
    cp -fR ./vendor/FacebookSDK ~/Documents;
    return 1;
  fi
}

xcodeAvailable; xA=$?
nodeAvailable; nA=$?

if [[ $nA -eq 0 && $xA -eq 0 ]]; then
  echo "Installing npm dependcies..."
  npm install && \
  npm install react-native-cli -g && \
  moveFacebookSDK;
  react-native link;
fi
