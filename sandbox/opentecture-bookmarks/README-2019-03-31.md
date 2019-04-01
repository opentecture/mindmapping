
<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://opentecture.github.io/mindmapping/#sandbox/opentecture-bookmarks/README.md "View file as a web page." ) </span>

<div><input type=button class = "btn btn-secondary btn-sm" onclick=window.location.href="https://github.com/opentecture/mindmapping/tree/master/sandbox/sandbox/opentecture-bookmarks/"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ></div>

<br>

<i style=color:green >Progress halted for the moment. See Change Log</i>

# [Opentecture Bookmarks Read Me]( #sandbox/opentecture-bookmarks/README.md )


## Full screen: [Opentecture Bookmarks View-a-line-by-category]( https://opentecture.github.io/mindmapping/sandbox/opentecture-bookmarks/view-a-line-bookmarks-by-category/index.html )

### [Opentecture Bookmarks View-a-line by Category Read Me]( https://opentecture.github.io/mindmapping/#sandbox/opentecture-bookmarks/view-a-line-bookmarks-by-category/README.md )

* Opentecture Bookmarks in JSON Lines viewer and editor - by category


## Full screen: [Opentecture Bookmarks View-a-line by Host]( https://opentecture.github.io/mindmapping/sandbox/opentecture-bookmarks/view-a-line-bookmarks-by-host/index.html )

### [Opentecture Bookmarks View-a-line by Host Read Me]( https://opentecture.github.io/mindmapping/#sandbox/opentecture-bookmarks/view-a-line-bookmarks-by-host/README.md )

* Opentecture Bookmarks in JSON Lines viewer and editor - by host name


## Full screen: [Opentecture Bookmarks View-a-line by Find]( https://opentecture.github.io/mindmapping/sandbox/opentecture-bookmarks/view-a-line-bookmarks-by-find/index.html )

### [Opentecture Bookmarks View-a-line by Find Read Me]( https://opentecture.github.io/mindmapping/#sandbox/opentecture-bookmarks/view-a-line-bookmarks-by-find/README.md )

* Opentecture Bookmarks in JSON Lines viewer and editor - by searching



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

* The original source file created by add-a-line-bookmark.html

***

## Concept

The scripts here are a side project of the <a href="https://www.ladybug.tools/spider/#sandbox/gbxml-to-json-lines/" target="_blank">gbXML to JSON Lines </a> project. They are a work-in-progress continuation of manipulating JSON Lines files in useful ways.

The scripts here are also an attempt to explore ways of managing browser bookmarks in a collaborative, simple and open-source manner.

