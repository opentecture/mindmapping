var nodes = [];
var camera;
var scene;
var renderer;
var transformControl;
var mesh;
var axesHelper;
var orbitControls;
var defaultNode;
var font;

// Scene
function resetScene() {
  scene.remove.apply(scene, scene.children);
  addTools();
}

// UI
function toggleHelp() {
  if ($("#help").attr("style") == "display: none;") {
    $("#help").show();
  } else {
    $("#help").hide();
  }
}

// IO
function openFile(files) {
  const reader = new FileReader();
  let json = {};
  reader.onload = function(event) {

    json = JSON.parse(reader.result);

    divLog.innerHTML =
      'name: ' + files.files[0].name + '<br>' +
      'size: ' + files.files[0].size.toLocaleString() + ' bytes<br>' +
      'type: ' + files.files[0].type + '<br>' +
      'modified: ' + files.files[0].lastModifiedDate.toLocaleDateString() +
      '';

    // Rendering
    $.each(json.cad, function(i, product) {
      var mesh = addNode();
      mesh.position.setX(product.positionX * 10);
      mesh.position.setY(product.positionY * 20);
      mesh.position.setZ(product.positionZ);

      mesh.userData.name = product.name;
      mesh.userData.text = product.name;
      mesh.userData.product = product.product;
      mesh.userData.positionX = product.positionX;
      mesh.userData.positionY = product.positionY;
      mesh.userData.positionZ = product.positionZ;
      mesh.userData.page = product.page;
      mesh.userData.website = product.website;
      mesh.userData.notes = product.notes;
      mesh.userData.svg = product.svg;

      var text = drawText(product.name);
      text.position.setX(product.positionX * 10);
      text.position.setY(product.positionY * 20);
      text.position.setZ(product.positionZ);
    })

  }

  reader.readAsText(files.files[0]);

  return json;

}

// GUI
function topDownView() {
  camera.position.set( 0, 2000, 0 );
}

function isomorphicView() {
  camera.position.set( 1000, 1000, 1000 );
}

function sideView() {
  camera.position.set( 1000, 0, 0 );
}

function otherSideView() {
  camera.position.set( 0, 0, 1000 );
}

// IO
function loadSTL() {
  const urlDefault = 'https://rawgit.com/opentecture/build/master/components/Door%20Handle.stl';
  loadSTLFileByURL(urlDefault, 'door handle');
}

function loadSTLFileByURL(path, fileName ) {
  let loader = new THREE.STLLoader();

  loader.load( path, function ( geometry ) {
    console.log( 'geo2', geometry );
    addMesh( geometry, fileName );
  } );

}

// IO
function loadSVG( url, item ) {
  url = '../../svg/' + "bear.svg"
  item = defaultNode;

  var loader = new THREE.SVGLoader();
  animal = loader.load( url , function ( paths ) {

    var group = new THREE.Group();
    group.scale.multiplyScalar( 0.1 );
    group.scale.y *= -1;
    var material = new THREE.MeshNormalMaterial( { side: 2 } );

    for ( var i = 0; i < paths.length; i ++ ) {

      var path = paths[ i ];

      var shapes = path.toShapes( true );

      for ( var j = 0; j < shapes.length; j ++ ) {

        var shape = shapes[ j ];

        geometry = new THREE.ExtrudeGeometry( shape, { bevelEnabled: false, depth: 15 } );
        geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
        geometry.center();
        var mesh = new THREE.Mesh( geometry, material );

        group.add( mesh );
        mesh.userData = item;
        nodes.push(mesh);
      }

    }


    x = item.positionX ? item.positionX : 1000 * Math.random() - 500;
    y = 25;
    z = item.positionZ ? item.positionZ : 800 * Math.random();

    group.position.set( 1, 1, 0 );

    scene.add(group);

    nodes.push(group);

    return group;

  } );
}

function addMesh( geometry, name) {
  geometry.center();
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  let material = new THREE.MeshNormalMaterial( { side: 2 } );

  scene.remove( mesh );
  mesh = new THREE.Mesh( geometry, material );
  mesh.name = name;
  addTransformControls( mesh );
  scene.add( mesh );
  zoomExtents( mesh );

}

function zoomExtents( mesh ) {

  mesh.geometry.computeBoundingSphere();

  let bs = mesh.geometry.boundingSphere;

  orbitControls.target = bs.center;

  camera.position.set( bs.center.x + bs.radius, bs.center.y + bs.radius, bs.center.z + bs.radius );
  camera.far = 3 * camera.position.length();
  camera.updateProjectionMatrix();

  // axesHelper.scale.set( bs.radius, bs.radius, bs.radius );

}

function addTools() {
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 3000 );
  camera.position.set( 1000, 500, 1000 );
  camera.lookAt( new THREE.Vector3( 0, 200, 0 ) );
  scene = new THREE.Scene();
  scene.add( new THREE.GridHelper( 1000, 10 ) );
  var light = new THREE.DirectionalLight( 0xffffff, 2 );
  light.position.set( 1, 1, 1 );
  scene.add( light );
  orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
  orbitControls.damping = 0.2;
}

