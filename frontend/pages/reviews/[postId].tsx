import { useRouter } from "next/router";
import Layout from "../../components/public/layout/Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../_app";
import { Post } from "../../components/public/review/Review";
import ProductReview from "../../components/public/review/ProductReview";

export default function ProductDetails() {
  const { account, reviewContract } = useContext(AppContext);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const postCount: number = await reviewContract?.methods.postCount().call();
    for (let i = 1; i <= postCount; i++) {
      let post: Post = (await reviewContract?.methods.posts(i).call()) as Post;
      if (post.id === postId) {
        setPost(post);
        break;
      }
    }
  }

  return (
    <Layout>
      <ProductReview post={post} />
    </Layout>
  );
}
