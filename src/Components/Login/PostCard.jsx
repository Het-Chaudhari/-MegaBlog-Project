import React from 'react'
import Container from '../Container/Container'
import {Link} from 'react-router-dom'
import postservices from '../../appwrite/configure'


function PostCard({$id,title,featuredimg}) {
   // console.log("post card ma avi gaya")
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={postservices.getFilePreview(featuredimg)} alt={title}
                    className='rounded-xl' />
    
                </div>
                <h2
                className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
      )
}

export default PostCard
