import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Card = ({
    creator,
    tag,
    post,
    handleTagClick,
    handleEdit,
    handleDelete,
}) => {
    const [copied, setCopied] = useState("");
    const { data: session } = useSession();
    const pathName = usePathname();
    const handleCopy = () => {
        setCopied(post);
        navigator.clipboard.writeText(post);
        setTimeout(() => {
            setCopied("");
        }, 3000);
    };
    return (
        <div className="post_card">
            <div className="flex justify-between items-start g-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={creator.image}
                        alt="User image"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />

                    <div className="flex flex-col">
                        <h3 className="font-semibold text-gray-900">
                            {creator.username}
                        </h3>
                        <p className="text-sm text-gray-500">{creator.email}</p>
                    </div>
                </div>
                <div className="cursor-pointer" onClick={handleCopy}>
                    <Image
                        alt="Copy"
                        src={
                            copied === post
                                ? "/assets/icons/checkmark.png"
                                : "/assets/icons/copy.png"
                        }
                        width={20}
                        height={20}
                    />
                </div>
                {session?.user.id === creator._id &&
                    pathName === "/profile" && (
                        <>
                            <div
                                className="cursor-pointer ml-3"
                                onClick={handleEdit}
                            >
                                <Image
                                    alt="Edit"
                                    src={"/assets/icons/edit.png"}
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div
                                className="cursor-pointer ml-3"
                                onClick={handleDelete}
                            >
                                <Image
                                    alt="Delete"
                                    src={"/assets/icons/delete.png"}
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </>
                    )}
            </div>

            <p className="my-4 text-base text-gray-700">{post}</p>
            <p
                className="tag"
                onClick={() => handleTagClick && handleTagClick(tag)}
            >
                {tag}
            </p>
        </div>
    );
};

export default Card;
