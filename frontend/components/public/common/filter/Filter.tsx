import { useEffect, useState } from "react";
import { Post } from "../../review/Review";
import styles from "./filter.module.css";

interface FilterProps {
  posts: Post[];
  filteredPosts: Post[];
  setFilteredPosts: (posts: Post[]) => void;
}

export default function Filter(props: FilterProps) {
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<string>("");

  useEffect(() => {
    let items: Post[] = props.filteredPosts.length === 0 ? props.posts : props.filteredPosts;

    if (priceFilter === "price_asc") items.sort((a, b) => a.price - b.price);
    else items.sort((a, b) => b.price - a.price);

    // props.setFilteredPosts(items);

    if(props.filteredPosts.length === 0)
        props.setFilteredPosts(items);
    else {
        props.setFilteredPosts([]);
    }
  }, [priceFilter]);

  useEffect(() => {
    let items: Post[] = props.filteredPosts.length === 0 ? props.posts : props.filteredPosts;
      
    if (priceFilter === "rating_asc") items.sort((a, b) => a.rating - b.rating);
    else items.sort((a, b) => b.rating - a.rating);

    // console.log(items);

    if(props.filteredPosts.length === 0)
        props.setFilteredPosts(items);
    else {
        props.setFilteredPosts([]);
    }
  }, [ratingFilter]);

  return (
    <div className={styles.filters}>
      <p
        style={{
          fontSize: "18px",
        }}
      >
        <b>Filters</b>
      </p>

      <div className={styles.filter}>
        <label>
          <b>Sort by Price</b>
        </label>
        <br />

        <input
          type="radio"
          id="price_asc"
          name="filter"
          value="price_asc"
          onChange={(e) => setPriceFilter(e.target.value)}
        />
        <label>Ascending</label>
        <br />

        <input
          type="radio"
          id="price_desc"
          name="filter"
          value="price_desc"
          onChange={(e) => setPriceFilter(e.target.value)}
        />
        <label>Descending</label>
        <br />
      </div>

      <div className={styles.filter}>
        <label>
          <b>Sort by Rating</b>
        </label>
        <br />

        <input
          type="radio"
          id="rating_asc"
          name="filter"
          value="rating_asc"
          onChange={(e) => setRatingFilter(e.target.value)}
        />
        <label>Ascending</label>
        <br />

        <input
          type="radio"
          id="rating_desc"
          name="filter"
          value="rating_desc"
          onChange={(e) => setRatingFilter(e.target.value)}
        />
        <label>Descending</label>
        <br />
      </div>
    </div>
  );
}
