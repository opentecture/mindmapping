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

function drawConnections( boxes1, boxes2 ) {
  for ( let box1 of boxes1 ) {

    const material = new THREE.LineBasicMaterial( { color: 0xffffff * Math.random() } );

    for ( let box2 of boxes2 ) {

      const geometry = new THREE.Geometry();
      geometry.vertices = [ box1.position, box2.position ];
      const line = new THREE.Line( geometry, material );

      scene.add( line );
    }
  }
}

function drawBoxesLeft( count = 20 ) {
  const url = 'https://rawgit.com/tmm1/emoji-extractor/master/images/160x160/';

  const loader = new THREE.TextureLoader();

  for ( let i = 0; i < count; i++ ) {

    const texture = loader.load ( url + Math.floor( 1 + Math.random() * 846 ) + '.png' );
    texture.minFilter = THREE.LinearFilter;

    const geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );
    const material = new THREE.MeshBasicMaterial( { map: texture, opacity: 0.8, side: 2 } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 50 * Math.random() - 80, 120 * Math.random() - 50, 150 * Math.random() - 50 );
    //mesh.rotation.y = 1.56 ;
    mesh.rotation.z = 4 * Math.random() ;
    scene.add( mesh );
    boxesLeft.push( mesh );
  }
}

function drawBoxesCenter( count = 5 ) {
  const url = 'https://jaanga.github.io/cookbook-threejs/textures/im';

  const loader = new THREE.TextureLoader();

  for ( let i = 0; i < count; i++ ) {

    const texture = loader.load ( url + Math.floor( 1 + Math.random() * 17 ) + '.jpg' );
    texture.minFilter = THREE.LinearFilter;

    const geometry = new THREE.CylinderBufferGeometry( 10, 10, 10 );
    //geometry.applyMatrix( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );
    const material = new THREE.MeshBasicMaterial( { map: texture, opacity: 0.8, side: 2 } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 0, 30 * i - 60, 0 );
    //mesh.rotation.y = 1.56 ;
    mesh.rotation.z = 4 * Math.random() ;
    scene.add( mesh );
    boxesCenter.push( mesh )
  }
}

function drawBoxesRight() {
  url = 'https://api.github.com/repos/file-icons/source/contents/svg';

  var request = new Request( url );

  fetch( request )
    .then( response => response.json() )
    .then( json => callbackGitHubIcons( json ) );
}

function callbackGitHubIcons ( files ) {
  //console.log( 'files', files  );
  const url = 'https://rawgit.com/file-icons/source/master/svg/';

  const loader = new THREE.TextureLoader();

  for ( let i = 0; i < 30; i++ ) {

    const file = files[ Math.floor( Math.random() * 541 ) ].name
    const texture = loader.load ( url + file );
    texture.minFilter = THREE.LinearFilter;

    const geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );
    const material = new THREE.MeshBasicMaterial( { map: texture, opacity: 0.8, side: 2 } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 50 * Math.random() + 30, 120 * Math.random() - 50, 150 * Math.random() - 50 );
    //mesh.rotation.y = 1.56 ;
    mesh.rotation.z = 4 * Math.random() ;
    scene.add( mesh );
    boxesRight.push( mesh );
  }
}

function getVoxel( newJson, type ) {
  animals = ['bear.svg']

  for ( obj in newJson[ type] ) {
    const item = newJson[ type ][ obj ];

    url = item.svg ? item.svg : animals[ Math.floor( Math.random() * animals.length ) ];
    loaderSvg( url, item, type );
  }

  json[ type ] = newJson[ type ];

  if ( json.cad ) {
    setEdit( json.cad[ 1 ] );
  }
}
