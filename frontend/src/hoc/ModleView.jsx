import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ModleView = (Component) => () => {
  return (
    <>
      <Navbar />
      <Component />
      <Footer />
    </>
  );
};
export default ModleView;
