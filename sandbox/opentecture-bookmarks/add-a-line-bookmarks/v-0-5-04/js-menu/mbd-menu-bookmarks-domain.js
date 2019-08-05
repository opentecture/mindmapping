/* global BM, BTGdet, MBDdivBookmarksDomain */
// jshint esversion: 6
// jshint loopfunc: true

const MBD = {

	"copyright": "Copyright 2019 opentecture authors. MIT License",
	"date": "2019-08-04",
	"description": "Filter bookmarks by domain",
	"version": "0.5.04-0MBD",

};


MBD.getMenuBookmarksDomain = function() {

	const htm =
	`
		<details id=MBDdet ontoggle=MBD.setMenuItemsByUrl(); >

			<summary>Filter bookmarks by domain ~ MBD</summary>

			<p>${ MBD.description }</p>

			<p>
				Search: <input type=search name="q" oninput=MBD.filterBookmarks(this); placeholder="enter a domain name" >
			</p>

			<div id=MBDdivBookmarksDomain ></div>

			<hr>

		</details>
	`;

	return htm;

};



MBD.setMenuItemsByUrl = function( bookmarks = BOP.bookmarks ){
	// https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string

	if ( MBDdet.open === false ) return;

	//const bookmarks = BM.jsonLines;
	const a = document.createElement( 'a' );
	const subdomains = ["www.", "m.", "en." ];

	let sites = [];

	const tagsToIgnore = inpTagsIgnore.value.split( "," );

	const filtered = bookmarks.filter( ( bookmark, index, arr ) => {

		let  remove = false;

		for ( tag of tagsToIgnore ) {

			if ( bookmark.tags.includes( tag ) ) {

				remove = true;
				break;

			}

		}

		return remove === false;

	} );

	bookmarks = filtered;

	for ( let bookmark of bookmarks ) {

		if ( !bookmark.url || !bookmark.type === "url" ) { continue; }

		a.href = bookmark.url;
		let site = a.hostname;

		const subdomain = subdomains.filter( bit => site.startsWith( bit ) === true );
		//console.log( 'subdomain', subdomain );

		site = site.replace ( subdomain, "" );
		//console.log( 'site', site );

		let item = sites.find( item => item === site );
		//console.log( 'item', item );

		if ( !item ) { sites.push( site ); }

	}

	sites = sites.sort();
	//console.log( 'sites', sites );

	let siteHtm = `<p>${ bookmarks.length } links</p>`;
	let bookmarksSelected = [];

	for ( let site of sites ) {
		//console.log( 'site', site );

		const marks = bookmarks.filter( bookmark =>
			bookmark.url && bookmark.url.includes( site ) && bookmark.type === "url" );
		//console.log( 'marks', marks );

		bookmarksSelected.push( ...marks );

		let markHtm = "";

		for ( let mark of marks) {

			const index = BOP.bookmarks.indexOf( mark );

			markHtm +=
			`
			<div style=margin-bottom:0.5rem; >
				<button onclick=BED.setTargetToEditDialog("${ index }"); title="${ mark.description }"  >${ mark.name }</button>
				<a href="${ mark.url }" target="_blank" title="open link in new tab"  >❐</a>
			</div>
			`;

		}

		siteHtm +=
		`
			<details>

				<summary>${ site } - ${ marks.length }</summary>

				${ markHtm }

			</details>
		`;

	}

	MBDdivBookmarksDomain.innerHTML = siteHtm;

	//BM.setBookmarks( bookmarksSelected || bookmarks );

};



MBD.filterBookmarks = function ( input ) {

	const str = input.value;
	//console.log( 'str', str );
	const a = document.createElement( 'a' );

	let bookmarks = [];


	if ( str === "" ) {

		bookmarks = BOP.bookmarks;

	} else {



		bookmarks = bookmarks.filter( bookmark => {

			a.href = bookmark.url;
			const site = a.hostname;
			return site.includes( str );

		} );

	}

	MBD.setMenuItemsByUrl( bookmarks );

};