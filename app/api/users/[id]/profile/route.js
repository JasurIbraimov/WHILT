import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {
    try {
        const { id } = res.params;
        await connectToDB();
        const user = await User.findById(id);
        if (!user) {
            return new Response(
                JSON.stringify({ message: "User not found!" }),
                { status: 404, statusText: "Failed" }
            );
        }
        return new Response(JSON.stringify(user), {
            status: 200,
            statusText: "Success",
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Failed to fetch user" }),
            { status: 500, statusText: "Failed" }
        );
    }
};