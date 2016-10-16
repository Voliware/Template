# Template
`Template` is a simple class that provides an easy way to re-use HTML with `jQuery`. Extend `Template`, provide it a string of HTML, or an HTML object wrapped by `jQuery`, and start writing code like this:

```js
var chatMessage = new ChatMessage()
    .setText("Hello!")
    .setSender("Darryl")
    .appendTo("body");
```
Result
```html
<div class="chat">
   <span class="chat-sender">Darryl: </span>
   <span class="chat-msg">Hello!</span>
</div>
```

Every instance of `Template` inherits all `jQuery` functions. Each function call is applied to the the `$wrapper` property, while always returning the class itself. This means you can chain `jQuery` with your own methods. `Template` was made in the hopes that the community will provide more `Template` classes to generate common, re-usable HTML elements. A few classes have been created and are available in the `api` or as individual packages: `Table`, `DataTable`, `Form`, `Wizard`, and an increasing variety of `Bootstrap` classes.

Check out the [Template wiki](https://github.com/Voliware/Template/wiki/Template) for more details.

## Table
`Table` is a `Template` class demonstrating what `Template` can do. It can generate a default HTML table structure, or can be passed a string/`jQuery` template object to build from. 

```js
// this example uses an array of data
// and the class-defined template structure
var data = [
	["Wayne Gretzky", 894, 1963],
	["Brent Gretzky", 1, 3]
];
var table = new Table({
	rowHeaders : ['Player', 'Goals', 'Assists']
})
.appendTo('body')
.build(data);
```
The result is a table built from the basic `<table>` HTML elements. 

<table class="table">
<thead>
    <tr>
        <th>Player</th>
        <th>Goals</th>
        <th>Assists</th>
    </tr>
</thead>
<tbody>
<tr>
        <td>Wayne Gretzky</td>
        <td>894</td>
        <td>1963</td>
    </tr><tr>
        <td>Brent Gretzky</td>
        <td>1</td>
        <td>3</td>
    </tr></tbody>
</table>

When building a table from a template, simply pass in the template string or `jQuery` object as the `template` option.

```js
// this example uses an object of objects
var data = {
	"0" : {
		"player" : "Wayne Gretzky",
		"goals" : 894,
		"Assists" : 1963
	},
	"1" : {
		"player" : "Brent Gretzky",
		"goals" : 1,
		"Assists" : 3
	}
};
var table = new Table({
	template : $('#playerTable')
})
.appendTo('body')
.build(data);
```
<table class="table">
<thead>
    <tr>
        <th>Player</th>
        <th>Goals</th>
        <th>Assists</th>
    </tr>
</thead>
<tbody>
<tr>
        <td>Wayne Gretzky</td>
        <td>894</td>
        <td>1963</td>
    </tr><tr>
        <td>Brent Gretzky</td>
        <td>1</td>
        <td>3</td>
    </tr></tbody>
</table>

Check out the [Table wiki](https://github.com/Voliware/Template/wiki/Table) for more details, and [RenderTable](https://github.com/Voliware/Template/wiki/RenderTable) for a powerful way to rebuild tables without wiping the `<tbody>`!

## Documentation & Tutorials

View the [docs](http://voliware.github.io/Template) for a `jsDoc` documentation, or check out the [Wiki](https://github.com/Voliware/Template/wiki) for step-by-step explinations of how to use all of the classes.

## Contributors
Written by Anthony Agostino.

## License
Licensed under the MIT license.
