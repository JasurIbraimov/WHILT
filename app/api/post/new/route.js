import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
    const { userId, post, tag } = await req.json();
    try {
        await connectToDB();
        const newPost = new Post({ creator: userId, tag: !tag.includes("#") ? "#" + tag : tag, post });
        await newPost.save();

        return new Response(JSON.stringify(newPost), { status: 201, statusText: "Success" });
    } catch (error) {
        console.error(error);
        return new Response("Failed to create a new post", {status: 500, statusText: "Failed"})
    }
};
