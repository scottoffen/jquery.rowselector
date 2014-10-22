jQuery Row Selector - Selectable Table Rows
===========================================

Select and deselect single or multiple rows in a table using click and shift-click, and easily lock your selections at any time and get the rows selected.

**Row Selector** works by adding or removing a class (the default class is `selected`, but you can specify one as well) to the row (`tbody > tr`) clicked and - if the shift key was pressed - the rows in between the row clicked on and the previous row clicked on. Multiple tables on the same page can be using the plugin at the same time without any additional effort on your part!

>**The Multiple Row Rule**: If the **shift key** is pressed **AND** the row clicked on and the previous row clicked on (in the same table) both either *have* or *don't have* the specified class, apply the same change to all rows in the range between the row clicked and the last row clicked.

It sounds more complex than it actually is. Check out the [`demo.html`](https://github.com/scottoffen/jquery.rowselector/blob/master/demo.html) file for a working example.

## Usage ##

### Set Up ###

Include [jQuery](http://jquery.com/download/#using-jquery-with-a-cdn "I choose to use the Google CDN") and this library, and that's really all you need. If you are going to use [Bootstrap](http://getbootstrap.com/getting-started/#download) (not required), you'll want to add references to those style sheets.  Here is a good template:

```html
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	
	<!--[if !IE]>-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<!--<![endif]-->
	
	<!--[if IE]>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<![endif]-->
	
	<script src="jquery.rowselector.js"></script>
```

### Make Your Table Selectable ###

All you have to do is add a [custom HTML5 `data-*` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#data-*) or two to your table to make it selectable, and you can do it an any time!

```html
<!-- Minimum Required -->
<table id="your-table" data-rs-selectable>

<!-- Explicit Definitions -->
<table id="your-table" data-rs-selectable data-rs-type="many" data-rs-class="selected">
```

#### `data-rs-selectable` ####

This attribute informs the plugin that you want it to apply row selections based on the values of the other attributes - both of which are optional!

#### `data-rs-type` ####

This attribute specifices how rows should be selected and unselected - or *not* selected - in a given table.

>Note that all attribute values are case-sensative.

| Value          | Description |
| -------------- | ----------- |
| many (default) | Allows selection of multiple rows |
| one            | Enforces the selection of a single row at a time | 
| none           | Does not allow row selection, but doesn't remove selections already made |

#### `data-rs-class` ####

This attribute defines the CSS class that will be added or removed from rows when selected. If not specified, it defaults to `selected`.

### Visual Indicators ###

If you want the selected rows to change visually (e.g., changing the background color on selected rows), then make sure you define that in your CSS somewhere. Keep [CSS precedence](http://www.vanseodesign.com/css/css-specificity-inheritance-cascaade/) in mind!

For example, if I were using [Bootstrap](http://www.getbootstrap.com) to style my table with odd/even row striping (and using the default `.selected` class), I would need to make sure the definition for the CSS was at least as specific as the Bootstrap definition (using [CSS descendant selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors)).

```css
.table-striped > tbody > tr:nth-child(odd).selected > td
{
	background-color: #9FAFD1;
}

.table-striped > tbody > tr:nth-child(even).selected > td
{
	background-color: #B0BED9;
}
```

### Prevent Text Selection ###

By default, the plugin will attempt to help you prevent the selection of all the text in a range of rows when the shift key is used by adding an `.unselectable` class to the table and setting the value of the [`unselectable`](http://msdn.microsoft.com/en-us/library/ms537840(v=vs.85).aspx) attribute for the table to `on`.

For this to work, **you will need to define** the `.unselectable` class in your CSS like this:

```css
*.unselectable
{
	-webkit-touch-callout: none;
	  -webkit-user-select: none;
	   -khtml-user-select: none;
	     -moz-user-select: none;
	      -ms-user-select: none;
	          user-select: none;
}
```

## Custom Events and Methods ##

The plugin provides a custom event that can be listened for and an method addition to the jQuery prototype to get a list of all rows selected from a table.

### Prototype Extension : $.fn.selectedrows() ###

This method will return a jQuery wrapped set of all rows that have the class specified by `data-rs-class` at the time the method was called. This means that you can change the class at any time to allow for different - even *intersecting* - rows to be selected.

>The first element in the wrapped set returned must be a table and have the data-rs-selectable attribute or *undefined* gets returned.

```javascript
var rows = $('#your-table').selectedrows();
```

>Before you go calling that method every time a row is clicked, you might want to take a look at the custom event the plugin provides.

### Custom Event : clicked.rs.row ###

If you add an event handler to the table to be notified when rows are *clicked*, chances are good that your event handler will fire before the event handler in the plugin has the chance to add/remove the class. 

>This is because the plugin event handler is attached to the `click` event on the `body` and uses the selector `table[data-rs-selectable] tr` to take action only on the tables that have the attribute. In contrast, your event handler would most likely be attached to the table using the `#your-table tr` selector, and hence would be fired first.

You can add a listener for and take action on that event firing, knowing that the plugin has finished doing it's job before you request the list of selected rows.

```javascript
$('#your-table').on('clicked.rs.row', function (evt)
{
	// Now it's safe to check what was selected
	var rows = $(this).selectedrows();
});
```

## Edge Cases ##

### Prevent Event Firing ###

If you want to have an element (such as an icon) in a given row that you want to be able to click and not change the selected state of the row, just include the following in your `click` event handler for that element:

```javascript
evt.stopPropagation();
```

And the event included in the plugin will not fire.

### Lock Selections ###

If at any point in time you want to freeze the selected state of all rows in the table without losing the ability to get the selected rows using the prototype extension:

```javascript
$('#your-table').attr('data-rs-type', 'none');
```

When you are ready to resume selecting again, just change it back to either `many` or `one`.

### Multiple Selection Classes ###

Since the value of `data-rs-class` can be changed on-the-fly - it's just an attribute on an element, after all - you can create different - and even overlapping - sets of selections.

>This is a pretty advanced topic, and may produce unintended results if not well considered before using. You'll see this in action if you play around with the demo. While it was not an intended use case when I developed this plugin, it has emerged as an interesting feature that I wanted to document.

When the value of `data-rs-class` changes, there is nothing in place to remove from already selected rows the previous value, so it is still there. When `$('#your-table').selectedrows()` gets called, it matches elements with the class specified in `data-rs-class` (or the default) at the time the method is called. 
