(function ($)
{
	var elements = {};

	$.fn.selectables = function (tclass)
	{
		var style = tclass || 'selected';

		this.each(function ()
		{
			if (this.nodeName.toLowerCase() === 'table')
			{
				$this = $(this);

				$this.addClass('unselectable').attr('unselectable', 'on');
				elements[this.id] = { 'style' : style, 'last' : false };

				$this.on('click', 'tr', function (evt)
				{
					if ((evt.delegateTarget.id) && (evt.delegateTarget.id in elements))
					{
						var style = elements[evt.delegateTarget.id].style;

						$(this).toggleClass(style);

						if (evt.shiftKey)
						{
							var last = elements[evt.delegateTarget.id].last;
							if ((last) && (this !== last) && ($(this).hasClass(style) === $(last).hasClass(style)))
							{
								var startat = (this.rowIndex > last.rowIndex) ? last : this;
								var endat   = (this.rowIndex > last.rowIndex) ? this : last;
								var do_add  = $(this).hasClass('selected');

								var rows = $(startat).nextAll('tr');
								for (var i = 0, l = rows.length; i < l; i += 1)
								{
									if (rows[i] === endat) {break;}
									if (do_add)
									{
										$(rows[i]).addClass('selected');
									}
									else
									{
										$(rows[i]).removeClass('selected');
									}
								}
							}
						}

						elements[evt.delegateTarget.id].last = this;
					}
				});
			}
		});

		return this;
	};
})(jQuery);
