# About Page

## Adding Elements to the Timeline

To add an element to the timeline, go into timeline.json and add the element as
another JSON object in the array. The object should have, at the very least, the
"date", "title", and "desc" attributes. Note that timeline.json is organized in
chronological order starting from the top, even though the page itself is in
reverse chronological order.

To associate the event with an image, add the image to the img folder here and
create an entry mapping its name to a require statement in the Images object in
index.js. For instance:
```javascript
'icpc-socal-2018.jpg': require('./icpc-socal-2018.jpg'),
```
Then, in timeline.json, add the filename of the image to your event as an "img"
attribute and add a caption as "caption".
