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
          profilePic={"https://firebasestorage.googleapis.com/v0/b/sikayat-4f7ee.appspot.com/o/harsh.jpg?alt=media&token=f4095413-06b1-4b2b-8e44-8f23c4d6462d"}
          text1={"Lorem ipsum harsh singh bla bla bla"}
          text2={"Lorem ipsum harsh singh bla bla bla"}
          text3={"Lorem ipsum harsh singh bla bla bla"}
        />
        <Profile
          name={"Jagdish Deshmukh"}
          role={"Developer"}
          githubLink={"https://github.com/Jagdish-Deshmukh"}
          gmailLink={"mailto:jd13@iitbbs.ac.in"}
          linkedinLink={"https://www.linkedin.com/in/jagdish-deshmukh-iit/"}
          profilePic={"https://firebasestorage.googleapis.com/v0/b/sikayat-4f7ee.appspot.com/o/jagdish.jpg?alt=media&token=d50acaca-f66f-4fe1-ab91-10eac83974c0"}
          text1={"Lorem ipsum harsh singh bla bla bla"}
          text2={"Lorem ipsum harsh singh bla bla bla"}
          text3={"Lorem ipsum harsh singh bla bla bla"}
        />
        <Profile
          name={"Sushant Kumar"}
          role={"Developer"}
          githubLink={"https://github.com/sushant-iit"}
          gmailLink={"mailto:sk91@iitbbs.ac.in"}
          linkedinLink={"https://www.linkedin.com/in/sushantiit/"}
          profilePic={"https://firebasestorage.googleapis.com/v0/b/sikayat-4f7ee.appspot.com/o/sushant.webp?alt=media&token=c63b22f7-3dcc-4ee0-bc84-52cd69314d05"}
          text1={"Third Year | CSE | IIT Bhubaneswar"}
          text2={"MERN | Android"}
          text3={"Currently Exploring ML domain"}
        />
      </div>
    </>
  );
};

export default AboutUs;
