import Layout from "../../components/public/layout/Layout";
import Review from "../../components/public/review/Review";

export default function User() {
    return (
        <div>
            <Layout children={<Review />} />
        </div>
    );
}