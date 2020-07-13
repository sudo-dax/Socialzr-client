import React from 'react'
import EventPost from './EventPost'

const EventPosts = ({eventData}) => {
    return (
        <div>
            {eventData.sort((a,b) => b.modified_date - a.modified_date)
                .map((post) => <EventPost key={post._id} post={post} />)}        
        </div>
    )
}

export default EventPosts