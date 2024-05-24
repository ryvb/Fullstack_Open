import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content: content,  votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateVote = async (updatedAnecdote) => {
    const request = axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return request.then(response => response.data)
}

export default { getAll, createNew, updateVote }
