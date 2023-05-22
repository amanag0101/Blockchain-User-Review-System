import type { NextPage } from 'next'
import Layout from '../../components/public/layout/Layout';
import Review from '../../components/public/review/Review';

const Reviews: NextPage = () => {
  return (
    <Layout children={<Review />} />  
  );
}

export default Reviews
