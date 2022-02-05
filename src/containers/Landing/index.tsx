import Feature from "../../components/Feature";
import Hero from "../../components/Hero";
import FAQ from "../../components/FAQ";
import Pricing from "../../components/Pricing";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";

const faqs = [
  {
    question: "Are videos automatically subtitled?",
    answer:
      "Yes in our video rendering engine we have tons of useful things that automatically enhance your video so you don't have to worry. Simply upload the video and we will take care of the rest. Especially when it comes to automatic subtitles.",
  },
  {
    question: "Why should I use Videotree?",
    answer: "Effective communication is one of the main driver of sales",
  },
  {
    question: "What is unique about Videotree?",
    answer:
      "We run a sibling company called Motionbox which is an online video editing tool. We know video very well and have a powerful rendering engine that will help you edit your videos so they look professional. In addition to that we want to be the tool that helps you close more deals, earn more revenue, and build better relationships.",
  },
];

const Home = () => (
  <div>
    <Hero />
    <Feature />
    <Pricing />
    <FAQ faqs={faqs} />
    <Newsletter />
    <Footer />
  </div>
);

export default Home;
