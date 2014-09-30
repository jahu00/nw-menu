node-webkit is an awesome envoirment for people who know how to write web applications
and now want to get into writing desktop applications quickly. However designing gui
elements (such as menu) through JavaScript code seems to be counter intuitive.

This is where this library comes in. nw-menu allows you to design your main window menu
in simple html and then convert it to nw.gui menu (or even keep your html menu).

nw.gui menu will respect the click events which you set up for your html menu, so you
can code them like you would on a standard html page (for example using jquery).

After initializing the menu using:
menu.init(gui);

All the .MenuItem elements inside your #MainMenu will gain an extra enabled property
as well as helper methods enable() and disable(). Through those, you can turn the
.MenuItem on and off. This will apply regardless of wheter you use html menu or nw.gui
menu.

This library relies on jquery 1.8.3. Using nw-menu with newer versions of jquery might
require some changes in the code.

The html version of the menu relies mostly on css. In fact it relies so much on css that
it should work fine even if it's not initialized (though there will be no functionality
for easy enabling and disabling menu items).

Files:
index.html - usage sample
jquery-1.8.3.min.js - copy of jquery 1.8.3 (used by the sample)
menu.css - core of the html version of the menu; can be used without the library for making
a menu in plain html; if you don't plan to render html menu in your node-webkit app, you
can skip it entirely (in which case keeping #MainMenu hidden from the start is advised).

menu.js - the library
package.json - package for the sample

Check the sample code to see how this library can be used.
