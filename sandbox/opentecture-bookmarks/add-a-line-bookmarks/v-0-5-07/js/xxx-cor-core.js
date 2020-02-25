/* globals FOB */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const COR = {
	"copyright": "Copyright 2019 Opentecture authors. MIT License",
	"date": "2019-06-23",
	"description": "core - Contains local overrides",
	"helpFile": "cor-core/README.md",
	"version": "0.0.0-1cor",
};


//THM.themeUrlStorage = 'addALineTheme'; // set for each instance in HTML file
//THM.cssBasic = "https://pushme-pullyou.github.io/tootoo14/js-14-03/style.css";
//THM.backgroundColor = "#eed"

FOB.urlDefaultFile = "../../bookmarks.json";

POP.license = "../../../../license"

// For main menu header
MNU.helpFile = "../../README.md";

MNU.description = `Basic bookmark manager and editor with tagging, descriptions and comments`;

MNU.urlSourceCode = "https://github.com/opentecture/mindmapping/tree/master/sandbox/opentecture-bookmarks";

MNU.homeText  = "opentecture";
MNU.homeTitle = "Building to a common, scalable standard creates new opportunities to design and create objects and spaces in a collaborative way.";
MNU.homeUrl   = "https://www.opentecture.com/";

MNU.repoText  = "mindmapping";
MNU.repoTitle = "Mindmapping is a collection of basic plain-vanilla JavaScript scripts for idea management using GitHub pages, 3D and whatever else comes to mind";
MNU.repoUrl   = "https://opentecture.github.io/mindmapping";

MNU.appText  = "bookmarks";
MNU.appTitle = ""; //"Basic html content management script with sliding menu, css theme selection, Markdown to HTML, drag and drop file reading capability, access to frequently used pages and more";
MNU.appUrl   = "https://opentecture.github.io/mindmapping/#sandbox/opentecture-bookmarks/README.md";

MNU.footerPopupUrl	= "https://pushme-pullyou.github.io/tootoo14/";
MNU.footerTarget = "target=_blank";
MNU.footerIssues = "https://github.com/opentecture/mindmapping/issues";


COR.getBookmarksFilterByTagsToIgnore = function ( bookmarks ) {

	const tagsToIgnore = inpTagsIgnore.value.split( "," );

	const filtered = bookmarks.filter( bookmark => {

		let  remove = false;

		for ( let tag of tagsToIgnore ) {

			if ( bookmark.tags.includes( tag ) ) {

				remove = true;
				break;

			}

		}

		return remove === false;

	} );
	//console.log( '', filtered.length );

	return filtered;

};