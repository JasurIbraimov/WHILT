import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Form = ({ type, handleChangeTag, handleChangePost, submitting, handleSubmit, tag, post }) => {
    const router = useRouter()
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-full text-left flex-start flex-col"
        >
            <h1 className="head_text">
                <span className="purple_gradient">{type} post</span>
            </h1>
            <p className="desc">{type} and share your knowledge!</p>
            <label htmlFor="post" className="form_label">
                Your post:
            </label>
            <textarea
                onChange={handleChangePost}
                defaultValue={post}
                name="post"
                id="post"
                className="form_textarea"
                placeholder="Post..."
            ></textarea>

            <label htmlFor="tag" className="form_label">
                Post Tag (#css, #html, #js):
            </label>
            <input
                name="tag"
                id="tag"
                className="form_input"
                defaultValue={tag}
                placeholder="#tag"
                onChange={handleChangeTag}
            />
            <div className="flex gap-2 mt-2 justify-end">
                <button className="btn relative" type="submit" disabled={submitting}>
                    {submitting ? (
                        <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                        {type}...
                        </>
                    ) : (
                        type
                    )}
                </button>

                <button className="btn_danger" type="button" onClick={() => router.back()}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default Form;
