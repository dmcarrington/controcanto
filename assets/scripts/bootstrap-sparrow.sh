#! /bin/bash

mkdir -p ~/Persistent/Programs/Sparrow/data

wget https://github.com/sparrowwallet/sparrow/releases/download/2.0.0/sparrow-2.0.0-x86_64.tar.gz
wget https://github.com/sparrowwallet/sparrow/releases/download/2.0.0/sparrow-2.0.0-manifest.txt.asc
wget https://github.com/sparrowwallet/sparrow/releases/download/2.0.0/sparrow-2.0.0-manifest.txt
tar -xf sparrow-2.0.0-x86_64.tar.gz -C ~/Persistent/Programs/

mkdir -p /live/persistence/TailsData_unlocked/dotfiles/.local/share/applications

FILE="/live/persistence/TailsData_unlocked/dotfiles/.local/share/applications/Sparrow.desktop"
cat <<EOF >$FILE
[Desktop Entry]
Version=1.0
Name=Sparrow
Comment=Sparrow
Exec=/home/amnesia/Persistent/Programs/Sparrow/bin/Sparrow -d /home/amnesia/Persistent/Programs/Sparrow/data %U
Icon=/home/amnesia/Persistent/Programs/Sparrow/lib/Sparrow.png
Terminal=false
Type=Application
Categories=Internet
MimeType=application/psbt;application/bitcoin-transaction;x-scheme-handler/bitcoin;x-scheme-handler/auth47;x-scheme-handler/lightning
EOF

echo "done, please verify the Sparrow integrity by dragging the manifest files downloaded here onto the Sparrow window, or from the tools menu. Restart tails to access the Sparrow menu item."
