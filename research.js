(function ($)
{
	$.fn.selected = function ()
	{
		var table = $(this[0]);
		var match = undefined;

		if ((table.prop('tagName').toUpperCase() === 'TABLE') && (table.attr('data-selectable')))
		{
			var c = table.attr('data-selected-class') || 'selected';
			match = $(table).find('tbody tr.' + c);
		}

		return match;
	};
})(jQuery);


$(document).ready(function ()
{
	var tables = {};

	$('body').on('mouseover', 'table[data-selectable]', function (evt)
	{
		$(this).addClass('unselectable').attr('unselectable', 'on');
	});


	$('body').on('click', 'table[data-selectable] tr', function (evt)
	{
		var $this = $(this);
		var table = $this.closest('table');

		var q = table.attr('data-selectable') || false;
		var c = table.attr('data-selected-class') || 'selected';

		if (q !== 'none')
		{
			if (q === 'one')
			{
				$(this).siblings().removeClass(c).end().addClass(c);
			}
			else
			{
				$(this).toggleClass(c);

				if (evt.shiftKey)
				{
					var last = tables[table.id] || false;
					if ((last) && (this !== last) && ($(this).hasClass(c) === $(last).hasClass(c)))
					{
						var startat = (this.rowIndex > last.rowIndex) ? last : this;
						var endat   = (this.rowIndex > last.rowIndex) ? this : last;
						var do_add  = $(this).hasClass(c);

						var rows = $(startat).nextAll('tr');
						for (var i = 0, l = rows.length; i < l; i += 1)
						{
							if (rows[i] === endat) {break;}
							if (do_add)
							{
								$(rows[i]).addClass(c);
							}
							else
							{
								$(rows[i]).removeClass(c);
							}
						}
					}
				}
			}
		}

		tables[table.id] = this;
	});
});
