import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {
    try {
        const { id } = res.params;
        await connectToDB();
        const posts = await Post.find({creator: id }).populate("creator");

        return new Response(JSON.stringify(posts), {
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
