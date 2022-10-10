"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: 'Demo',
        lastName: 'Bird',
        email: "demo@twitter.com",
        username: "demo",
        bio: 'I am the demo user and the official Twitter logo!',
        location: 'Everywhere',
        website: 'https://twitter.com',
        profileImage: 'https://store-images.s-microsoft.com/image/apps.50484.9007199266244427.4d45042b-d7a5-4a83-be66-97779553b24d.2c71c1ea-c28f-4dd1-b72d-c43cdd3476f4',
        coverImage: 'https://media.wired.com/photos/5941a9186600f013e9634520/191:100/w_1910,h_1000,c_limit/Twitter-FeatureArt.jpg',
        verified: true,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'Red',
        lastName: 'Cardinal',
        email: "redcardinal@user.io",
        username: "cardinalred",
        bio: 'I am a red cardinal',
        location: null,
        website: 'https://ebird.org/species/norcar',
        profileImage: 'https://www.thespruce.com/thmb/wkOfT5zlicyWmVXPbNWylWi3tCE=/1208x906/smart/filters:no_upscale()/fun-facts-about-cardinals-385528-hero-828376fb000b418f9187bf085ff0795f.jpg',
        coverImage: 'https://nas-national-prod.s3.amazonaws.com/h_a1_3725_3_northern-cardinal_carole_wiley_kk_adult-male-and-adult-female_0.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'Chicken',
        lastName: 'Poultry',
        email: "chicken@twitter.com",
        username: "chicken1",
        bio: "The chicken came before the egg. Change my mind.",
        location: null,
        website: 'https://www.peta.org/',
        profileImage: 'https://i.guim.co.uk/img/media/2772b902a53e15027e052888df50c38afe840881/0_43_4751_2851/master/4751.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ae665531ea34f8738a17e75c46524733',
        coverImage: 'https://www.chickens.allotment-garden.org/wp-content/uploads/2016/07/Happy-Chickens.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'Flamingo',
        lastName: 'Pink',
        email: "flamingo@twitter.com",
        username: "flamingflamingo",
        bio: "Pink is my favorite color but you already knew that.",
        location: 'Galapolos Islands',
        website: 'https://facts.net/flamingo-facts/',
        profileImage: 'https://images.unsplash.com/photo-1629394661462-13ea8fe156ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        coverImage: 'https://www.travelandleisure.com/thmb/nT4rCPeW_GCtozBoLuYpSFh0sn0=/775x581/smart/filters:no_upscale()/flamingo-beach-aruba-FLAM0517-b2f4c8163f154fbab2aea7b2d3139ae1.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'Peacock',
        lastName: 'Pavo',
        email: "peacock@twitter.com",
        username: "peacockparty",
        bio: "Beauty is in the eye of the beholder.",
        location: 'India',
        website: 'https://www.peacocktv.com/',
        profileImage: 'https://i.natgeofe.com/n/a4e20a18-8ae7-4f9a-be59-d7038dbd8d82/4463961_square.jpg',
        coverImage: 'https://cdn.hswstatic.com/gif/peacock-feathers.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'Toucan',
        lastName: 'Sam',
        email: "stoucan@twitter.com",
        username: "uncletoucansam",
        bio: "Fruit loops are my jam.",
        location: 'Any where tropical',
        website: 'https://en.wikipedia.org/wiki/Toucan_Sam',
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Ramphastos_toco_Whipsnade_Zoo.jpg',
        coverImage: 'https://www.birdlife.org/wp-content/uploads/2021/06/Toucan-in-tree-by-Zdenek-Machacek-edited-scaled.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'Eagle',
        lastName: 'Bald',
        email: "baldeagle@twitter.com",
        username: "kingeagle",
        bio: "#america",
        location: 'USA',
        website: 'https://www.allaboutbirds.org/guide/Bald_Eagle/overview',
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/About_to_Launch_%2826075320352%29.jpg',
        coverImage: 'https://www.history.com/.image/t_share/MTU3ODc4NjgxMDkyNjk1MzY5/ask-bald-eagle-istock_000017215186large-2.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'cockatiel',
        lastName: 'bird',
        email: "cockatiel@twitter.com",
        username: "cutestcocktaiel",
        bio: "The yellowest bird you'll ever see.",
        location: 'Australia',
        website: 'https://www.allaboutbirds.org/guide/Bald_Eagle/overview',
        profileImage: 'https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Cockatiel-2.jpg',
        coverImage: 'https://media-be.chewy.com/wp-content/uploads/2019/10/24123447/Cockatiel-Facts-1024x576.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'snow',
        lastName: 'owl',
        email: "snow@twitter.com",
        username: "snowyowl",
        bio: "I love the cold.",
        location: null,
        website: null,
        profileImage: 'https://www.akronzoo.org/sites/default/files/styles/uncropped_xl/public/2022-05/Snowy-owl-Frost.png?itok=bw8666Ly',
        coverImage: 'https://cdn.hswstatic.com/gif/snowy-owl.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'pelican',
        lastName: 'bird',
        email: "pelican@twitter.com",
        username: "beachbumpelly",
        bio: "Love long flights on the beach.",
        location: 'on any beach',
        website: 'https://getpelican.com/',
        profileImage: 'https://cdn.britannica.com/30/157430-050-12052BDA/White-pelican.jpg',
        coverImage: 'https://www.tripsavvy.com/thmb/FwmQ-JvBEBDDlVb-j_zdEo0iVsA=/2048x1152/smart/filters:no_upscale()/beach-5b59c9b7c9e77c004b3e0ff0.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'warbler',
        lastName: 'bird',
        email: "warbler@twitter.com",
        username: "warbler",
        bio: "Just a little birdy",
        location: 'Canada',
        website: 'https://ebird.org/species/btbwar',
        profileImage: 'https://www.allaboutbirds.org/guide/assets/photo/64806111-480px.jpg',
        coverImage: 'https://nestwatch.org/wp-content/uploads/2021/05/Black-throated_Blue_Warbler-American_beautyberry-Susan_Disher-ML180786391-scaled.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'ostrich',
        lastName: 'bird',
        email: "ostrich@twitter.com",
        username: "ostrichfun",
        bio: "The leggiest bird you'll ever meet.",
        location: 'Africa',
        website: 'https://www.britannica.com/animal/ostrich',
        profileImage: 'https://www.gannett-cdn.com/-mm-/c5c09dd22346a9b53dbf251b8e93cb6d9ba29868/c=0-196-3861-2377/local/-/media/2015/01/24/Phoenix/Phoenix/635577047626238302-phxdc5-6936v4t3ndh1j0kyujd9-original.jpg?width=3200&height=1808&fit=crop&format=pjpg&auto=webp',
        coverImage: 'https://www.pbs.org/wnet/nature/files/2021/09/catherine-merlin-qeGHu5Jdy5s-unsplash-scaled-e1631640316457.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'baepsae',
        lastName: 'bird',
        email: "birdy@twitter.com",
        username: "birdbot",
        bio: "I am small and round.",
        location: 'Korea',
        website: 'https://en.wiktionary.org/wiki/crow-tit',
        profileImage: 'https://pbs.twimg.com/media/DZFqtAyVAAIbghA.jpg',
        coverImage: 'https://64.media.tumblr.com/bc4c97fb93091b8da19aeb203755795e/tumblr_inline_o2t3f9z0iR1slts64_500.png',
        verified: false,
        password: bcrypt.hashSync("password")
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      "Users",
      {
        username: {
          [Op.in]: ["Demo-lition", "blubird", "cardinalred"]
        }
      },
      {}
    );
  }
};
