## Usage
jquery.typer.js can be used one of two ways:

### Type once with typeTo()

If you just want to use the effect once, use `typeTo()`. It can be used as follows:

```javascript
$('h3').typeTo("New Text");
```

This will do a one-time transition.

### Type indefinitely with typer()

Now let's say you want to loop over a set of strings for the typing effect. Easy!

```javascript
$('[data-typer-targets]').typer();
```

That code will start the effect on all elements with the `data-typer-targets` attribute.

You obviously need to supply it with some source data. The `data-typer-targets` attribute can be either a comma-separated string or a piece of JSON.

### Options

There are some options that are available to you as well:

```javascript
// Defaults
{
  highlightSpeed    : 20,
  typeSpeed         : 100,
  clearDelay        : 500,
  typeDelay         : 200,
  clearOnHighlight  : true,
  typerDataAttr     : 'data-typer-targets',
  typerInterval     : 2000
}

// Set the options individually
$.typer.options.highlightSpeed = 500;
```
