import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

import { Link } from 'react-router-dom'

const Users = () => {
    const users = useSelector(state => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td><strong>blogs created</strong></td>
                    </tr>
                    {users.map(user =>
                    <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`} state={user.id}>{user.name}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users
