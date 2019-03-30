
<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://opentecture.github.io/mindmapping/#sandbox/opentecture-bookmarks/view-a-line-bookmarks-by-category/README.md "View file as a web page." ) </span>

<div><input type=button class = 'btn btn-secondary btn-sm' onclick="window.location.href='https://github.com/opentecture/mindmapping/tree/master/sandbox/opentecture-bookmarks/view-a-line-bookmarks'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

<br>

# [Opentecture Bookmarks View-a-line by Category Read Me]( #sandbox/opentecture-bookmarks/view-a-line-bookmarks-by-category/README.md )

<!--
<iframe src=https://opentecture.github.io/mindmapping/sandbox/opentecture-bookmarks/view-a-line/sandbox/opentecture-bookmarks/view-a-line=-bookmarks/ width=100% height=500px >Iframes are not viewable in GitHub source code views</iframe>
_sandbox/opentecture-bookmarks/view-a-line.html_
-->

## Full Screen: [Opentecture Bookmarks View-a-line by Cataegory]( https://opentecture.github.io/mindmapping/sandbox/opentecture-bookmarks/view-a-line-bookmarks-by-category/index.html )


## Concept

This script is a side project of the [gbXML to JSON Lines]( https://www.ladybug.tools/spider/#sandbox/gbxml-to-json-lines/README.md) project.

It is a work-in-progress continuation of exploring, manipulating and hacking the [JSON Lines file format]( http://jsonlines.org/ ) in unusual, useful and fun ways.


### Objectives

* Access very large numbers of bookmarks
* View contents of many sites in a speedy fashion
* Categorize and tag bookmarks with ease and speed
* Speed up identification with descriptions added on-the-fly
* Curate the output using comments

### Features include:

* Read JSON Lines files created by [Opentecture Bookmarks Add-a-line]( https://opentecture.github.io/mindmapping/#sandbox/opentecture-bookmarks/add-a-line-bookmarks/README.md )
* Display tree menu of bookmarks with HTML details elements
* For every bookmark allow
	* Display web page in an iframe
	* Open web page in new tab
	* Edit bookmark json
* Save edits to new file / Open local file for testing


## To Do / Wish List

* 2019-03-24 ~ Build an API
	* See https://pinboard.in/api/
* 2019-02-17 ~ Replace all date references with UTC strings
* 2019-02-17 ~ Upgrade IDs to UUIDs
* 2019-02-17 ~ Replace 'tags' with 'categories' / Add new separate 'tags' element
* 2019-02-12 ~ Turn titles of things like university names to links to suitable page
* 2019-02-11 ~ Add ability to do screen capture of pages and save / save to Imgur? for reuse instead of iframes


## Notes

* Best to have the JavaScript console open so you can view the errors. There are many issues still to be dealt with in displaying web sites in iframes
	* Also iframes issues with HTTP/HTTPS are different depending on whether you are running locally or on a sever
* After editing a JSON bookmark, you must save to a file and then reload the page. Future release will be more convenient.
* Be sure to create and keep back up files of the data files
* Tags currently being used as catagories. This will change
* Does not yet handle file not found errors well
* Adding new bookmarks will happen in future releases

## Issues

* handle CORS and other iframe errors better

## Links of Interest

### JSON Lines format

* http://jsonlines.org/
* http://ndjson.org/


## Change Log

### Commit message prefixes

From [The case for single character git commit message prefixes]( https://smalldata.tech/blog/2018/10/04/the-case-for-single-character-git-commit-message-prefixes )

* B, indicates a bugfix.
* F, indicates a feature or a change - this will most likely be the majority of the commits.
* a, code formatting change.
* c, comments and or documentation.
* D, dependency updates.
* R, code refactoring, note that this is different from r below.
* r, proven code refactoring - this is the original meaning of the mathematical term refactoring, where it can be mathematically proven that the code change does not change any functionality.
* T, test cases and/or test improvements
* !, unknown - i.e. for when you really need to make that commit because there's a horde of zombies waiting outside.


### 2019-03-24 ~ Theo

Opentecture Bookmarks View-a-line by Category
view-a-line-bookmarks-by-category.html R4.9

* B - 'get description' not fetching description
* F - Add 'add new image' button - adds template text  to bookmark
* F - Add 'add new bookmark' button and new data entry web page
* c - add 'Commit message prefixes' to read me


### 2019-03-17 ~ Theo

view-a-line-bookmarks-by-category.html R4.8

* Fix Octocat logo
* Start adding name space
* Not add description if already exists
* Add no show iframes if notes include "Not CORS or Iframe compatible"
* Add links underneath images
* Add images array element to bookmark

### 2019-02-19 ~ Theo

view-a-line-bookmarks R4.5
* Add link to view-a-line-bookmarks-by-find
* Add first pass at acquiring images for use instead of an iframe when there are iframe/CORS issues


### 2019-02-17 ~ Theo

view-a-line-bookmarks R4.3
* Add update bookmark
* Add new bookmark stub
* Add read and display notes in bookmarks( used to indicate no CORS-compatible )
* Split UI unto view and edit details elements
* Start updating and saving versions of opentecture-bookmarks.json
* Add 'get description' button

Done
* 2019-02-17 ~ Seek out web site description and add to bookmark JSON

### 2019-02-16 ~ Theo

view-a-line-bookmarks R4.2
* Rebuild everything

Done
* 2019-02-11 ~ Add line type of comments, link to type "url" and display appropriately

### 2019-02-15 ~ Theo

view-a-line-bookmarks R4.1
* Add file open and file save


### 2019-02-14 ~ Theo


view-a-line-bookmarks R4.0

* Based on basic-html-hamburger.html template file
	* Should work on all devices
* Add 'description JSON Line type
	* Add first pass a adding descriptions

Dealt with
* 2019-02-11 ~ Upgrade to TooToo13
* 2019-02-11 ~ Sort JSON lines data by tags
* 2019-02-11 ~ Add line type of 'description', link to tags and display appropriately


### 2019-02-13 ~ Theo

view-a-line-bookmarks r3.0

* Too complicated

### 2019-02-12 ~ Theo

view-a-line-bookmarks r2.0

* Adds sort folders and files by primary category
	* Closes: 2019-02-11 ~ Sort JSON lines data by categories
* Add build menu items using flexbox
	* Closes: 2019-02-11 ~ Cleaner display of items in menu


### 2019-02-11 ~ Theo

* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>
