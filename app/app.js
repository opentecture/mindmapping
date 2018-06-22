var json = { "tt": 123 };
var group;
var things = [];

const boxesLeft = [];
const boxesCenter = [];
const boxesRight = [];

var renderer, camera, controls, scene;
var geometry, material, mesh, axesHelper;

var loader = new THREE.FontLoader();
loader.load( 'https://cdn.rawgit.com/mrdoob/three.js/r93/examples/fonts/gentilis_regular.typeface.json', function ( font ) {
	ffont = font
	init();
	animate();
} );

const v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

function init( font ) {

	const source = "https://github.com/pushme-pullyou/pushme-pullyou.github.io/blob/master/tootoo-templates/threejs-basic-hamburger-new.html";
	//const title = location.href.split( '/' ).pop().slice( 0, -5 ).replace( /-/g, ' ' );
	const title = document.title;

	divTitle.innerHTML =
		`<h2>
			<a href="${source}" target="_top" ><img src="https://status.github.com/images/invertocat.png" height=18 ></a>
			<a href = "" >${title}</a>
		</h2>
		<p>
			${document.head.querySelector( '[name=description]' ).content }
		</p>`;

	renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 100, 100, 100 );
	camera.up.set( 0, 0, 1 );

	controls = new THREE.OrbitControls( camera, renderer.domElement );

	scene = new THREE.Scene();

	const size = 100;
	lightAmbient = new THREE.AmbientLight( 0x444444 );
	scene.add( lightAmbient );

	lightDirectional = new THREE.DirectionalLight( 0xffeedd );
	lightDirectional.position.set( -size, size, size );
	lightDirectional.shadow.camera.scale.set( 0.1 * size, 0.1 * size, 0.5 );
	lightDirectional.castShadow = true;
	scene.add( lightDirectional );

	window.addEventListener( 'resize', onWindowResize, false );
	window.addEventListener( 'orientationchange', onWindowResize, false );
	window.addEventListener( 'keyup', function() { controls.autoRotate = false; }, false );
	renderer.domElement.addEventListener( 'click', function() { controls.autoRotate = false; }, false );

	var dragControls = new THREE.DragControls( things, camera, renderer.domElement );

	dragControls.addEventListener( 'dragstart', function ( event ) {

		controls.enabled = false;
		//console.log( 'event', event );
		setEdit( event.object.userData );

	} );

	dragControls.addEventListener( 'dragend', event => {

		controls.enabled = true;
		//console.log( 'event', event );

		currentItem = event.object.userData;
		inpPosX.value = event.object.position.x;
		setData( inpPosX );
		inpPosY.value = event.object.position.y;
		setData(inpPosY);
		inpPosZ.value = event.object.position.z;
		setData(inpPosZ);


	} );


	axesHelper = new THREE.AxesHelper( 50 );
	scene.add( axesHelper );

	geometry = new THREE.BoxGeometry( 50, 50, 50 );
	material = new THREE.MeshNormalMaterial();
	mesh = new THREE.Mesh( geometry, material );
	//scene.add( mesh );

	//loadSvg( 'goat.svg' );
	effect = new THREE.OutlineEffect( renderer );

	fetchLinks();

	let url = '../../data/mindmap-3d-3.json';

	requestFile(url);

	toggleBackgroundGradient();

	drawBoxesLeft();
	drawBoxesCenter();
	drawBoxesRight();
}

function fetchLinks() {

	url = 'https://api.github.com/repos/opentecture/mindmapping/contents/svg';

	var request = new Request( url );

	fetch( request )
		.then( response => response.json() )
		.then( json => callbackSvg( json ) );
}

function callbackSvg ( files ) {

	const urlGitHubSource = 'https://github.com/ladybug-tools/spider/blob/master/gbxml-sample-files/';
	const iconGitHubMark = '<img src="https://rawgit.com/ladybug-tools/spider/master/images/github-mark.png" height=14 style=vertical-align:middle>';

	let txt = '';

	for ( let file of files) {
		if ( !file.name.endsWith( '.svg' ) ) { continue; }

		const fileName = encodeURI( file.name );
		txt +=
		`<div style=margin:10px; >
			<button onclick=loaderSvg('${ fileName }') title="${ file.size.toLocaleString() } bytes" >${ file.name }</button>
		</div>`;
	}

	divFilesSvg.innerHTML =
		`<details open>
			<summary>New Node</summary>
			${ txt }
		</details>`;
}

