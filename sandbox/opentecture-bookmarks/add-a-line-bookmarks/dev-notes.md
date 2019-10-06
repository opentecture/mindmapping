## dev notes


## 2019-10-05


## 2019-09-29

All beginning to look good. Might even be useful one day.

* A lego set for knowledge
* A Yelp for ethics - see parallel constitution
* A movie set for objects
* wormholes into time for history students
* a card catalog for knowledge
* an index to what is know
* what would be nice to add to Wikipedia articles if we had enough time
* Wikipedia articles from a director's or maintainer's point of view

path { type: path, uuid: "xxx", path: "aaa.bbb/123", tag: "Cynthia,work" }

who: see comments??
when { type: time, uuid: "xxx"}
where { type: "location", lat: "38", longitude: "-122", zoomLevel: "16" }
how: scale, rotation, other?
what { type: "action", uuid: "" }
why: see meta?



## 2019-09-28

### Paths

We want to be able to put our chunks of knowledge - JSON lines or bookmarks - into books and have them organized by category - just like we organize files into folders. and we want to be able to reuse the bookmark in various books. you may want your bookmark in one folder and I may want it in another folder. Both locations should be okay. So you would have a set of path types that you want for this project. And I would have my set of path types that I would use for that project

Paths should be like comments and tags - completely separate lines.

    { type: path, uuid: xxx, path: "aaa/bbb/123", bookmarks: "123,456,987...", tags: "theo,gbxml" }

### Collections or assemblies

Bookmarks are like icons or cards in a library catalog. They link or represent real item somewhere else.

we can use these links in order to create assemblies of the actual objects represented themselves.

All we need to do is take the object represented by the bookmark and indicate its new location. For example, we could take a file located in some folder somewhere, and then transfer it into a 3D representation of that data in some virtual world somewhere.

all we need is a list of the bookmarks and a list of the new locations or instructions as to what to do with the data represented by the bookmarks.

Add-a-line objects?

	{ type: location, uuid: "xxx", bookmark: "aaa", location: "www.example.com/doit.html#aaa", tags: "" }
	{ type: time ...
	{ type: action ...


### Popup

Use popup to display iframe of site?




### 2019-09-28

_lost lots of nice text here somehow..._ nope

## 2019-08-11

Questions for Ryan

* Target audience: contractor or handyman or DIY
* Relevant?: Lego, 3D-printing, commercial proprietary prefab, commercial services
* Relevant?: toys, furniture, large buildings or campuses, city-planning
* Relevant?: computer languages, games
* Relevant?: Rammed earth, adobe

More

* modular components that may be assembled and reassembled into safe habitable good-looking structures
* Software for designing and managing the above
* Tools and hardware for making the above
* Licensing, laws, codes and documentation
* People and organizations
* Publications and other news sources
* Standards, style guides and guidelines


## 2019-08-10

Looking quite good

To Do

* Saving in general
* Saving duplicate tags
* Saving tagSets clean ups
* Colored tags
* New bookmarks topics??


## 2019-07-07

### The problem that needs solving

* You have some knowledge you want to share with others
* Several of you have knowledge you would like to share
* Help others stand on the shoulders of giants
* Share your sources of inspiration with the world


### Standing on the shoulders of Giants

* Much of your knowledge is available instantly via links
	* Via links to web pages or to ISBN references or online documents
* Your links are selected, prioritized and commented
* The collection of links together may be considered to form an authoritative view of the topic in question
* The content at the link destinations generally follow [Wikipedia Core Content Policies]( https://en.wikipedia.org/wiki/Wikipedia:Core_content_policies )
	* Neutral Point of View
	* Verifiability
	* No original research


### Sharing

* The knowledge in each link must be made available with a click or twp
* No paywalls
* Much of the knowledge is available in small chunks
	* Just-in-time learning
	* Examples include most Wikipedia articles and Khan Academy's three minute videos


### Simplicity

* Easy code
* Easy data format


### Freedom of display

* Standard two panel trees
* 2D mind maps
* 3D mind maps


### Vision

* Within a few hours you can gain a reasonable overview of the topic at hand
	* Its concepts
	* Features and benefits
	* Current issues
	* Major persons involved
	* General directions
	* [Sun Tzu]( https://medium.com/wardleymaps/on-being-lost-2ef5f05eb1ec ): purpose, landscape, climate, doctrine and leadership
	* You are able to act and make decisions using your new knowledge

### Longer term vision

* You may fork the data
* You may add and edit the content and comments


## 2019-06-22 ~ Theo

* what is the Stack Overflow for good answers?
* What is the Yelp for deep knowledge
* What is the Apple or GitHub for curated content?
* Where are the Amazon comments for STEM topics?

More

* There are an infinite amount of possible URLs, with perhaps many trillions already in use. How can we find, retain, and return to the good ones?
* How can we catalog and share the URLs that point to good science?
* For any topic that you may be interested in, you may gather dozens, maybe even hundreds, of bookmarks linking to blog posts, Wikipedia articles, journal articles and other sources. What are good waus of dealing with all these URLs?