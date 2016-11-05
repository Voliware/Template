# Template
`Template` is a simple class that provides an easy way to re-use and build HTML with `jQuery`. Extend the `Template` class, provide a string of HTML/`jQuery`, and start writing code like this:

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

Every instance of `Template` inherits all `jQuery` functions, and you can even chain `jQuery` with your own class methods. A few `Template`s have been created and are available as add-on packages (must be included after `Template`): `Feedback`, `Table` - which includes `RenderTable` and `Control Table`, `Form` - which includes `Wizard`, and an increasing variety of `Bootstrap` classes.

Check out the [Template wiki](https://github.com/Voliware/Template/wiki/Template) for examples and details.

## Documentation & Tutorials

View the [docs](http://voliware.github.io/Template) for a `jsDoc` documentation, or check out the [Wiki](https://github.com/Voliware/Template/wiki) for step-by-step explinations of how to use all of the classes.

## Installation
Include the minified or non-minified [production builds](https://github.com/Voliware/Template/tree/master/dist/template) in your web app. For other `Template` libraries, like [Table](https://github.com/Voliware/Template/tree/master/dist/table), [Form](https://github.com/Voliware/Template/tree/master/dist/form), and the [Bootstrap Templates](https://github.com/Voliware/Template/tree/master/dist/bootstrap), include them after the `Template` build files.

## Dependencies
`Template` depends on the [WebUtil](https://github.com/Voliware/WebUtil) library. This small library is already built into the distribution and does not need to be included.

## Contributors
Written by Anthony Agostino.

## License
Licensed under the MIT license.
