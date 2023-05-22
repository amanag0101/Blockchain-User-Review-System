import Searchbar from "../common/searchbar/Searchbar";
import Filter from "../common/filter/Filter";
import styles from "./review.module.css";
import ItemBox from "./ItemBox";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../pages/_app";
import { Dialog, DialogProps, DialogTitle } from "@mui/material";

export interface Image {
  hash: string;
  description: string;
}

export interface Post {
  id: string;
  productName: string;
  productLink: string;
  price: number;
  rating: number;
  reviewTitle: string;
  review: string;
  image: Image;
  author: string;
}

export default function Review() {
  const { reviewContract } = useContext(AppContext);
  const [postCount, setPostCount] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    setShowDialog(true);

    const postCount: number = await reviewContract?.methods.postCount().call();
    setPostCount(postCount);

    let posts: Post[] = [];
    for (let i = 1; i <= postCount; i++) {
      const post = (await reviewContract?.methods.posts(i).call()) as Post;
      posts.push(post);
    }

    setPosts(posts);
    setShowDialog(false);
  }

  return (
    <div className={styles.review}>
      <div className={styles.searchbar}>
        <Searchbar
          width={50}
          posts={posts}
          setFilteredPosts={setFilteredPosts}
        />
      </div>

      <div className={styles["container"]}>
        <div className={styles["col-1"]}>
          <Filter
            posts={posts}
            setFilteredPosts={setFilteredPosts}
            filteredPosts={filteredPosts}
          />
        </div>
        <div className={styles["col-2"]}>
          {filteredPosts.length === 0
            ? posts.map((post) => {
                return (
                  <div key={post.id} className={styles["item"]}>
                    <ItemBox
                      id={post.id}
                      productName={post.productName}
                      productLink={post.productLink}
                      price={post.price}
                      rating={post.rating}
                      imageHash={post.image.hash}
                      reviewTitle={post.reviewTitle}
                      review={post.review}
                    />
                  </div>
                );
              })
            : filteredPosts.map((post) => {
                return (
                  <div key={post.id} className={styles["item"]}>
                    <ItemBox
                      id={post.id}
                      productName={post.productName}
                      productLink={post.productLink}
                      price={post.price}
                      rating={post.rating}
                      imageHash={post.image.hash}
                      reviewTitle={post.reviewTitle}
                      review={post.review}
                    />
                  </div>
                );
              })}
        </div>
      </div>

      <Dialog open={showDialog} maxWidth={"xl" as DialogProps["maxWidth"]}>
        <DialogTitle style={{ color: "#000" }}>
          Fetching Reviews ...
        </DialogTitle>
      </Dialog>
    </div>
  );
}
