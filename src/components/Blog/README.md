# Blog
Loads all blog posts as `Blog Item`s. Each `Blog Item` will redirect to the corresponding `Blog Page`

## Database Structure
location: '/blog'
structure:
```
postname: {
    route: String,
    author: String,
    page_title: String,
    day: int,
    month: int,
    year: int,
    title: String,
    description: markdown string,
    img: filename,
}
```
* NOTES
  * `route` is the `/blog/` route that the `Blog Page` exists at
  * `page_title` refers to what will be displayed in the `Breadcrumb`
  * `month` is 1-indexed
  * `description` is a markdown formatted string which will be parsed and converted to html
    * The header will be automatically generated and does not need to be included in the description
    * images can be included using markdown syntax
      * filenames of local images stored in the `/img/` folder must be of form `%IMG_PATH%filename.xxx`
      * to add a caption to the image use the `alt` portion of the markdown syntax
    * links can be included using markdown syntax
      * If it is a link to a local page then must be of form `%BASE_URL%link.xxx`
    * New line `<br>` can be added with any of the following forms in the string: `\n`, `<br>`, `<br />`
  * `img` is the filename of the image
    * The image file must exist in the `/img/` folder