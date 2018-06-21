function openFile(files) {
  const reader = new FileReader();
  reader.onload = function(event) {

    json = JSON.parse(reader.result);
    console.log('json', json);

    getVoxel(json);

    divLog.innerHTML =
      'name: ' + files.files[0].name + '<br>' +
      'size: ' + files.files[0].size.toLocaleString() + ' bytes<br>' +
      'type: ' + files.files[0].type + '<br>' +
      'modified: ' + files.files[0].lastModifiedDate.toLocaleDateString() +
      '';

    console.log('', files);

  }

  reader.readAsText(files.files[0]);
}

function saveFile() {
  js = JSON.stringify(json, null, ' ');
  // console.log('js', js);
  var blob = new Blob([js]);
  var a = document.body.appendChild(document.createElement('a'));
  a.href = window.URL.createObjectURL(blob);
  a.download = 'mindmap-3d.json';
  a.click();
  //		delete a;
  a = null;
}
