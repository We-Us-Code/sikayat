import React, {useEffect} from "react";
import Profile from "./Profile";

const AboutUs = () => {

  useEffect(() => {
    document.title = "Sikayat - About Us";
  }, [])
  

  return (
    <>
      <div className="row row-cols-1 row-cols-lg-3 mx-1 my-1">
        <Profile
          name={"Harsh Singh Jadon"}
          role={"Developer"}
          githubLink={"https://github.com/harshsingh-24"}
          gmailLink={"mailto:hsj13@iitbbs.ac.in"}
          linkedinLink={"https://www.linkedin.com/in/harsh-singh-jadon-55ab4519a/"}
          profilePic={"https://lh3.googleusercontent.com/a-/AOh14GhhTjfT_yMZvCq-faNfmkAlo3Y4-kiFdk_b-qIYSg=s720"}
          text={"Lorem ipsum harsh singh bla bla bla"}
        />
        <Profile
          name={"Jagdish Deshmukh"}
          role={"Developer"}
          githubLink={"https://github.com/Jagdish-Deshmukh"}
          gmailLink={"mailto:jd13@iitbbs.ac.in"}
          linkedinLink={"https://www.linkedin.com/in/jagdish-deshmukh-iit/"}
          profilePic={"https://lh3.googleusercontent.com/a-/AOh14GgcM0PDdE9tE2AgBOyL06IoTDF4BJxXY1m4whby=s720-p-rw-no"}
          text={"Lorem ipsum jagdish deshmukh bla bla bla"}
        />
        <Profile
          name={"Sushant Kumar"}
          role={"Developer"}
          githubLink={"https://github.com/sushant-iit"}
          gmailLink={"mailto:sk91@iitbbs.ac.in"}
          linkedinLink={"https://www.linkedin.com/in/sushantiit/"}
          profilePic={"https://lh3.googleusercontent.com/a-/AOh14GgZRRmIoQ7QS_wqkS7gPpnU4Rr7k8mjLT4sIF1oPg=s720-p-k-rw-no"}
          text={"Lorem ipsum sushant kumar bla bla bla"}
        />
      </div>
      {/* <a className="align-items-center" href="https://github.com/harshsingh-24/cmp">
        <i class="bi bi-github" />
      </a> */}
    </>
  );
};

export default AboutUs;
