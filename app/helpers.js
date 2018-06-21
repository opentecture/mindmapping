function animate() {
  requestAnimationFrame(animate);
  //renderer.render(scene, camera);
  controls.update();
  effect.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  //console.log( 'onWindowResize  window.innerWidth', window.innerWidth );
}

function requestFile(url) {
  const xhr = new XMLHttpRequest();
  xhr.crossOrigin = 'anonymous';
  xhr.open('GET', url, true);
  xhr.onerror = function(xhr) {
    console.log('error:', xhr);
  };
  xhr.onprogress = function(xhr) {
    //console.log('bytes loaded:', xhr.loaded);
  };
  xhr.onload = callback;
  xhr.send(null);

  function callback(xhr) {
    const response = xhr.target.response;
    //console.log( 'response', response );
    //divContents.innerHTML = response;

    const newJson = JSON.parse(response);
    //console.log('json', json);

    //json.cad = newJson.cad;

    if ( newJson.cad ) {
      //json.cad = newJson.cad;
      //json.energyAnalysis = newJson.energyAnalysis;
      getVoxel( newJson, 'cad');
    }

    if ( newJson.energyAnalysis ) {
      //json.cad = newJson.cad;
      //json.energyAnalysis = newJson.energyAnalysis;
      getVoxel( newJson, 'energyAnalysis' );
    }

    if (newJson.fileFormat) {
      getFileFormats( newJson );
    }
  }
}
