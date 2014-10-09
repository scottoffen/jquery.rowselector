jQuery Selectables - Selectable Tables
======================================

Select and deselect multiple rows in a table using click and shift-click.

Selectables works by adding or removing a class to the row (`tbody > tr`) clicked and - if the shift key was pressed - the rows in between the row clicked on and the previous row clicked on.

The CSS class used is `selected` by default, but can be anything you specify.

>**The Multiple Row Rule**: If the **shift key** is pressed **AND** the row clicked on and the previous row clicked on both either have or don't have the specified class, apply the same change to all rows in the range between the row clicked and the last row clicked.

It sounds more complex than it actually is. Check out the demo for a working example.

### Visual Indicators ###

If you want the selected rows to change visually (e.g., changing the background color on selected rows), then make sure you define that in your CSS somewhere. Keep [CSS precedence](http://www.vanseodesign.com/css/css-specificity-inheritance-cascaade/) in mind!

For example, if I were using [Bootstrap](http://www.getbootstrap.com) to style my table with odd/even row striping, I would need to make sure the definition for the CSS was at least as specific as the Bootstrap definition (using [CSS descendant selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors)).

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

By default, Selectables will attempt to help you prevent the selection of all the text in a range of rows when the shift key is used by adding an `unselectable` class to the table and setting the value of the [`unselectable`](http://msdn.microsoft.com/en-us/library/ms537840(v=vs.85).aspx) attribute for the table to `on`.

For Selectables to help you, **you will need to define** the `unselectable` class in your CSS like this:

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

## Usage ##

Given a table with an id of `mytable`, in your JavaScript:

```javascript
$('#mytable').selectables();
```

If you want to use the class `custom-class` instead of the default `selected` class:

```javascript
$('#mytable').selectables('custom-class');
```

Just make sure that whatever class name you use - be it the default or otherwise - that you include an appropriate style definition as detailed above if you want to apply visual indicators.

### Example ###

>In this example I use Bootstrap to handle my table styling, but Bootstrap is NOT a dependency for this plugin.

**CSS**

Define `unselectable` and your visual indicators in your CSS.

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

.table-striped > tbody > tr:nth-child(odd).selected > td
{
	background-color: #9FAFD1;
}

.table-striped > tbody > tr:nth-child(even).selected > td
{
	background-color: #B0BED9;
}
```

**HTML**

In your HTML table, make sure each `tr` in the `tbody` has an `id` attribute.

```html
<table id="mytable" cellpadding=0 cellspacing=0 border=0 class="table table-striped">
	<thead>
		<tr>
			<th>#</th>
			<th>Col 1</th>
			<th>Col 2</th>
			<th>Col 3</th>
			<th>Col 4</th>
		</tr>
	</thead>
	<tbody>
		<tr id="0"><td>0</td><td>R0C1</td><td>R0C2</td><td>R0C3</td><td>R0C4</td></tr>
		<tr id="1"><td>1</td><td>R1C1</td><td>R1C2</td><td>R1C3</td><td>R1C4</td></tr>
		<tr id="2"><td>2</td><td>R2C1</td><td>R2C2</td><td>R2C3</td><td>R2C4</td></tr>
		<tr id="3"><td>3</td><td>R3C1</td><td>R3C2</td><td>R3C3</td><td>R3C4</td></tr>
		<tr id="4"><td>4</td><td>R4C1</td><td>R4C2</td><td>R4C3</td><td>R4C4</td></tr>
		<tr id="5"><td>5</td><td>R5C1</td><td>R5C2</td><td>R5C3</td><td>R5C4</td></tr>
		<tr id="6"><td>6</td><td>R6C1</td><td>R6C2</td><td>R6C3</td><td>R6C4</td></tr>
		<tr id="7"><td>7</td><td>R7C1</td><td>R7C2</td><td>R7C3</td><td>R7C4</td></tr>
		<tr id="8"><td>8</td><td>R8C1</td><td>R8C2</td><td>R8C3</td><td>R8C4</td></tr>
		<tr id="9"><td>9</td><td>R9C1</td><td>R9C2</td><td>R9C3</td><td>R9C4</td></tr>
	</tbody>
</table>
```

**JavaScript**

Apply selectables to your table when the DOM is ready!

```javascript
$(document).ready(function ()
{
	$('#mytable').selectables();
});
```

It can even be applied to multiple tables simultaneously!

## Discovering Selected Rows ##

Getting a list of the ids of all selected rows is as easy as [ABC 123](http://www.youtube.com/watch?v=WqIeso6SBm0)!

```javascript
var ids = [];

$('#mytable tr.selected').each(function ()
{
	ids.push(this.id);
});

alert("Selected Rows : " +  ids.join(", "));

```
