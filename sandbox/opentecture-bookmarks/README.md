
<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://opentecture.github.io/mindmapping/#sandbox/opentecture-bookmarks/README.md "View file as a web page." ) </span>

<div><input type=button class = "btn btn-secondary btn-sm" onclick=window.location.href="https://github.com/opentecture/mindmapping/tree/master/sandbox/"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ></div>

<br>


# [Opentecture Bookmarks Read Me]( #sandbox/opentecture-bookmarks/README.md )


## Full screen: [Opentecture Bookmarks View-a-line]( https://opentecture.github.io/mindmapping/sandbox/opentecture-bookmarks/view-a-line-bookmarks/index.html )

### [Opentecture Bookmarks View-a-line Read Me]( https://opentecture.github.io/mindmapping/#sandbox/opentecture-bookmarks/view-a-line-bookmarks/README.md )

* Opentecture Bookmarks in JSON Lines viewer and editor - by category


## Full screen: [Opentecture Bookmarks View-a-line by Host]( https://opentecture.github.io/mindmapping/sandbox/opentecture-bookmarks/view-a-line-bookmarks-by-host/index.html )

### [Opentecture Bookmarks View-a-line by Host Read Me]( https://opentecture.github.io/mindmapping/#sandbox/opentecture-bookmarks/view-a-line-bookmarks-by-host/README.md )

* Opentecture Bookmarks in JSON Lines viewer and editor - by host name



## Full screen: [Opentecture Bookmarks Add-a-line]( https://opentecture.github.io/mindmapping/sandbox/opentecture-bookmarks/add-a-line-bookmarks/index.html )

### [Opentecture Bookmarks Add-a-line Read Me]( https://opentecture.github.io/mindmapping/#sandbox/opentecture-bookmarks/add-a-line-bookmarks/README.md )

* Opentecture Bookmarks file creator: open, parse and save your browser's bookmarks to a JSON lines file


## [opentecture-bookmarks.json]( opentecture-bookmarks.json )

* The current Opentecture bookmarks JSON Lines file
* Links that are not CORS-compatible are in process of being identified.
	* Currently checked up to and including BIM
* Currently includes bookmark description and comments lines for all bookmarks under Academia heading
* Includes description lines for each main menu header
* The file needs a lot more curatorial effort in order to be useful. In particular:
	* if a web page cannot be loaded then a suitable image from the web site should loaded instead of the blank iframe.
	* Every bookmark should include the text of the home page's description meta tag. If suitable text is not found then text should copied from elsewhere in the HTML file

### [opentecture-bookmarks-original.json]( opentecture-bookmarks-original.json )

* The source file created by add-a-line-bookmark.html

## Concept

The scripts here are a side project of the <a href="https://www.ladybug.tools/spider/#sandbox/gbxml-to-json-lines/" target="_blank">gbXML to JSON Lines </a> project. They are a work-in-progress continuation of manipulating JSON Lines files in useful ways.

The scripts here are also an attempt to explore ways of managing browser bookmarks in a simple and open-source manner.

See also a more fully developed concept at [Annotated Bibliography Read Me]( https://opentecture.github.io/mindmapping/#sandbox/annotated-bibliography/README.md )

## Problem to be solved


There are many excellent lists on the web. For example:

* https://frontendmasters.com/books/front-end-handbook/2018/tools/css.html
* https://github.com/sindresorhus/awesome
* https://github.com/asciimoo/ListOfGithubLists

You can spend many enjoyable hours exploring the links in these lists.  There are several issues with this.

* Given hundreds of links, how can you prioritize what you want to see?
* Having seen a number of good pages, how can you come back to the list and return to the pages you like and not return to the pages you did not feel are useful to you?
* Given hundreds of links, how can you use search tools to help you find sites of current interest?
* Very long read me files with naked links are tedious and uninformative/uncurated
* Workflows for adding links to bookmarks in your browser then getting these links into markdown are complex

## Objectives

* Build a list [of resources] good enough for inclusion here: https://github.com/sindresorhus/awesome
* Establish effective ways of managing curated lists
* Take a bunch of links from browser bookmark manager and get them into a JSON file quickly and easily
* View and manage links with a tree-view menu system

### Links of interest

* https://github.com/sindresorhus/awesome
* https://support.mozilla.org/en-US/questions/996823
* https://codereview.stackexchange.com/questions/88433/creating-a-menu-as-nested-unordered-lists-from-json-data
