import { Link, useParams } from "react-router-dom";
import "../../CSS/Autism.css";
import Footer from "../../Components/WebSite/Footer";
import Header from "../../Components/WebSite/Header";
import { useEffect, useState } from "react";
import AutismLoading from "../../Components/SceletonsLoading/AutismLoading";

export default function Autism() {
  const params = useParams();
  // console.log(params.content);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // عرض اللودينج لمدة ثانية واحدة
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // تنظيف التايمر عند الخروج
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Header />
      {loading ? (
        <AutismLoading />
      ) : (
        <>
          <div className="autism-test">
            <div className="main-container">
              <div className="autism-title">
                <h2>Autism Test</h2>
                <p>An autism test checks for ASD traits.</p>
              </div>
              <div className="start-test">
                <Link
                  to={`${
                    params.content === "checker"
                      ? "/autism/test"
                      : "/test/level"
                  }`}
                >
                  Start the test now!
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
