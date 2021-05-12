const db = require("../config/db");
const { nanoid } = require('nanoid');
var validUrl = require('valid-url');

const postController = {
    createNewPost: async(req, res) => {
        //This POST API takes in the details (text, images, etc)
        //of the post. Before this, the user would have have gotten
        //a page asking them on which social media platform do they
        //want to post. Those boolean values are saved here under the
        //names 'facebook', 'twitter', and 'instagram'. After the
        //details are entered, a series of validation checks are
        //run before a success message is sent.
        try {
            const {post_text, video_link, post_location, tag, image_link, facebook, twitter, instagram} = req.body;
            const post_id = nanoid(); //For generating a unique post id for each post

            //Checking if any of the post fields are empty
            if (typeof post_text === "undefined" && typeof video_link === "undefined" && typeof post_location === "undefined" && typeof tag === "undefined" && typeof image_link === "undefined") {
                return res.status(400).send({
                   status: 400,
                   message: "At Least One Field Should Be Entered" 
                });
            }

            //Tag validation
            if (typeof tag != "undefined") {
                var tag_list = tag.split(", ");

                var i;
                for (i = 0; i < tag_list.length; i++) {
                    const tag_str = tag_list[i];
                    if (tag_str[0] != '@') {
                        return res.status(400).send({
                            status: 400,
                            message: "Incorrect Tag Entry" 
                        });
                    }
                }

                for (i = 0; i < tag_list.length; i++) {
                    await db.query(
                        "INSERT INTO tags (post_id, tag) VALUES ($1, $2)",
                        [post_id, tag_list[i]]
                    );
                }
            }

            //Image link validation
            if (typeof image_link != "undefined") {
                var image_list = image_link.split(", ");

                var i;
                for (i = 0; i < image_list.length; i++) {
                    if (!validUrl.isUri(image_list[i])) {
                        return res.status(400).send({
                            status: 400,
                            message: "Incorrect Image Link Entry" 
                        });
                    }
                }

                for (i = 0; i < image_list.length; i++) {
                    await db.query(
                        "INSERT INTO images (post_id, image_link) VALUES ($1, $2)",
                        [post_id, image_list[i]]
                    );
                }

            }

            //Video link validation
            if (typeof video_link != "undefined") {
                if (!validUrl.isUri(video_link)) {
                    return res.status(400).send({
                        status: 400,
                        message: "Incorrect Video Link Entry" 
                    });
                }
            }

            //Facebook Post Validation
            if (facebook === true) {
                if (typeof image_link != "undefined") {
                    if (image_list.length > 1) {
                        return res.status(400).send({
                            status: 400,
                            message: "Maximum 1 Image Allowed" 
                        });
                    }
                }
            }

            //Twitter Post Validation
            if (twitter === true) {
                if (typeof post_text != "undefined") {
                    if (post_text.length > 280) {
                        return res.status(400).send({
                            status: 400,
                            message: "Maximum 280 Characters Allowed" 
                        });
                    }
                }
                if (typeof image_link != "undefined") {
                    if (image_list.length > 4) {
                        return res.status(400).send({
                            status: 400,
                            message: "Maximum 4 Images Allowed" 
                        });
                    }
                }
            }

            //Instagram Post Validation
            if (instagram === true) {
                if (typeof post_text != "undefined") {
                    if (post_text.length > 2000) {
                        return res.status(400).send({
                            status: 400,
                            message: "Maximum 2000 Characters Allowed" 
                        });
                    }
                }
                if (typeof image_link != "undefined") {
                    if (typeof video_link === "undefined") {
                        if (image_list.length > 10) {
                            return res.status(400).send({
                                status: 400,
                                message: "Maximum 10 Images and Videos Allowed" 
                            });
                        }
                    } else {
                        if (image_list.length > 9) {
                            return res.status(400).send({
                                status: 400,
                                message: "Maximum 10 Images and Videos Allowed" 
                            });
                        }
                    }
                }
            }

            await db.query(
                "INSERT INTO posts (post_id, post_text, video_link, post_location, facebook, instagram, twitter) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                [post_id, post_text, video_link, post_location, facebook, instagram, twitter]
            );

            return res.status(200).send({
                status: 200,
                message: "Post Details Successfully Stored",
                data: {
                    post_id,
                    post_text,
                    video_link,
                    post_location,
                    facebook,
                    instagram,
                    twitter
                }
            });
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                status: 500,
                message: "Something Went Wrong"
            });
        }
    },

    getPostLinks: async(req, res) => {
        //Gets the links of the posts. No code here due to no facebook/twitter API in use as of now.
        try {
            const {post_id} = req.params;

            return res.status(200).send({
                status: 200,
                message: "Success",
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Something Went Wrong"
            });
        }
    }
}

module.exports = postController;