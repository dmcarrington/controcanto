#! /bin/bash
mkdir -p /home/amnesia/Persistent/bisq/Bisq/

wget https://bisq.network/downloads/v1.9.18/Bisq-64bit-1.9.18.deb
curl https://bisq.network/pubkey/E222AA02.asc | gpg --import

mv Bisq-64bit-1.9.18.deb /home/amnesia/Persistent/bisq/

INSTALL_FILE="/home/amnesia/Persistent/bisq/install-bisq.sh"
touch $INSTALL_FILE
chmod +x $INSTALL_FILE

cat <<EOF >$INSTALL_FILE
#!/bin/bash
BisqInstaller=/home/amnesia/Persistent/bisq/Bisq-64bit-1.9.18.deb
DataDirectory=/home/amnesia/Persistent/bisq/Bisq

echo "Install Bisq ..."
dpkg -i \$BisqInstaller
echo "Change access rights of /var/run/tor/control.authcookie ..."
chmod o+r /var/run/tor/control.authcookie
echo "Create /etc/onion-grater.d/bisq.yml ..."
echo "---
- apparmor-profiles:
    - '/opt/bisq/bin/Bisq'
  users:
    - 'amnesia'
  commands:
    AUTHCHALLENGE:
      - 'SAFECOOKIE .*'
    SETEVENTS:
      - 'CIRC ORCONN INFO NOTICE WARN ERR HS_DESC HS_DESC_CONTENT'
    GETINFO:
      - pattern: 'status/bootstrap-phase'
        response:
          - pattern: '250-status/bootstrap-phase=*'
            replacement: '250-status/bootstrap-phase=NOTICE BOOTSTRAP PROGRESS=100 TAG=done SUMMARY="Done"'
      - 'net/listeners/socks'
    ADD_ONION:
      - pattern:     'NEW:(\S+) Port=9999,(\S+)'
        replacement: 'NEW:{} Port=9999,{client-address}:{}'
      - pattern:     '(\S+):(\S+) Port=9999,(\S+)'
        replacement: '{}:{} Port=9999,{client-address}:{}'
    DEL_ONION:
      - '.+'
    HSFETCH:
      - '.+'
  events:
    CIRC:
      suppress: true
    ORCONN:
      suppress: true
    INFO:
      suppress: true
    NOTICE:
      suppress: true
    WARN:
      suppress: true
    ERR:
      suppress: true
    HS_DESC:
      response:
        - pattern:     '650 HS_DESC CREATED (\S+) (\S+) (\S+) \S+ (.+)'
          replacement: '650 HS_DESC CREATED {} {} {} redacted {}'
        - pattern:     '650 HS_DESC UPLOAD (\S+) (\S+) .*'
          replacement: '650 HS_DESC UPLOAD {} {} redacted redacted'
        - pattern:     '650 HS_DESC UPLOADED (\S+) (\S+) .+'
          replacement: '650 HS_DESC UPLOADED {} {} redacted'
        - pattern:     '650 HS_DESC REQUESTED (\S+) NO_AUTH'
          replacement: '650 HS_DESC REQUESTED {} NO_AUTH'
        - pattern:     '650 HS_DESC REQUESTED (\S+) NO_AUTH \S+ \S+'
          replacement: '650 HS_DESC REQUESTED {} NO_AUTH redacted redacted'
        - pattern:     '650 HS_DESC RECEIVED (\S+) NO_AUTH \S+ \S+'
          replacement: '650 HS_DESC RECEIVED {} NO_AUTH redacted redacted'
        - pattern:     '.*'
          replacement: ''
    HS_DESC_CONTENT:
      suppress: true" > /etc/onion-grater.d/bisq.yml
echo "Restart onion-grater service ..."
systemctl restart onion-grater.service
echo "Edit Bisq executable file ..."
sed -i 's+Exec=/opt/bisq/bin/Bisq+Exec=/opt/bisq/bin/Bisq --torControlPort 951 --torControlCookieFile=/var/run/tor/control.authcookie --torControlUseSafeCookieAuth+' /usr/share/applications/bisq-Bisq.desktop
echo "Redirect user data to Tails Persistent Storage ..."
ln -s \$DataDirectory /home/amnesia/.local/share/Bisq
echo "Installation complete."
EOF

FILE="/live/persistence/TailsData_unlocked/dotfiles/.local/share/applications/InstallBisq.desktop"
cat <<EOF >$FILE
[Desktop Entry]
Name=Install Bisq
Comment=Re-install Bisq after startup
Exec=sudo -i sh /home/amnesia/Persistent/bisq/install-bisq.sh
Icon=
Terminal=true
Type=Application
Categories=Unknown
MimeType=application/psbt;application/bitcoin-transaction;x-scheme-handler/bitcoin;x-scheme-handler/auth47;x-scheme-handler/lightning
EOF