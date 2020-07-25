import api from '../config/api'

// Returns a single post based on the id provided
export function getPostFromId(eventPosts,id) {
    console.log("posts: ", eventPosts)
    console.log("id: ", id)
    const post =  eventPosts.find((post) =>  post._id === id)
    return post
}

// Returns all event posts from the server
export async function getAllEventPosts() {
    const response = await api.get('/events');
    return response.data
}

// Adds a post on the server
export async function addEventPost(newPost) {
    const response = await api.post('/events', newPost);
    return response.data
}

// Deletes a post on the server
export async function deleteEventPost(id) {
    const response = await api.delete(`/events/${id}`)
    return response.data
}

export async function updateEventPost(post) {
    const response = await api.put(`/events/${post.id}`, post)
    return response.data
}
