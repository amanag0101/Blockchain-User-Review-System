import SearchIcon from "@mui/icons-material/Search";
import styles from "./searchbar.module.css";
import { Post } from "../../review/Review";
import { useEffect, useState } from "react";

interface SearchbarProps {
  posts: Post[],
  setFilteredPosts: (posts: Post[]) => void,
  width: number;
}

interface SearchbarStyle {
  width: string;
}

export default function Searchbar(props: SearchbarProps) {
  const searchbarStyle: SearchbarStyle = {
    width: props.width + "%",
  };

  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  return (
    <>
      <div className={styles.searchbar} style={searchbarStyle}>
        <div className={styles["col-1"]}>
          <input
            type="text"
            placeholder="Search product"
            onChange={(e) => {
              const searchWord = e.target.value;
              const filteredPosts = props.posts.filter((post) =>
                post.productName
                  .toLowerCase()
                  .includes(searchWord.toLowerCase())
              );

              if (searchWord === "") {
                props.setFilteredPosts([]);
                setFilteredPosts([]);
              }
              else {
                if(filteredPosts.length > 0)
                    props.setFilteredPosts(filteredPosts);
                setFilteredPosts(filteredPosts);
              }
            }}
          />
        </div>
        {/* <div className={styles["col-2"]}>
          <SearchIcon className="icon" />
        </div> */}
      </div>

      {/* {filteredPosts.length !== 0 ? (
        <div className={styles.result}>
          {filteredPosts.map((post) => {
            return (
              <p onClick={() => setSelectedPostId(post.id)}>
                {post.productName}
              </p>
            );
          })}
        </div>
      ) : (
        <></>
      )} */}
    </>
  );
}
