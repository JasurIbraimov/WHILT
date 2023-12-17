"use client";
import Profile from "@components/Profile";
import Spinner from "@components/Spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ProfilePage = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession();
    const handleEdit = async (post) => {
        router.push(`/update-post?id=${post._id}`);
    };
    const handleDelete = async (post) => {
        try {
            await fetch(`/api/post/${post._id}`, {
                method: "DELETE",
            });
            const filteredPosts = posts.filter((p) => p._id !== post._id);
            setPosts(filteredPosts);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setLoading(true)
        const fetchPosts = async () => {
            const response = await fetch(
                `/api/users/${session?.user.id}/posts`
            );
            const data = await response.json();
            setPosts(data);
            setLoading(false)
        };
        if (session?.user.id) {
            fetchPosts();
        }  else {
            router.push('/')
        }
    }, [session]);

    return loading ? (
        <Spinner />
    ) : (
        <Profile
            name="My"
            desc="Welcome to your Profile"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default ProfilePage;
