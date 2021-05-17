const db = require("../config/db");
const request = require('request-promise');

const postController = {
    /**
     * Posting Text and Image On Facebook Page
     **/
    createFacebookPost: async(req, res) => {
        try {
            const {
                post_text, 
                // video_link,
                image_link, 
                image_caption,
                // video_description
            } = req.body;
            //Validation:To be Done...
            const postOptions = {
                method: 'POST',
                qs: {
                    access_token: process.env.FB_ACCESS_TOKEN
                }
            };
            //Text Post
            if(typeof post_text !== "undefined"){
                postOptions.uri = `${process.env.FB_BASE_URL}${process.env.FB_PAGE_ID}/feed`;
                postOptions.qs.message = post_text;
            }else if(typeof image_link !== "undefined"){//Image Post
                postOptions.uri = `${process.env.FB_BASE_URL}${process.env.FB_PAGE_ID}/photos`;
                postOptions.qs.url = image_link;
                postOptions.qs.caption = typeof image_caption !== "undefined" ? image_caption : "";
            }
            // else if(typeof video_link !== "undefined"){//Video Post
            //     postOptions.uri = `${process.env.FB_BASE_URL}videos`;
            //     postOptions.qs.file_url = video_link;
            //     postOptions.qs.description = typeof video_description !== "undefined" ? video_description : "";
            // }
            request(postOptions)
            .then(fbResponse => {
                const parsedResponse = JSON.parse(fbResponse);
                /**
                 * Response Example:
                 * Text Post: { id: '109091084696916_109375071335184' }
                 * Image Post:  { id: '109376264668398',
                 *                   post_id: '109091084696916_109376264668398' }
                 * Video Post:  { id: '355100536204589' }
                 **/ 
                const postId = typeof parsedResponse.post_id !== "undefined" ? parsedResponse.post_id : parsedResponse.id;
                // console.log(parsedResponse)
                //Store the Required Data in Database:To be Done...
                
                return res.status(200).send({
                    status: 200,
                    message: "Content Posted Successfully",
                    data: {
                        post_id: postId
                    }
                });
            })
            .catch(function (err) {
                console.log(err, 'err')
                return res.status(500).send({
                    status: 500,
                    message: "Error Posting"
                });
            });
        } catch (error) {
            console.log(error,'error')//Testing
            return res.status(500).send({
                status: 500,
                message: "Something Went Wrong"
            });
        }
    },
    /**
     * Get Facebook Post data 
     **/
    getFacebookPostData: async(req, res) => {
        try {
            const {post_id} = req.params;
            const getOptions = {
                method: 'GET',
                uri: `${process.env.FB_BASE_URL}/${post_id}`,
                qs: {
                    access_token: process.env.FB_ACCESS_TOKEN
                }
            };
            request(getOptions)
            .then(fbResponse => {
                const parsedResponse = JSON.parse(fbResponse);
                /**
                 * Response Example:
                 * {"created_time": "2021-05-17T21:38:31+0000",
                    "message": "Text Post Testing",
                    "id": "109091084696916_109375071335184"}
                 **/
                // console.log(parsedResponse)

                return res.status(200).send({
                    status: 200,
                    message: "Post Data Retrieved Successfully",
                    data: parsedResponse
                });
            })
            .catch(function (err) {
                console.log(err, 'err')
                return res.status(500).send({
                    status: 500,
                    message: "Error Retrieving Post Data"
                });
            });
        } catch (error) {
            console.log(error,'error')//Testing
            return res.status(500).send({
                status: 500,
                message: "Something Went Wrong"
            });
        }
    },
    /**
     * Updating Facebook Page`s Posts
     * Only Some Part Can be updated:privacy,composer_session_id,feed_topics,link_edit,sticker_edit,message,is_hidden,is_published,scheduled_publish_time,expiration,is_approved,is_pinned,timeline_visibility,backdated_time,source_type,attached_media,og_action_type_id,og_object_id,og_phrase,og_icon_id,og_suggestion_mechanism,og_hide_object_attachment,tags,og_set_profile_badge,place,is_explicit_location,product_item,should_sync_product_edit,sponsor_id,direct_share_status,sponsor_relationship,text_format_preset_id,files
     **/
    updateFacebookPost: async(req, res) => {
        try {
            const {
                post_id,
                message, 
            } = req.body;
            //Validation:To be Done...
            const postOptions = {
                method: 'POST',
                uri: `${process.env.FB_BASE_URL}${post_id}`,
                qs: {
                    access_token: process.env.FB_ACCESS_TOKEN,
                    message
                }
            };
            request(postOptions)
            .then(fbResponse => {
                const parsedResponse = JSON.parse(fbResponse);
                /**
                 * Response Example: { success: true }
                 * */
                // console.log(parsedResponse)
                //Store the Required Data in Database:To be Done...
                return res.status(200).send({
                    status: 200,
                    message: "Post Content Updated Successfully"
                });
            })
            .catch(function (err) {
                console.log(err, 'err')
                return res.status(500).send({
                    status: 500,
                    message: "Error Updating Posting"
                });
            });;
        } catch (error) {
            console.log(error,'error')//Testing
            return res.status(500).send({
                status: 500,
                message: "Something Went Wrong"
            });
        }
    },
    /**
     * Delete Facebook Post
     **/
    deleteFacebookPost: async(req, res) => {
        try {
            const {post_id} = req.params;
            const getOptions = {
                method: 'DELETE',
                uri: `${process.env.FB_BASE_URL}/${post_id}`,
                qs: {
                    access_token: process.env.FB_ACCESS_TOKEN
                }
            };
            request(getOptions)
            .then(fbResponse => {
                const parsedResponse = JSON.parse(fbResponse);
                /**
                 * Response Example: { success: true }
                 **/
                // console.log(parsedResponse)

                return res.status(200).send({
                    status: 200,
                    message: "Post Deleted Successfully"
                });
            })
            .catch(function (err) {
                console.log(err, 'err')
                return res.status(500).send({
                    status: 500,
                    message: "Error Deleting Post"
                });
            });
        } catch (error) {
            console.log(error,'error')//Testing
            return res.status(500).send({
                status: 500,
                message: "Something Went Wrong"
            });
        }
    },
}

module.exports = postController;