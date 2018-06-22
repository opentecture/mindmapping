function loaderSvg( url, item, type ) {

  //console.log( 'url', url );
  const urlGitHubPage = 'https://rawgit.com/opentecture/mindmapping/master/svg/';
  const material = new THREE.MeshToonMaterial( { color: Math.random() * 0xffffff, side: 2 } );

  const loader = new THREE.SVGLoader();
  loader.load( urlGitHubPage + url , function ( paths ) {

    if ( !item ) {
      item = {name: 'new', product: 'new', positionX : 0, positionY: 50, positionZ: 0, svg: url };
      json[ type ].push( item );
    }

    const path = paths[ 0 ];
    const shapes = path.toShapes( true );
    const shape = shapes[ 0 ];

    //console.log( 'item', item.positionY );
    const geometry = new THREE.ExtrudeGeometry( shape, { bevelEnabled: false, depth: 20 } );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
    geometry.applyMatrix( new THREE.Matrix4().makeScale( 0.1, 0.1, 0.1 ) );
    geometry.center();

    const mesh = new THREE.Mesh( geometry, material );
    //mesh.position.set( 100 * Math.random() - 50, 100 * Math.random() - 50, 100 * Math.random() - 50);

    x = item.positionX = item.positionX || 100 * Math.random() - 50;
    y = item.positionY = item.positionY || 50 + 100 * Math.random();
    z = item.positionZ = item.positionZ || 80 * Math.random();

    mesh.userData = item;
    mesh.position.set( x, y, z );
    mesh.rotation.z = item.positionX ? 0 : Math.PI;

    scene.add( mesh );
    things.push( mesh );

    //placard = drawPlacard([item.name, item.product], 0.3, 120, 0, 0, 100 );

    addLabel( mesh, item.name, new THREE.Vector3( 0, -1, 14 ), Math.random() * 0xffffff );

    addLabel( mesh, item.product, new THREE.Vector3( 0, 1, 11 ), Math.random() * 0xffffff);

    //mesh.add(placard);
  });
}

function getFileFormats( newJson ) {
  for ( obj in newJson.fileFormat ) {

    const item = newJson.fileFormat[ obj ];
    addFileFormat( item );
  }

  json.fileFormat = newJson.fileFormat;
}

function openFile(files) {
  const reader = new FileReader();
  reader.onload = function(event) {

    json = JSON.parse(reader.result);
    console.log('json', json);

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