function drawText(text = "Hello 3d World") {
  var textGeometry = new THREE.TextGeometry( text, {
    font: font,
    size: 24,
    height: 1,
    curveSegments: 4
  } );

  var textMaterial = new THREE.MeshPhongMaterial(
    { color: 0xE50000, specular: 0xffffff }
  );

  var textMesh = new THREE.Mesh( textGeometry, textMaterial );

  scene.add( textMesh )

  // addTransformControls(textMesh);
  return textMesh;
}

var loader = new THREE.FontLoader();

loader.load( 'https://cdn.rawgit.com/mrdoob/three.js/r93/examples/fonts/gentilis_regular.typeface.json', function ( loadedFont ) {
  font = loadedFont;
  init();
} );

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor (0x060906, 1);
  document.body.appendChild( renderer.domElement );

  addTools();

  trackballControls = new THREE.TrackballControls( camera, renderer.domElement );
  trackballControls.rotateSpeed = 1.5;
  trackballControls.zoomSpeed = 1.2;
  trackballControls.panSpeed = 0.5;
  trackballControls.noZoom = false;
  trackballControls.noPan = false;
  //trackballControls.staticMoving = true;
  //trackballControls.dynamicDampingFactor = 0.3;

  axesHelper = new THREE.AxesHelper( 50 );
  scene.add( axesHelper );

  defaultNode = addNode();

  $("#help").hide();

  // The Vertical Value Chain Axis of the Wardley Map
  var dir = new THREE.Vector3( 0, 100, 0 );
  var origin = new THREE.Vector3( 0, 0, 0 );
  var dir2 = new THREE.Vector3( 0, -100, 0 );
  const arrowHelper = new THREE.ArrowHelper( dir, origin, 700, 0xffffff , 25 );
  const arrowHelper2 = new THREE.ArrowHelper( dir2, origin, 700, 0xffffff , 25 );
  scene.add( arrowHelper );
  scene.add( arrowHelper2 );

  // Handle Resizing
  window.addEventListener( 'resize', onWindowResize, false );
  window.addEventListener( 'orientationchange', onWindowResize, false );

  // Key Controls
  window.addEventListener( 'keydown', function ( event ) {
    switch ( event.keyCode ) {
      case 81: // Q
        transformControl.setSpace( transformControl.space === "local" ? "world" : "local" );
        break;
      case 17: // Ctrl
        transformControl.setTranslationSnap( 100 );
        transformControl.setRotationSnap( THREE.Math.degToRad( 15 ) );
        break;
      case 87: // W
        transformControl.setMode( "translate" );
        break;
      case 69: // E
        transformControl.setMode( "rotate" );
        break;
      case 82: // R
        transformControl.setMode( "scale" );
        break;
      case 187:
      case 107: // +, =, num+
        transformControl.setSize( transformControl.size + 0.1 );
        break;
      case 189:
      case 109: // -, _, num-
        transformControl.setSize( Math.max( transformControl.size - 0.1, 0.1 ) );
        break;
    }
  });
  window.addEventListener( 'keyup', function ( event ) {
    switch ( event.keyCode ) {
      case 17: // Ctrl
        transformControl.setTranslationSnap( null );
        transformControl.setRotationSnap( null );
        break;
    }
  });
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  animate();
}

function render() {
  transformControl.update();
  orbitControls.update();
  renderer.render( scene, camera );
}
// Or
function animate() {
  requestAnimationFrame( animate );
  transformControl.update();
  orbitControls.update();
  trackballControls.update();
  renderer.render( scene, camera );
}

function addTransformControls(mesh) {
  transformControl = new THREE.TransformControls( camera, renderer.domElement );
  transformControl.addEventListener( 'change', render );
  transformControl.attach( mesh );
  scene.add( transformControl );
}

function addNodeGroup(options) {
  group = new THREE.Object3D(); //create an empty container
  node = addNode(options)
  text = drawText()
  group.add( text );
  group.add( node );
  scene.add( group ); //when done, add the group to the scene
  return group;
}

function addNode(options = { style: "plane", text: "Hello World" }) {
  if (options.style == "plane") {
    var geometry = new THREE.PlaneGeometry( 200, 200, 4 );
    var material = new THREE.MeshBasicMaterial( { color: 0xF9FF1B, side: THREE.DoubleSide } );
  } else if (options.style == "cargo box") {
    var texture = new THREE.TextureLoader().load( 'textures/crate.gif', render );
    texture.mapping = THREE.UVMapping;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    var material = new THREE.MeshLambertMaterial( { map: texture } );
  }

  var mesh = new THREE.Mesh( geometry, material );
  addTransformControls(mesh)
  scene.add( mesh );

  // Display Node Information
  const dragcontrols = new THREE.DragControls( nodes, camera, renderer.domElement ); //
  dragcontrols.enabled = false;
  dragcontrols.addEventListener( 'hoveron', function ( event ) {
    transformControl.attach( event.object );
    showNodeDetails( event.object );
  } );

  dragcontrols.addEventListener( 'dragstart', function ( event ) {
    trackballControls.enabled = false;
    //console.log( 'event', event );
    // setEdit( event.object.userData );

  } );
  dragcontrols.addEventListener( 'dragend', function ( event ) { trackballControls.enabled = true; } );


  // Push Mesh into Global Array
  nodes.push( mesh );

  return mesh;
}

