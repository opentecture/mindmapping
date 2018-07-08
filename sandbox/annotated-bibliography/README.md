<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://opentecture.github.io/mindmapping/#sandbox/annotated-bibliography/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/opentecture/mindmapping/tree/master/sandbox/annotated-bibliography#README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

# [Annotated Bibliography Read Me]( #README.md )

<!--
<iframe src=https://pushme-pullyou.github.io/tootoo-templates/basic-html.html width=100% height=500px ></iframe>
_basic-html.html_
<span style="display: none" >Iframes are not viewable in GitHub source code view</span>
-->

## Concept

There are many excellent lists on the web, For example:

* https://frontendmasters.com/books/front-end-handbook/2018/tools/css.html
* https://github.com/sindresorhus/awesome
* https://github.com/asciimoo/ListOfGithubLists

You can spend many enjoyable hours exploring the links in these lists.  There are several issues with this.

* Given hundreds of links, how can you prioritize what you want to see?
* Having seen a number of good pages, how can you come back to the list and return to the pages you like and not return to the pages you did not feel are useful to you?
* Given hundreds of links, how can you use search tools to help you find sites of current interest?

### Mission

An annotated visual bibliographies of webpages may be of use in helping you research a project, come up to speed in a field you are unfamiliar with and help give you reminders of what you have seen already.

#### Desired Features

* Displays a favicon or similar at 32 x 32 pixels
* Shows
	* Shortened  URL / no 'https://' etc
	* Document title
	* Meta tag Description or Alt text
	* First several hundred words of text
	* Ten or so thumbnail images selected from largest images available
		* Images with both absolute or relative URLs OK
* Search is generated by data in a JSON file. JSON file may have the following
	* Link to home page
	* Link to logo image if favicon not found
	* Link to page with images if better than images on home page
	* Link to About page or whatever page is more descriptive than text from home page
	* list of tags
	* Only link to home page is required
* Curating
	* Perhaps there is a JSON file for discarded entries or entries somebody looked at but felt not worth including
	* A field might include the reasoning behind the non-inclusion
* Creator script
	* Creates either HTML or Markdown files
	* Saves to local hard drive
	* Saves directly to GitHub or other remote site
	* Allows updating of a page of site reports or of just a single site
	* Does the heavy lifting on pointing the most relevant data
* Viewer
	* Topics in left menu
	* Reports in content area
	* Search all JSON files for tags?


## Full Screen: [Annotated Bibliography R2]( https://opentecture.github.io/mindmapping/sandbox/annotated-bibliography/annotated-bibliography-r2.html )

* Does a better job of gathering icons and images


## Full Screen: [Annotated Bibliography R1]( https://opentecture.github.io/mindmapping/sandbox/annotated-bibliography/annotated-bibliography-r1.html )

* Given a JavaScript array of URLs
* Fetches the content of the home page
* Parses text using [DOMParser]( https://developer.mozilla.org/en-US/docs/Web/API/DOMParser )
* Extracts and displays the title and description
* Displays the favicon - very work in progress
* Displays thumbnails of images from the home page


## Issues / To Do

* Add ability to export data to a Markdown file so it can become part of a series of static pages
	* The idea being that the static page might be regenerated and updated several times a year
* The title 'annotated bibliography' may cause people to think this project is about gathering citations to printed books. It is not.
* The favicon feature should not display and empty image if the favicon is not found
* Currently on only a single sort of favicon is searched for. There are several common ways of linking to favicons. The script should add more of the ways of capturing them
* Currently only images with absolute URLs are displayed, An ability to display images with relative URLs should be added
* Currently no body text is searched for or displayed. This could be added
* Add ability to add data from a Gist or other external file to particular entries
* Add _ad hoc_ query capabilities


## Links of Interest


## Change Log

### 2018-07-07 ~ Theo

* R2

### 2018-07-06 ~ Theo

* First commit

***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>