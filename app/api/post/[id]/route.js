import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {
    try {
        const { id } = res.params;
        await connectToDB();
        const post = await Post.findById(id).populate("creator");
        if (!post) {
            return new Response(
                JSON.stringify({ message: "Post not found!" }),
                { status: 404, statusText: "Failed" }
            );
        }
        return new Response(JSON.stringify(post), {
            status: 200,
            statusText: "Success",
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Failed to fetch posts" }),
            { status: 500, statusText: "Failed" }
        );
    }
};

export const PATCH = async (req, res) => {
    const { post, tag } = await req.json();
    if (!post || !tag) {
        return new Response(
            JSON.stringify({ message: "Post or tag not provided!" }),
            { status: 400, statusText: "Failed" }
        );
    }
    try {
        await connectToDB();
        const existingPost = await Post.findById(res.params.id);
        if (!existingPost) {
            return new Response(
                JSON.stringify({ message: "Post not found!" }),
                { status: 404, statusText: "Failed" }
            );
        }
        existingPost.post = post;
        existingPost.tag = tag;
        await existingPost.save();
        return new Response(JSON.stringify(post), {
            status: 200,
            statusText: "Success",
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Failed to update post" }),
            { status: 500, statusText: "Failed" }
        );
    }
};

export const DELETE = async (req, res) => {
    try {
        await connectToDB();
        await Post.findByIdAndRemove(res.params.id);
        return new Response(JSON.stringify({ message: "Post Deleted!" }), {
            status: 200,
            statusText: "Success",
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Failed to delete post" }),
            { status: 500, statusText: "Failed" }
        );
    }
};
