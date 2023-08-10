import React from "react";
import Card from "./Card";

const Profile = ({ name, data, desc, handleEdit, handleDelete }) => {
    return (
        <section className="w-full mt-5">
            <h1 className="head_text purple_gradient">{name} Profile</h1>
            <p className="desc text-left">{desc}</p>
            <div className="mt-16">
                {data.map((post) => (
                    <div className="mt-5" key={post._id}>
                        <Card
                            {...post}
                            handleEdit={() => handleEdit && handleEdit(post)}
                            handleDelete={() =>
                                handleDelete && handleDelete(post)
                            }
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Profile;
