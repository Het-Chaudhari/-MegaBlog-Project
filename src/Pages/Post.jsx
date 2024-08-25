import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import postservices from "../appwrite/configure";
import Container from "../Components/Container/Container";
import Button from "../Components/Button";


function Post() {
    const [posts,setpost]=useState("")
    const {slug}=useParams();
    const navigate=useNavigate()

    const userdata=useSelector(state=>state.auth.userData)

    const isAuthor=posts && userdata ? posts.userId===userdata.$id :false ;


    useEffect(()=>{
        if(slug){
            // console.log("postservices ma gotpost mate req mokli")
            // console.log("userdata:", userdata);
            // console.log("posts:", posts);
            // console.log("isAuthor:", isAuthor);
            postservices.getpost(slug).then((post)=>{
                if (post) setpost(post);
                else navigate("/");
            });
        }else{
            navigate("/")
        }
    },[slug,navigate])

    const delepost=()=>{
        postservices.deletepost(posts.$id).then((status)=>{
            if (status) {
                postservices.deleteFile(posts.featuredimg);
                navigate("/");
            }
        })
    }


    return posts ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={postservices.getFilePreview(posts.featuredimg)}
                        alt={posts.title}
                        className="rounded-xl"
                    />

                    { isAuthor&&(
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${posts.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={delepost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{posts.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(posts.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post
