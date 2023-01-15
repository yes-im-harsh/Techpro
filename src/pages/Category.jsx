import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";

const Category = () => {
  //   const params = useParams();
  //   console.log(params);
  //   return <div>Category : {params?.categoryName}</div>;

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  console.log(params.categoryName);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        //Get Reference
        const listingRef = collection(db, "listings");

        //Create a query
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(2)
        );

        //Execute Query
        const querySnap = await getDocs(q);
        console.log(querySnap);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        console.log(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListing();
  }, [params.categoryName]);

  return (
    <ul className="categoryListings">
      {listings?.map((listing) => (
        <h3 key={listing.key}> {listing.data.name}</h3>
      ))}
    </ul>
  );
};

export default Category;
