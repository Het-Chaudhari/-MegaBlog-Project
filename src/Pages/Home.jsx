import React, {useEffect, useState} from 'react'
import postservices from '../appwrite/configure'
import Container from '../Components/Container/Container'
import PostCard from '../Components/Login/PostCard'
// ama apde be vastu apvani che 
// peli e ke jo login thai jay to logout ne add post e page batave 
// biju ke login na hoy to logout varu page batave 

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        postservices.gotpost().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])



if (posts.length === 0) {
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap justify-center items-center">
                    <div className="p-4 w-full text-center">
                        <h1 className="text-4xl font-bold hover:text-gray-500">
                            Made by Het
                        </h1>
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <div className="text-left">
                            <h2 className="text-2xl font-bold mb-4">Welcome to My App</h2>
                            <p className="text-lg">
                                This app is a platform for sharing posts and ideas.
                                Feel free to explore and contribute your thoughts.
                            </p>
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-400">
                                    HET
                                </div>
                </div>
            </Container>
        </div>
    );
}

return (
    <div className="w-full py-8">
        <Container>
            <h1 className="text-4xl font-bold text-center mb-8">Posts</h1>
            <div className="flex flex-wrap">
                {posts.map((post) => (
                    <div key={post.$id} className="p-2 w-full md:w-1/4">
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
);
}

export default Home
