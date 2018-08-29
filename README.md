LesMoffat Dev CV
================

This App is an isomorphic JavaScript app built to explain an showcase my skills, personality and beliefs as a JS / FE / mid-end dev (and human being).

The [app itself](https://cv.lesmoffat.co.uk/cv) is built with the follow tech: 
- React, for rendering.
- Next.JS to help with the isomorphic stuff, bundling.
- Styled-jsx, for scoped styling of components.
- WebGL / Shaders / Pixi, for the funimations (see what I did there?).
- Redux, for state management / data-fetching.
- All hosted and deployed with [Now](http://zeit.co/now).

The [API](https://github.com/lesbaa/cv-api) is a REST JSON microservice. Tech used is:
- [Micro](https://github.com/zeit/micro), for request handling.
- MongoDB Atlas, for data storage.
- [MongooseJS](https://mongoosejs.com/) for accessing the mongoDB instance.
- NodeMail, notifies me when someone is looking at the CV (I might remove this depending on how spammed I get and just add another MongoDB collection instead).

### Todo Tech Stuff (in no particular order)
- [x] MongoDB instance for data storage.
- [x] REST microservice for data fetching. See [here](https://github.com/lesbaa/cv-api)
- [x] SSR Caching for prerendered pages.
- [x] Deployment via [Now](http://zeit.co/now)
- [] Jest / Enzyme Tests.
- [] Refactor, tidy, make code DRYer.
- [] Less resource intensive mobile version, not responsive design as the webgl side can be resource heavy.
- [] Service Worker to fetch and precache assets. (sw-toolbox).
- [x] DNS stuff for subdomains, cv.lesmoffat.co.uk, api.lesmoffat.co.uk.
- [x] .ICS reminder event endpoint to schedule reminder to view CV on desktop.
- [] GraphQL endpoint to API (potentially not a big enough api as yet, but would be fun to make).
- [] GraphQL-ify the CV App itself.
- [] Rebuild the API using something else like Django running in a Docker container, or maybe the Wordpress API (because then I get a CMS for free).
- [] Electron App? maybe a bit too far, calm down calm down.
- [x] GDPR Compliance.

### Todo Content Stuff

- [x] Intro / hello
- [x] DevSkills scene
- [x] SoftSkills scene
- [] Timeline / work experience scene
- [x] UpNext scene
- [x] Me as a person scene
- [] References scene
- [x] Outro / bye