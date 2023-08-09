"use client";

import Form from "@components/Form";
// Hooks
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePostPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const postId = searchParams.get("id");
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        post: "",
        tag: "",
    });

    useEffect(() => {
        const getPostDetails = async () => {
            const response = await fetch(`/api/post/${postId}`);
            const data = await response.json();
            setPost({
                post: data.post,
                tag: data.tag
            });
        };
        if (postId) {
            getPostDetails();
        }
    }, [postId]);

    const updatePost = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(`/api/post/${postId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    ...post
                }),
            });

            if (response.ok) {
                router.push("/profile");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const changePost = (e) => {
        setPost({ ...post, post: e.target.value });
    };

    const changeTag = (e) => {
        setPost({ ...post, tag: e.target.value });
    };

    return (
        <Form
            type="Edit"
            handleChangePost={changePost}
            handleChangeTag={changeTag}
            submitting={submitting}
            handleSubmit={(e) => updatePost(e)}
            {...post}
        />
    );
};

export default UpdatePostPage;
