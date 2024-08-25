import React, {useEffect, useState} from 'react'
import Container from '../Components/Container/Container'
import Postform from '../Components/Post-form/Postform'
import postservices from '../appwrite/configure'
import { useNavigate,  useParams } from 'react-router-dom';

function Editcomp() {
    const [post, setPosts] = useState("")
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            postservices.getpost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])


    return post ? (
        <div className='py-8'>
            <Container>
                <Postform post={post} />
            </Container>
        </div>
      ) : null
}

export default Editcomp