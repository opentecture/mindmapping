/* global BM, BMNdivDrop, BMinpUrl */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const BMN = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-06-08",
	"description": "Clear input fields and set screen up to add a new bookmark",
	"version": "0.5.0-1",

};


BMN.getMenuBookmarkNew = function() {

	const htm =
	`
		<details ontoggle=BMN.onToggle(); >

			<summary>Bookmark New ~ BMN V ${ BMN.version } ~ ${ BMN.date }</summary>

			<p>${ BMN.description }</p>

			<p>
				<button onclick=BMN.setBookmarkNew(); >Add new bookmark</button>
			</p>

		</details>

	`;

	return htm;

};


BMN.onToggle = function() {

};



BMN.onInput = function() {

	const htm = BMNdivDrop.innerHTML;
	//console.log( 'htm', htm );

	//if ( !htm ) { return; }

	const url = htm.match( /href="(.*?)"/i )[ 1 ];
	//console.log( 'url', url );

	const name = htm.match ( />(.*?)<\/a>/i)[ 1 ];

	BMinpUrl.value = url;
	BMinpName.value = name;

	BMinpId.value = BMinpId.value ? BMinpId.value : BM.uuidv4();
	BMinpDateAdd.value = BMinpDateAdd.value ? BMinpDateAdd.value : new Date().toISOString();
	BMinpDateUpdate.value = BMinpDateAdd.value;

	BMinpType.value = "url";
	BMinpTags.value = [];
	BMtxtDescription.value = "";

	BMdivUrl.innerHTML = "url ❐".link( url );

	//ifr.src = url;

};



BMN.setBookmarkNew = function() {

	BMNdivDrop.innerHTML = "";

	BMinpUrl.value = "";
	BMinpUrl.placeholder = "https://example.com";

	BMinpName.value = "";
	BMinpName.placeholder = "name of example";

	BMinpDateAdd.value = new Date().toISOString();
	BMinpDateUpdate.value = BMinpDateAdd.value;
	BMinpId.value = BM.uuidv4();
	BMinpType.value = "url";
	BMinpTags.value = [];

	BMtxtDescription.value = "";
	BMtxtDescription.placeholder = "Example.com is a good site for testing things";

	BMdivUrl.innerHTML = "url";

};
