import React from 'react'
import ListingCard from '../listingCard/ListingCard'

const Listings = ({ gigsList }) => {
    console.log("gigs:" + gigsList[0])
  return (
    <div className='pb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8'>
        {gigsList.map((gigData) => (
            <ListingCard key={gigData._id} data={gigData} />
        ))}
    </div>
  )
}

export default Listings
