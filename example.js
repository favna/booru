const Booru = require('booru');
const {search, BooruError, sites} = require('booru');
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'

// Search with promises, plus some demo error-checking
Booru.search(site, [tag1, tag2], {limit: 1, random: false})
  .then(posts => {
    //Log the direct link to each image
    for (let post of posts) {
      console.log(post.fileUrl);
    }
  })
  .catch(err => {
    if (err instanceof BooruError) {
      //It's a custom error thrown by the package
      console.error(err.message);
    } else {
      //This means I messed up. Whoops.
      console.error(err);
    }
  });

// Search with async/await
async function booruSearch(site, tags, limit = 1, random = true) {
  const posts = await Booru.search(site, tags, {limit, random});

  return console.log(posts[0].fileUrl);
}

// Search without instantiation and with async/await (a.k.a. the fancy pants way)
async function booruSearchDirect(site, tags, limit = 1, random = true) {
  const posts = await search(site, tags, {limit, random});

  return console.log(posts[0].fileUrl);
}

console.log(Booru.sites); // you can also check the sites and the options for each
console.log(Object.keys(sites)); // or just the site URLs