See also a more fully developed concept at [Annotated Bibliography Read Me]( https://opentecture.github.io/mindmapping/#sandbox/annotated-bibliography/README.md )

## Problem to be solved


There are many excellent lists on the web. For example:

* https://frontendmasters.com/books/front-end-handbook/2018/tools/css.html
* https://github.com/sindresorhus/awesome
* https://github.com/asciimoo/ListOfGithubLists

You may spend many enjoyable hours exploring the links in these lists.  There are, however, a number of issues with this process.

* Given hundreds of uninformative/uncurated links, how can you prioritize what you want to see?
* Having seen a number of good pages, how can you come back to the list and return to the pages you like and not return to the pages you did not feel were useful to your current search?
* Given hundreds of links, how can you use search tools to help you find sites of current interest?
* How do you prevent parsing very long read me files with naked links from becoming a tedious process?
* What is a good workflow for adding links to bookmarks in your browser then getting these links into markdown?

# Objectives

* Build a list [of resources] good enough for inclusion here: https://github.com/sindresorhus/awesome
* Establish effective ways of managing curated lists of bookmarks
* Take a bunch of links from browser bookmark manager and get them into a JSON file quickly and easily
* View and manage links with a tree-view menu system


## Make viewing many bookmarks pleasurable, memorable and speedy

* With tree in left menu / contents to right
	* Bookmarks may be viewed by browsing a tree of categories
	* Bookmarks may be searched for by typing in search text
	* Bookmarks may be located using tags

When multiple results are available bookmark targets are displayed with images and text in a Pinterest/Etsy/[Cool Tools]( https://kk.org/cooltools/tag/editors-favorites/ ) store-like gallery sort of manner.

Clicking on one of the boxes, will bring up the full page for the site including user comments, date of latest site update, typical images from the site and more


## Make curating many bookmarks easy-peasy

* With a click of a button grab bookmarks you have gathered using your browser and its bookmark manager
* Add images from the site and/or embed in the site in an iframe - if the target site offers that capability
* Tools are there to help you grab descriptions, text and images from the target site
* Add categories and tags is a matter of selecting items from drop-down lists
* Comments may be added and edited using Markdown or HTML


## Make development of the viewing and curating tools simple enough for programming beginners to have fun with

* Hosting on no-charge static servers such as GitHub or Glitch
* Nothing to download. Nothing to install. All FOSS.
* Written in plain-vanilla JavaScript. Very few dependencies. Files of just a few hundred lines


## Collaborate and manage the process with a number of peeps

* The effort may have multiple owners with full access and others with limited access
* The decision-making process is online and documented


## Links of interest

* https://github.com/sindresorhus/awesome
* https://support.mozilla.org/en-US/questions/996823
* https://codereview.stackexchange.com/questions/88433/creating-a-menu-as-nested-unordered-lists-from-json-data

Convert bookmark dates to UTC

* https://stackoverflow.com/questions/51343828/how-to-parse-chrome-bookmarks-date-added-value-to-a-date


## Wish List / To Do

* 2019-03-17 ~ Enable creating new bookmarks from scratch
* 2019-03-17 ~ Make it easier to add new images
* 2019-03-17 ~ Be able to edit bookmarks with same tools from any of the viewers
* 2019-03-17 ~ Gallery page for all the bookmarks



## Change Log


### 2019-03-17 ~ Theo

CORS workaround working again. Yay!

Update readme and links


### 2019-03-16 ~ Theo

* Update readme

Yikes! My primary web-scraping tool - https://cors-anywhere.herokuapp.com/ is having issues

* https://github.com/Rob--W/cors-anywhere/issues/159




### 2019-03-02 ~ Theo

It's looking like a nice way of keeping things is to use the originating web site of the content. Assign very basic categories

<!--

List I made to the time to try to help me build up categories. Probably not very useful

* academia > mit
* organization > AIA
* people > designer > lommee
* publication > aecbytes


* academia > carnagie mellon > software > alice
* academia > stanford > software > thingpedia
* academia > stanford > software > almond
* institutewithoutboundaries.ca/

* consultant > aetypic > aec
* consultant > n-e-r-v-o-u-s.com
* you3dit.com


* organization > acadia > aec
* organization > aia
* organization > aia > publication > architectmagazine.com
* organization > buildingsmart.org
* organization > freecodecamp.org
* ibiblio.org
* organization > openstructures
* organization > p2pfoundation
* rsd7.org
* organization > sensorica.co
* wikibooks.org
* wikipedia.org
* z33.be


* person > Suleiman Alhadidi > designer/ aec
* person > Sara Hendren > publication > abler
* Mario Gutman > http://www.whitefeet.com/
* person > Mitchell Joachim > Terreform / archinode
* person > Sam Marts > publication > www.architectsmart.com
* person > Andrew Alexander Price > developer
* james halliday > https://substack.net/
* Guillermo Webster > http://omrelli.ug/

* portal > archive.org >


* publication > aecbytes > aec
* publication > archdaily > aec
* citylab.com
* publication > issuu.com
* lifehacker.com
* publication > makezine.com
* publication > medium.com
* publication > nytimes,com
* publication > slashdot
* techsupportalert.com
* telegraph.co.uk
* ted.com
* publication > wired.com


* vendor > product > avavadwellings > construction > dewllings
* vendor > product > blokable > construction > design and build
* vendor > product > bluhomes > construction > design and build
* vendor > product > bonestructure.ca > construction > design and build
* intellistructures.com
* vendor > product > wikihouse.cc
* vendor > product >wikiwand.com
* vendor > product > wikkelhouse.com
* metsawood.com


* vendor > service > archilogic
* vendor > service > archilogic > service > 3d.io
* vendor > service > artstation > service > portfolio
* vendor > service > autodesk > software > Revit
* vendor > service > beetle blocks > service > 3d design
* vendor > service > bimserver
* vendor > service > bimstorm
* vendor > service > bimwiki

* vendor > service > leanstack >
* vendor > service > mecabricks.com
* vendor > service > sketchup > service > 3dwarehouse
* tekla.com
* vendor > service > twitter.com

-->


***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>
