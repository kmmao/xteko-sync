'use strict';

import {commands, workspace, window, ExtensionContext} from 'vscode';

// Extension activate
export function activate(context: ExtensionContext) {

    // Observe command to setup host
    context.subscriptions.push(commands.registerCommand('extension.setHost', () => {
        window.showInputBox({
            placeHolder: 'Example: 10.106.144.196',
            value: workspace.getConfiguration().host
        }).then(value => {
            if (value.length > 0) {
                workspace.getConfiguration().update('host', value, true);
                window.showInformationMessage('Host: ' + value);
            }
        });
    }));

    // Observe file changes
    let path = window.activeTextEditor.document.fileName;
    let watcher = workspace.createFileSystemWatcher(path);

    watcher.onDidChange((event) => {

        // Check host is available
        let host = workspace.getConfiguration().host;

        if (host.length === 0) {
            onError('Host is unavailable');
            return;
        }

        // Upload file to server
        var request = require('request');
        var fs = require('fs');
        var formData = {'files[]': fs.createReadStream(path)};
        request.post({url: 'http://' + host + '/upload', formData: formData}, (error) => {
            if (error) {
                onError(error);
            }
        });
    });
}

// Show error message
function onError(error) {
    console.error(error);
    window.showErrorMessage(error);
}
