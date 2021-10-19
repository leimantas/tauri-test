import React, { useState } from 'react';

import { open, save } from '@tauri-apps/api/dialog';
import { readBinaryFile } from '@tauri-apps/api/fs';

const CustomModal = () => {
  const onMessage = (value: any) => {
    console.log([
      `[${new Date().toLocaleTimeString()}]` + ': ' + (typeof value === 'string' ? value : JSON.stringify(value))
    ]);
  };

  let [defaultPath, setDefaultPath] = useState('');
  let [filter, setFilter] = useState('');
  let [multiple, setMultiple] = useState(false);
  let [directory, setDirectory] = useState(false);

  const arrayBufferToBase64 = (buffer: any, callback: any) => {
    var blob = new Blob([buffer], {
      type: 'application/octet-binary'
    });
    var reader = new FileReader();
    reader.onload = function (evt) {
      var dataurl = evt.target?.result as string;
      callback(dataurl?.substr(dataurl?.indexOf(',') + 1));
    };
    reader.readAsDataURL(blob);
  };

  const openDialog = () => {
    open({
      defaultPath: defaultPath.length > 0 ? defaultPath : undefined,
      filters: filter
        ? [
            {
              name: 'Tauri Example',
              extensions: filter.split(',').map((f: any) => f.trim())
            }
          ]
        : [],
      multiple,
      directory
    })
      .then(function (res) {
        if (Array.isArray(res)) {
          onMessage(res);
        } else {
          var pathToRead = res;
          var isFile = pathToRead.match(/\S+\.\S+$/g);
          readBinaryFile(pathToRead)
            .then(function (response) {
              if (isFile) {
                if (pathToRead.includes('.png') || pathToRead.includes('.jpg')) {
                  arrayBufferToBase64(new Uint8Array(response), function (base64: any) {
                    var src = 'data:image/png;base64,' + base64;
                    onMessage('<img src="' + src + '"></img>');
                  });
                } else {
                  onMessage(res);
                }
              } else {
                onMessage(res);
              }
            })
            .catch(() => onMessage(res));
        }
      })
      .catch(onMessage);
  };

  const saveDialog = () => {
    save({
      defaultPath,
      filters: filter
        ? [
            {
              name: 'Tauri Example',
              extensions: filter.split(',').map((f: any) => f.trim())
            }
          ]
        : []
    })
      .then(onMessage)
      .catch(onMessage);
  };

  return (
    <div>
      <input
        id="dialog-default-path"
        placeholder="Default path"
        value={defaultPath}
        onChange={(e) => setDefaultPath(e.target.value)}
      />
      <input
        id="dialog-filter"
        placeholder="Extensions filter, comma-separated"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>
        <input
          type="checkbox"
          id="dialog-multiple"
          checked={multiple}
          onChange={(e) => setMultiple(e.target.checked)}
        />
        <label htmlFor="dialog-multiple">Multiple</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="dialog-directory"
          checked={directory}
          onChange={(e) => setDirectory(e.target.checked)}
        />
        <label htmlFor="dialog-directory">Directory</label>
      </div>

      <button id="open-dialog" onClick={openDialog}>
        Open dialog
      </button>
      <button id="save-dialog" onClick={saveDialog}>
        Open save dialog
      </button>
    </div>
  );
};

export default CustomModal;
