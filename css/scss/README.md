Evernote SASS Structure Boilerplate
=============


SASS Directories
----------

1.  Base

	The base directory contains styles that help start a project. The base directory could contain the following type of SASS files:
	* Vendor dependancies (Compass, Foundation)
	* Authored dependancies (Mixins, variables, Extends)
	* Fonts
	* Reset

2.  Layout

	The layout directory contains styles that are large containers of a page. This directory could include SASS files like:
	* Responsive Grid
	* Page specific layouts

3.  Modules

	The modules directory will probably contain the bulk of your SASS files. A page may consist of multiple modules and should be style individually. These modules may include files like:
	* Header
	* Footer
	* Navigation
	* Content Block

4.  Themes

	The themes directory contains any specific styles that a page may need to change from the generic layout or modules. For example the header in your website maybe green throughout a website or application but on a specific page you want it to change to a blue background that's where the themes files would come in.




  

## Removing unused Sass modules

With Evernote's Sass structure we run into having a lot of Sass files in our build. Sometimes they are no longer used so we've started using a Grunt task called [Sassyclean](https://github.com/ryanburgess/grunt-sassyclean) that helps automate removing old unused Sass modules.

## Rules

  - There should only be a maximum of 2 CSS files per page ( this prevents HTTP requests )
  - One line for each selector or rule
  - List related items together
  - Only nest 3 levels deep
  - Break files out into small modules (avoid having a SCSS file that is larger than 100 lines)
  - Avoid using IDs throughout the site. Use IDs for parent elements. Example: Header, Footer, Main. Using Classes avoids having to use !important 
  - Be generous with commenting
  - If a ```:hover``` pseudo class is styled, ```:focus``` should also be styled for accessibility.

## Commenting
  - Using "// " for your comments in SASS and they will not output in the compiled CSS


## Variables
  - Any values commonly throughout the SASS build should be set as a variable (fonts, colors, percentages, z-index)
  - All colors should be variables


## Order of imports
  - Vendor dependancies (compass)
  - Authored dependancies (Mixins, variables)
  - Base styles ( reset, fonts, typography )
  - Layout styles
  - Modules styles
  - Theme styles

## Release History
* 1.1.4: Small updates to build script.
* 1.1.3: Added [pull #10](https://github.com/evernote/sass-build-structure/pull/10) add missing "grunt-newer" package.
* 1.1.2: Added [pull #9](https://github.com/evernote/sass-build-structure/pull/9) update grid.
* 1.1.1: Added [pull #8](https://github.com/evernote/sass-build-structure/pull/8) clean up type.
* 1.1.0: Added [pull #7](https://github.com/evernote/sass-build-structure/pull/7) clean up coding style.
* 1.0.9: Added [pull #6](https://github.com/evernote/sass-build-structure/pull/6) missing margin auto mixin.
* 1.0.8: Added [pull #5](https://github.com/evernote/sass-build-structure/pull/6) JSCS support based on google preset.
* 1.0.7: Added Added [pull #4](https://github.com/evernote/sass-build-structure/pull/4) editorconfig support.
* 1.0.6: Update documentation for individual Sass file.
* 1.0.5: Ability to create new individual Sass file.
* 1.0.4: Set default HTML font size to 62.5% and change REM mixin calculation.
* 1.0.3: Update documentation
* 1.0.2: Remove old shell script
* 1.0.1: Update generator script
* 1.0.0: Add evernotesass generator script
* 0.1.3: Added grunt package with Sass, Watch and Sassyclean.
* 0.1.0: Initial release.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
