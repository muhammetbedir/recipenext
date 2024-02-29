import RecipeCard from '@/components/functional/RecipeCard';
import WeeklyHighlights from '@/components/page/WeeklyHighlights';
import Link from 'next/link'
import Slider from "react-slick";
const Home = ({ photo }) => {
  return (
    <div class="flex justify-center">
      <div class="w-8/12 ">
        <WeeklyHighlights photo={photo} />
        <WeeklyHighlights photo={photo} />
        <WeeklyHighlights photo={photo} />
      </div>
    </div>

  );
};
export async function getStaticProps() {
  const photo = "https://cdn.yemek.com/mnresize/940/940/uploads/2020/10/etsiz-cig-kofte-yemekcom.jpg"
  return { props: { photo } }
}
Home.acl = {
  action: "read",
  subject: "home",
}
export default Home