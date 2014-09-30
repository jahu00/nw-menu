var menu = {
	// init(_gui) - initializes your menu
	// _gui - nw.gui module local name
	//
	// If _gui is null, html version of the menu will be retained.
	// When the html version is initialized arrows are added to MenuItems
	// containing submenenus (if necessary). However you can put the arrows
	// directly into the original html if you like (it won't interfer with
	// the initialization process).
	init: function( _gui)
	{
		$('#MainMenu > .MenuItem > .Submenu .MenuItem > .Submenu').each(function()
		{
			var menuItem = $(this).parent();
			if (menuItem.find('.Arrow').length == 0)
			{
				menuItem.append('<div class="Arrow"></div>');
			}
		});
		
		if (_gui !== 'undefined' && _gui !== null)
		{
			menu.gui = new _gui.Menu({ type: 'menubar' });
			$('#MainMenu').hide();
		}
		
		$('#MainMenu .MenuItem').each(function()
		{
			var item = this;
			item.enabled = !$(item).hasClass('disabled');
			
			item.disable = function()
			{
				if(!$(item).hasClass('disabled'))
					$(item).addClass('disabled');
				
				if (typeof item.gui !== 'undefined')
					item.gui.enabled = false;
			};
			
			item.enable = function()
			{
				$(item).removeClass('disabled');
				if (typeof item.gui !== 'undefined')
					item.gui.enabled = true;
			};
			
			item.__defineGetter__("enabled", function(){
				return !$(item).hasClass('disabled');
			});
		   
			item.__defineSetter__("enabled", function(val){
				if (val == true)
				{
					item.enable();
				}
				else if (val == false)
				{
					item.disable();
				}
				else
				{
					throw "Cannot enable or disable menu item. Incorrect state value.";
				}
			});
			
			if (typeof menu.gui !== 'undefined')
			{
				item.gui = new _gui.MenuItem({ label: $(item).children('.Header').text() });
				item.gui.click = function()
				{
					$(item).click();
				};
				if (item.enabled == false)
				{
					item.gui.enabled = false;
				}
			}
		});
		
		if (typeof menu.gui !== 'undefined')
		{
		
			$('#MainMenu .MenuSeparator').each(function()
			{
				this.gui = new _gui.MenuItem({ type: 'separator' });
			});
			
			function InitSubmenu(submenu)
			{
				$('> .MenuItem > .Submenu', submenu).each(function()
				{
					InitSubmenu(this);
				});
				
				var menuItem = submenu.parentNode;
				var guiSubmenu = new _gui.Menu();
				$(submenu).children().each(function()
				{
					guiSubmenu.append(this.gui);
				});
				menuItem.gui.submenu = guiSubmenu;
			}
			
			$('#MainMenu > .MenuItem > .Submenu').each(function()
			{
				InitSubmenu(this);
			});
			
			$('#MainMenu').children().each(function()
			{
				menu.gui.append(this.gui);
			});
			
			_gui.Window.get().menu = menu.gui;
		}
	}
};