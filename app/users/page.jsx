"use client";
import Error from "@components/Error";
import Profile from "@components/Profile";
import Spinner from "@components/Spinner";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const UserProfilePage = () => {
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const userId = searchParams.get("id");
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`/api/users/${userId}/profile`);
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
            } else {
                throw new Error(response.status);
            }
        };
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                throw new Error(response.status);
            }
        };
        Promise.all([fetchPosts(), fetchProfile()])
            .catch((e) => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return loading ? (
        <Spinner />
    ) : error ? (
        <Error message="User not found!"/>
    ) : (
        <Profile
            name={profile.username}
            desc={`Welcome to ${profile.username} Profile`}
            data={posts}
        />
    );
};

export default UserProfilePage;
