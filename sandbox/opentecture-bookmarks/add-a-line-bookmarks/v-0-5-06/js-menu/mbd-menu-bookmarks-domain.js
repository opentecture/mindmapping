"use strict";

/* global BM, BTGdet, MBDdivBookmarksDomain */
// jshint esversion: 6
// jshint loopfunc: true

const MBD = {

	"copyright": "Copyright 2019 opentecture authors. MIT License",
	"date": "2019-08-10",
	"description": "Filter bookmarks by domain",
	"version": "0.5.04-5MBD",

};


MBD.getMenuBookmarksDomain = function() {

	const htm =
	`
		<details id=MBDdet ontoggle=MBD.setMenuItemsByUrl(); >

			<summary>Bookmarks by domain (MBD)</summary>

			<p>${ MBD.description }</p>

			<p>
				Search: <input type=search name="q" oninput=MBD.filterBookmarks(this); placeholder="enter a domain name" >
			</p>

			<div id=MBDdivBookmarksDomain class=divMenuList ></div>

			<hr>

		</details>
	`;

	return htm;

};



MBD.setMenuItemsByUrl = function( bookmarks = BOP.bookmarks ){

	if ( MBDdet.open === false ) return;

	const a = document.createElement( 'a' );
	const subdomains = ["www.", "m.", "en." ];

	let sites = [];

	bookmarks = BOP.getBookmarksFilterByTagsToIgnore( bookmarks );

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
	MBD.bookmarksSelected = [];

	sites.forEach( (site, count ) => {
		//console.log( 'site', site );

		const marks = bookmarks.filter( bookmark =>
			bookmark.url && bookmark.url.includes( site ) && bookmark.type === "url" );
		//console.log( 'marks', marks );

		MBD.bookmarksSelected.push( ...marks );

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
			<details ontoggle=MBD.setContents("${site}");>

				<summary>${ count + 1 }. ${ site } - ${ marks.length }</summary>

				${ markHtm }

			</details>
		`;

	} );

	MBDdivBookmarksDomain.innerHTML = siteHtm;

	//BOP.setBookmarks( MBD.bookmarksSelected || bookmarks );

};



MBD.setContents = function ( str ) {

	const a = document.createElement( 'a' );

	const bookmarks = BOP.bookmarks.filter( bookmark => {

		a.href = bookmark.url;
		const site = a.hostname;
		return site.includes( str );

	} );


	BOP.setBookmarks( bookmarks );

};



MBD.filterBookmarks = function ( input ) {

	const str = input.value;
	//console.log( 'str', str );
	const a = document.createElement( 'a' );

	let bookmarks = [];

	if ( str === "" ) {

		bookmarks = BOP.bookmarks;

	} else {

		bookmarks = BOP.bookmarks.filter( bookmark => {

			a.href = bookmark.url;
			const site = a.hostname;
			return site.includes( str );

		} );

	}
	//console.log( '', bookmarks );

	MBD.setMenuItemsByUrl( bookmarks );

	BOP.setBookmarks( bookmarks );

};