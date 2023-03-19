# sgh-userscripts (formerly sgh-calendar-export)

Set of UserScripts (written in TypeScript) that enhance various university websites.

## Module list
- bridge: easily check data from previous year (USOSweb) while selecting courses in WD
- calendar: fix annoying race condition issue in WD's calendar
- export: download your schedule as *.ics (iCalendar) file 
- usosLinkFix: rewrite annoying onclick='document.location=""' redirects into standard HTML links in USOSweb HTML schedule
- wdLinkFix: same as above, but in WD websites

## How to build

1. `git clone` it.
2. `npm install` dependencies.
3. `npm run build:<module>` and that's it. Check dist/module for .user.js and sometimes bundle.js file.

## How to install
A detailed manual is a work in progress (along with prebuilt scripts), but tl;dr you need to host bundle.js somewhere or integrate it with .user.js (if applicable) and add it to your UserScript manager. Recommend Violentmonkey for Fx & Userscripts for iOS: I only test on these.

## Structure
Every module has its own folder in `src` and must have user.ts file - it's being compiled with `tsc` into .user.js at build. More advanced scripts (those which heavily rely on internal dependencies or use `npm` packages) may have bundle.ts file, which is compiled with all dependencies into one file, bundle.js, with `parcel`. If that's the case, you must reference bundle.js (@require flag) in final .user.js file. All other files are private helpers, unsuitable for use in other modules. Compilation is done using npm scripts, see `package.json` for more details. 

Shared files shall be placed in `lib` folder. Classes that are abstract (do not access any external services and describe standarized objects) go into `common`, else go into respective folders. 

## Futures plans (in other words: to-do)
- [ ] finish porting, correct style (see // comments; some workarounds are still left intact, and style is inconsistent at some places)
- [ ] make tests (there are few components that really need them)
- [ ] make a library target (base your own script off my resources)
- [ ] create a website with installation manuals and prebuilt binaries (CI/CD possibly)