function addLabel( mesh, name, location, color = 'blue' ) {

	const textGeo = new THREE.TextBufferGeometry( name, {
		font: ffont,
		size: 2,
		height: 1,
		curveSegments: 1
	});

	textGeo.applyMatrix( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );
	textGeo.applyMatrix( new THREE.Matrix4().makeRotationZ( Math.PI ) );
	textGeo.center();

	const textMaterial = new THREE.MeshBasicMaterial( { color: color } );
	const textMesh = new THREE.Mesh( textGeo, textMaterial );
	textMesh.position.copy( location );

	mesh.add( textMesh );

}

function addFileFormat( item, location, color = Math.random() * 0xffffff ) {

	const textGeo = new THREE.TextBufferGeometry( item.name, {
		font: ffont,
		size: 15,
		height: 3,
		curveSegments: 1
	});

	//textGeo.applyMatrix( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );
	//textGeo.applyMatrix( new THREE.Matrix4().makeRotationZ( Math.PI ) );
	textGeo.applyMatrix( new THREE.Matrix4().makeRotationZ( Math.PI ) );
	textGeo.center();

	const textMaterial = new THREE.MeshBasicMaterial( { color: color } );
	const textMesh = new THREE.Mesh( textGeo, textMaterial );
	//location = location ? location : v( Math.random() * 200 - 50, 20. -2 );
	//x = item.positionX ? item.positionX : 100 * Math.random() - 50;
	//y = item.positionY ? item.positionY : 50 + 100 * Math.random()
	//z = item.positionZ ? item.positionZ : 80 * Math.random();

	x = item.positionX = item.positionX || 100 * Math.random() - 50;
	y = item.positionY = item.positionY || 50 + 100 * Math.random()
	z = item.positionZ = item.positionZ || 80 * Math.random();

	textMesh.position.set( x, y, z );
	textMesh.userData = item;

	things.push( textMesh );

	scene.add( textMesh );
}

function setEdit(data) {
	//console.log('data', data);
	divLog.innerHTML =
		`
		<h3>Name</h3>
		<input id=inpVendor onchange=setData(this); name="name" value = "${data.name}" >

		<h3>Product</h3>
		<input onchange=setData(this); name=product value = "${data.product}" >

		<h3>Website</h3>
		<a href="${data.website}" target="_blank">${data.website}</a>
		<input onchange=setData(this); name=website value = ${data.website} >
		<a href="${data.website}" target="_blank">${data.website}</a>


		<h3>Page</h3>

		<h3>Notes / Needs</h3>
		<textarea id=txt onchange=setData(this); name=notes value=${data.notes} cols="30" rows="10" >${data.notes}</textarea>

		<h3>Position</h3>
		x: <input id=inpPosX onchange=setData(${this}); name=positionX value = ${data.positionX} style=width:2rem; >
		y: <input id=inpPosY onchange=setData(${this}); name=positionY value = ${data.positionY} style=width:2rem; >
		z: <input id=inpPosZ onchange=setData(${this}); name=positionZ value = ${data.positionZ} style=width:2rem; >

		<h3>SVG</h3>
		<input onchange=setData(this); name=svg value = ${data.svg} >

		<hr>

	`;
}

function setData( inp ) {
	//console.log('inp', inp);

	thing = json.cad.find(item => item.product === currentItem.product );

	if ( !thing ) {

		thing = json.fileFormat.find(item => item.name === currentItem.name );

	}

	if ( !thing ) {

		thing = json.energyAnalysis.find(item => item.name === currentItem.name );

	}
	thing[ inp.name ] = inp.value;

	//console.log('thing', thing);
	//console.log( 'item[ productName]', json[ productName ] );

}

function toggleBackgroundGradient() {
	var col = function() { return ( 0.5 + 0.5 * Math.random() ).toString( 16 ).slice( 2, 8 ); };
	var pt = function() { return ( Math.random() * window.innerWidth ).toFixed( 0 ); }
	var image = document.body.style.backgroundImage;

	document.body.style.backgroundImage = image ? '' : 'radial-gradient( circle farthest-corner at ' +
		pt() + 'px ' + pt() + 'px, #' + col() + ' 0%, #' + col() + ' 50%, #' + col() + ' 100% ) ';

}
