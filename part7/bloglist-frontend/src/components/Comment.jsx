import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

import { Form, Button, ListGroup } from 'react-bootstrap'

const Comment = ( { blog } ) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const addComment = (event) => {
        event.preventDefault()
        dispatch(createComment({
            comment: comment,
            blog: blog.id
        }))

        setComment('')
    }

    return(
        <div>
            <h2>Comments</h2>
            <Form onSubmit={addComment}>
                <Form.Control
                    type="text"
                    value={comment}
                    name="comment"
                    onChange={event => setComment(event.target.value)}
                />
                <Button type="submit">add comment</Button>
            </Form>
            

            <div>
                <ul className="list-group" key={blog.id}>
                    {blog.comments.map(comment =>
                        <li className="list-group-item" key={comment.id}>{comment.comment}</li>
                    )}
                </ul>
            </div>
        </div>

    )
}

export default Comment