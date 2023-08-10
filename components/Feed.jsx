"use client";

import { useState, useEffect } from "react";
import Card from "./Card";
import Image from "next/image";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PostCardList = ({ data, handleTagClick, handleUserClick }) => {
    return (
        <>
            {data.map((p) => (
                <Card
                    {...p}
                    post={
                        p.post.length > 50
                            ? p.post.slice(0, 50) + "..."
                            : p.post
                    }
                    key={p._id}
                    handleTagClick={handleTagClick}
                    handleUserClick={handleUserClick}
                />
            ))}
        </>
    );
};
const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);
    const {data: session} = useSession()
    const [showCount, setShowCount] = useState(6);
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    const filterPrompts = (search) => {
        const regexp = new RegExp(search, "i");
        return posts.filter(
            ({ post, creator: { username }, tag }) =>
                regexp.test(username) || regexp.test(tag) || regexp.test(post)
        );
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        if (e.target.value.trim().length === 0) {
            return;
        }
        clearTimeout(searchTimeout);
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 100)
        );
    };
    const handleTagClick = (tagName) => {
        setSearchText(tagName);
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    const handleUserClick = (creatorId) => {
      if(creatorId === session?.user.id) {
        router.push("/profile")
      } else {
        router.push(`/users/?id=${creatorId}`)
      }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/post");
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, []);
    return (
        <section className="feed py-2">
            <form className="relative w-full flex-center">
                {searchText.trim().length ? (
                    <Image
                        onClick={() => setSearchText("")}
                        className="absolute right-3 top-1/2 cursor-pointer"
                        src="/assets/icons/close.png"
                        alt="Close"
                        width={20}
                        height={20}
                    />
                ) : null}
                <input
                    type="text"
                    placeholder="Search for tag or a username"
                    required
                    value={searchText}
                    onChange={handleSearchChange}
                    className="form_input mt-5 peer"
                />
            </form>
            {posts.length === 0 && <Spinner />}
            <div className="grid lg:grid-cols-3 mt-10 gap-3 sm:grid-cols-2">
                <PostCardList
                    data={
                        searchText.trim().length
                            ? searchedResults
                            : posts.slice(0, showCount)
                    }
                    handleTagClick={handleTagClick}
                    handleUserClick={handleUserClick}
                />
            </div>
            {posts.length > showCount && (
                <button
                    className="btn m-auto mt-5 "
                    onClick={() =>
                        showCount < posts.length &&
                        setShowCount((prev) => prev + 6)
                    }
                >
                    More...
                </button>
            )}
        </section>
    );
};

export default Feed;
