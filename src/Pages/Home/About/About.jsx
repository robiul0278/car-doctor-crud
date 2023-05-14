import parts from "../../../assets/images/about_us//parts.jpg";
import person from "../../../assets/images/about_us//person.jpg";
const About = () => {
  return (
    <div className="hero bg-base-200 my-5">
      <div className="hero-content flex-col lg:flex-row">
        <div className="lg:w-1/2 relative pb-28 ">
          <img src={person} className="w-3/4 rounded-lg shadow-2xl" alt="" />
          <img src={parts} className="w-1/2 right-5 top-1/2 border-8 border-white absolute rounded-lg shadow-2xl" alt="" />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default About;
