/* global BM, BMinpTags, TGAdivTagsSelect */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const TGA = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-06-02",
	"description": "Add curated (hopefully) tags to bookmarks",
	"version": "0.5.0-0",

};



TGA.getMenuTagsAdd = function() {

	const htm =
	`
	<details ontoggle=TGA.onToggle(); >

		<summary>Tags Add ~ TGA V ${ TGA.version } ~ ${ TGA.date }</summary>

		<p>${ TGA.description }</p>

		<div id=TGAdivTagsSelect > </div>

	</details>
	`;

	return htm;

};



TGA.onToggle = function() {


	const tagSets = BM.jsonLines.filter( line => line.type === "tagset" );
	//console.log( '', tagSets );

	let htm = "";

	for ( let tagSet of tagSets ) {

		//const json = JSON.parse( tagSet );

		const options = tagSet.tags.map( tag => `<option>${ tag }</option>` ).join();
		//console.log( 'options ', options );

		htm +=
		`<p style=display:inline-block title="${ tagSet.description }" >

			${tagSet.name }<br>
			<select id=TGSsel${ tagSet.name } onclick=TGA.addTag(this); size=8>${ options }</select>

		</p> &nbsp;`;

	}

	TGAdivTagsSelect.innerHTML = htm;

};



TGA.addTag = function( select ) {

	const comma = BMinpTags.value === "" || BMinpTags.value.endsWith( ",") ? "" : ",";

	BMinpTags.value += comma + select.value;

};