import React from 'react';

const Profile = (props) => {
  return (
    <div className="container my-2">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div >
          <div className="card-shadow" style={{ borderRadius: "15px", backgroundColor: "#eee" }}>
            <div className="card-body text-center">
              <div className="mt-3 mb-4">
                <img
                  src={props.profilePic}
                  className="rounded-circle img-fluid" style={{ width: "100px" }}
                  alt="profilePic"
                />
              </div>
              <h4 className="mb-2">{props.name}</h4>
              <p className="text-muted mb-4">{props.role} </p>
              <div className="mb-4 pb-2" >
                <a href={props.githubLink} target="_blank" rel='noreferrer'>
                  <img className='mx-1' src='https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)' alt='githubLink'/>
                </a>
                <a href={props.gmailLink}>
                  <img className='mx-1' src='https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white' alt='gmailLink'/>
                </a>
                <a href={props.linkedinLink} target="_blank" rel='noreferrer'>
                  <img className='mx-1' src='https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white' alt='linkedLink'/>
                </a>
              </div>
              <p>
                {props.text1}<br/>
                {props.text2}<br/>
                {props.text3}<br/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile