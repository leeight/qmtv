'use strict';

export default [
  // [/^user\/isFollow/, "user/index/isfollow"],
  // [/^user\/follow/, "user/index/follow"],
  // [/^user\/unFollow/, "user/index/unfollow"],
  [/^video\/anchor\/(\d+)$/, "video/anchor/index?id=:1"],
  [/^video\/category\/(.+)$/, "video/category/index?category=:1"],
  [/^video\/search\/(.+)$/, "video/search/index?word=:1"],
  [/^video\/(\d+)$/, "video/view/index?id=:1"]
];