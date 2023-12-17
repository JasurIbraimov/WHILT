"use client"

import Form from '@components/Form'
// Hooks
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


const CreatePost = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        post: "",
        tag: ""
    })
    useEffect(() => {
        if(!session?.user) {
            return router.push("/")
        }
    })
    const createPost = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch("/api/post/new", {
                method: "POST",
                body: JSON.stringify({
                    ...post,
                    userId: session?.user.id,
                })
            })

            if(response.ok) {
                router.push("/")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    const changePost = (e) => {
        setPost({...post, post: e.target.value })
    }

    const changeTag =  (e) => {
        setPost({...post, tag: e.target.value })
    }

  return (
    <Form 
        type="Create"
        handleChangePost={changePost}
        handleChangeTag={changeTag}
        submitting={submitting}
        handleSubmit={(e) => createPost(e)}
    />
  )
}

export default CreatePost