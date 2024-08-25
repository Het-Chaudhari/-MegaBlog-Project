import React from 'react'
import postservices from '../appwrite/configure'
import { useState,useEffect } from 'react'
import Container from '../Components/Container/Container'
import PostCard from '../Components/Login/PostCard'


function Allpost() {

    const[posts,setpost]=useState([])
    useEffect(() => {}, [])

    postservices.gotpost([]).then((posts)=>{
        if(posts){
        setpost(posts.documents);
        }
    }
    )

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default Allpost
