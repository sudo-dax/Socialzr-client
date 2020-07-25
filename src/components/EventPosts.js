import React from 'react'
import EventPost from './EventPost'
import {useGlobalState} from '../config/store'

const EventPosts = () => {
    const {store} = useGlobalState()
    const {eventPosts} = store
    return (
        <div>
            {eventPosts.sort((a,b) => b.modified_date - a.modified_date)
                .map((post) => <EventPost key={post._id} post={post} />)}        
        </div>
    )
}

export default EventPosts