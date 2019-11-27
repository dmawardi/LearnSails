// dummy database
// const post1 = {
//   id: 1,
//   title: "Post Title 1",
//   body: "Here is my body, do with it what you want"
// };
// const post2 = {
//   id: 2,
//   title: "Post Title 2",
//   body: "Body Again! Again!"
// };
// const post3 = {
//   id: 3,
//   title: "Post Title 3",
//   body: "Video Dancing! More More, More dancing!"
// };
// // All posts combined
// const allPosts = [post1, post2, post3];

// Export object with route functions
module.exports = {
  // key value associated with route
  posts: async function(req, res) {
    //   Using Await
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (err) {
      res.serverError(err.toString());
    }

    // funciton to query all from database
    // Post.find().exec((err, data) => {
    //   if (err) {
    //     return res.serverError(err.toString());
    //   }
    //   res.send(data);
    // });
  },

  //   Create new post
  create: function(req, res) {
    const title = req.body.title;
    const body = req.body.body;

    console.log("Title: " + title + "\nbody: " + body);
    // Sails method of logging
    sails.log.debug("Title: " + title + "\nbody: " + body);

    Post.create({ title: title, body: body }).exec(err => {
      console.log("Finished creating post object. \nerr: ", err);
      if (err) {
        return res.sendStatus(500);
      }
      return res.sendStatus(200);
    });
  },

  delete: async function(req, res) {
    const postId = req.param("postId");

    try {
      const deletion = await Post.destroy({
        id: postId
      });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }

    // res.send("trying to delete post now. ID:" + req.param("postId"));
  },

  //   Find by ID
  findById: async function(req, res) {
    //   An alternative to req.params.postId
    const postId = req.param("postId");

    try {
      const posts = await Post.find({
        id: postId
      });
      res.send(posts);
    } catch (err) {
      res.serverError(err.toString());
    }

    // Filter the posts array by the post id to find a match
    // const filteredPosts = allPosts.filter(element => {
    //   return element.id == postId;
    // });

    // // If a match is found
    // if (filteredPosts.length > 0) {
    //   // Send the matches
    //   res.send(filteredPosts);
    // } else {
    //   // Send error
    //   res.send("failed to find post by id: " + postId);
    // }
  }
};