function showNodeDetails(node) {
  $("#edit-node input[name='name']").val(node.userData.name);
  $("#edit-node input[name='text']").val(node.userData.name);
  $("#edit-node input[name='product']").val(node.userData.product);
  $("#edit-node input[name='positionX']").val(node.userData.positionX);
  $("#edit-node input[name='positionY']").val(node.userData.positionY);
  $("#edit-node input[name='positionZ']").val(node.userData.positionZ);
  $("#edit-node input[name='page']").val(node.userData.page);
  $("#edit-node input[name='website']").val(node.userData.website);
  $("#edit-node input[name='notes']").val(node.userData.notes);
  $("#edit-node input[name='svg']").val(node.userData.svg);
}

// For the Demo
function drawConnections(target) {
  for ( let obj of nodes ) {
    const dir = target.position.clone().sub( obj.position ).normalize();
    const arrowHelper = new THREE.ArrowHelper( dir, obj.position, 0.8 * obj.position.distanceTo( target.position ), 0xffffff * Math.random(), 50 );
    scene.add( arrowHelper );
  }
}

function drawLineConnection( box1, box2 ) {

  const material = new THREE.LineBasicMaterial( { color: 0xffffff * Math.random() } );

  geometry = new THREE.Geometry();
  geometry.vertices = [ box1.position, box2.position ];
  const line = new THREE.Line( geometry, material );
  scene.add( line );

}

// DemoMode is for exercising the sample features of the Mindmap.
function demoMode() {
  // Create 5 nodes
  var box = addNode({ style: "cargo box" })
  box.position.setY(800);
  box.position.setZ(0);
  var box2 = addNode();
  box2.position.setZ(600);
  var box3 = addNode();
  box3.position.setX(600);
  var box4 = addNode();
  box4.position.setZ(-600);
  var box5 = addNode();
  box5.position.setX(-600);

  // And draw lines from each to the first box
  drawConnections(box);
  drawLineConnection(box2, box3);
  drawLineConnection(box2, box5);
  drawLineConnection(box3, box4);
  drawLineConnection(box5, box4);

  toggleRotation()
}

function toggleRotation() {
  orbitControls.autoRotate = !orbitControls.autoRotate;
}

function onHashChange() {

  const path = 'https://rawgit.com/opentecture/build/master/';
  const fileName = location.hash ? location.hash.slice( 1 ) : urls[ Math.floor( Math.random() * urls.length ) ].path;
  console.log( 'path', path );
  console.log( 'fileName', fileName );
  loadSTLFileByURL( path + fileName, fileName );

}

window.addEventListener('hashchange', onHashChange, false);
function fetchGitHubFolderContents() {
  const url = 'https://api.github.com/repos/opentecture/build/git/trees/master?recursive=1';

  const request = new Request( url );

  fetch( request )
    .then( response => response.json() )
    .then( json => callbackGitHubMenu( json.tree ) );

}

function callbackGitHubMenu ( files ) {

  const urlGitHubSource = 'https://github.com/opentecture/build/tree/master/';
  const urlGitHubPage = 'https://rawgit.com/opentecture/build/master/';
  const iconGitHubMark = '<img src="https://rawgit.com/ladybug-tools/spider/master/images/github-mark.png" height=14 style=vertical-align:middle>';

  let txt = '';
  urls = [];
  for ( let file of files) {
    if ( !file.path.endsWith( '.stl' ) ) { continue; }
    urls.push( file )
    const fileName = encodeURI( file.path );

    txt +=

    `<div style=margin:10px; >

      <a href=${ urlGitHubSource + fileName } title="Edit me" >${ iconGitHubMark }</a>

      <a href=#${ urlGitHubPage + fileName } title="${ file.size.toLocaleString() } bytes" >${ file.path.slice( 10 ) }</a>

      <a href=${ urlGitHubPage + fileName } title="Link to just this file" >&#x2750;</a>

    </div>`;

  }

  divGallery.innerHTML = txt;
}

$(function() {
  $("#new-plane-button").on("click", function() {
    addNode( { style: "plane" } )
  });

  $("#new-cargo-box-button").on("click", function() {
    addNode( { style: "cargo box" } )
  });

  $("#demo-mode-button").on("click", function() {
    demoMode();
  });
});
