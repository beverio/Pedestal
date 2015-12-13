# Pedestal
You need to have Gulp and PhantomJS globally installed for this to compile. Actual setup instructions will come later.

For now this readme will serve as an to-do list.
## To-do
### General
- Fix buttons.sass and navigation.sass not compiling when settings.sass isn't included in the files itself
  This issue also breaks the themes
- Finish all empty element pages, including the main page
- Drop-shadow mixin and settings
  While pedestal elements have no drop shadows by default, adding settings for all elements would make it much easier to add drop shadows in themes.
- Only recompile the jade file that has changed when saving
- Theme demo page
- Watch theme files (jade and sass) and recompile and take screenshots on change
- Fix screenshots not running the first time /dist/ gets created
- Build better themes page
- Better footer
- Nice homepage


### Element specific
- Buttons
  - Test SVG icons in buttons
  - [disabled] hover
- Type
  - Add variable to edit font family from settings
  - Add variable to edit heading font family only
- Forms
- Tables
- Cards
- Images
  - Thumbnails

### Utilities
I'm not sure about adding these. 

- Border color
- Background color
- Font-family
- Background image
  - Gravity
  - Size

### No idea how to fix
- Phantomjs not rendering navbar properly on screenshots

### Javascript
I'm not sure if I want this framework to contain any javascript. But if I'm going to add a js file, it should contain these features.

- Add javascript to Pedestal to make navbars responsive automatically, at the right breakpoint
