K itchen-sink headers like the following are used to try to work around "old and not updated proxy cache" implementations that do not understand current HTTP Caching spec directives like no-store.

http

Copy
Cache-Control: no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate
However, in recent years, as HTTPS has become more common and client/server communication has become encrypted, proxy caches in the path can only tunnel a response and can't behave as a cache, in many cases. So in that scenario, there is no need to worry about outdated proxy cache implementations that cannot even see the response.

HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Cache-Control: max-age=604800

<!doctype html>
…
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
ETag: "deadbeef"
Cache-Control: no-cache

<!doctype html>
…Cache-Control: max-age=0, must-revalidate

Cache-Control: public, max-age=31536000
Cache-Control: immutable

resources that work best with caching are static immutable files whose contents never change. And for resources that do change, it is a common best practice to change the URL each time the content changes, so that the URL unit can be cached for a longer period.

As an example, consider the following HTML:

html

Copy
<script src="bundle.js"></script>
<link rel="stylesheet" href="build.css" />
<body>
  hello
</body>
In modern web development, JavaScript and CSS resources are frequently updated as development progresses. Also, if the versions of JavaScript and CSS resources that a client uses are out of sync, the display will break.

So the HTML above makes it difficult to cache bundle.js and build.css with max-age.

Therefore, you can serve the JavaScript and CSS with URLs that include a changing part based on a version number or hash value. Some of the ways to do that are shown below.

# version in filename
bundle.v123.js

# version in query
bundle.js?v=123

# hash in filename
bundle.YsAIAAAA-QG4G6kCMAMBAAAAAAAoK.js

# hash in query
bundle.js?v=YsAIAAAA-QG4G6kCMAMBAAAAAAAoK
Since the cache distinguishes resources from one another based on their URLs, the cache will not be reused again if the URL changes when a resource is updated.

html

Copy
<script src="bundle.v123.js"></script>
<link rel="stylesheet" href="build.v123.css" />
<body>
  hello
</body>
With that design, both JavaScript and CSS resources can be cached for a long time. So how long should max-age be set to? The QPACK specification provides an answer to that question.
HTTP/1.1 308 Permanent Redirect
Location: http://www.example.com/featured
Content-Length: 0

GET /featured HTTP/1.1
Host: www.example.org
test(() => {
  assert_false('WebKitCSSMatrix' in self);
}, 'WebKitCSSMatrix in worker');

done();
Content-Encoding:
Content-Language: en
Content-Length: bytrs

level
an integer specifying the version of the media type. For text/html this defaults to 2, otherwise 0.
qs
a floating-point number with a value in the range 0[.000] to 1[.000], indicating the relative 'quality' of this variant compared to the other available variants, independent of the client's capabilities. For example, a jpeg file is usually of higher source quality than an ascii file if it is attempting to represent a photograph. However, if the resource being represented is ascii art, then an ascii file would have a higher source quality than a jpeg file. All qs values are therefore specific to a given resource.

Content-Type: image/jpeg; qs=0.8
URI:
uri of the file containing the variant (of the given media type, encoded with the given content encoding). These are interpreted as URLs relative to the map file; they must be on the same server, and they must refer to files to which the client would be granted access if they were to be requested directly.
Body:
The actual content of the resource may be included in the type-map file using the Body header. This header must contain a string that designates a delimiter for the body content. Then all following lines in the type map file will be considered part of the resource body until the delimiter string is found.
Example:
Body:----xyz----
<html>
<body>
<p>Content of the page.</p>
</body>
</html>
----xyz----

Consider, for example, a resource called document.html which is available in English, French,		