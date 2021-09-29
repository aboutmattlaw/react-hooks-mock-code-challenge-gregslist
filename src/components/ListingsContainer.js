import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import NewListingForm from "./NewListingForm";




function ListingsContainer({search}) {

  const [listings, setListings ] = useState([]);
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    fetch('http://localhost:6001/listings')
    .then((r) => r.json())
    .then(listings => setListings(listings));
  }, [])

  function handleDeleteListing(id){
    const updatedListingsArray = listings.filter(listing => listing.id !== id)
    setListings(updatedListingsArray) 
  }

  function handleNewListing(newListing){
    const updatedListingsArray = [newListing, ... listings];
    setListings(updatedListingsArray)

  }

const filteredListings = listings.filter(listing => {
  return listing.description.includes(search)
})

const sortedListings = filteredListings.sort((listingsA, listingB) => {
  if (sortBy === "id") {
    return listingsA.id - listingB.id
    } else {
      return listingsA.location.localeCompare(listingB.location)
    }
}
)

  const listingCard = filteredListings.map((listingObj) => {
    return <ListingCard listing={listingObj} key={listingObj.id} onDeleteListing={handleDeleteListing}/>;
  });

  return (
    <main>
      <NewListingForm onAddListing = {handleNewListing}/>
      <button onClick={() => setSortBy("id")}>Sort By Default</button>
      <button onClick={() => setSortBy("location")}>Sort By Location</button>
      <ul className="cards">
        {listingCard}
      </ul>
    </main>
  );
}

export default ListingsContainer;
