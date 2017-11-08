# xteko-sync README

With xteko-sync, you can write [xTeko](https://docs.xteko.com) script using VSCode easily.

When you save a script on VSCode, it runs on your iPhone automatically!

## Requirements

- Pin version >= v3.2.3
- Your iPhone and Desktop should using same WLAN
- Only available for JavaScript files currently

## Extension Settings

On iPhone, you should open debug mode of xTeko, then you can see the connection address.

On VSCode, only `host` should be configured:

* `xteko-sync.host`: web server host

There are also two super easy solutions to setup host:

- Click menu button at the top-right corner of your editor panel, there's a `Set Host` item
- Trigger VSCode command with command+shift+p, type sethost then execute the command

## Known Issues

- Sync operation might be fired multiple times, looks like an issue of watchdog

## Other Information

- GitHub repo: https://github.com/cyanzhong/xteko-sync
- Python script: https://github.com/cyanzhong/xteko-sync/blob/master/python/sync.py

## Release Notes

### 0.1.0

Initial release of xteko-sync