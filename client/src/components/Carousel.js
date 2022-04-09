import React from "react";

const Carousel = (props) => {
  return (
    <div id="carouselControls" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {props.images.map((imgUrl) => (
          <div className="carousel-item active" key={imgUrl}>
            <img
              src={imgUrl}
              className="card-img-top"
              alt="postLogo"
              style={{ maxHeight: "350px" }}
            />
          </div>
        ))}
      </div>
      <div
        className="carousel-control-prev"
        href="#carouselControls"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </div>
      <div
        className="carousel-control-next"
        href="#carouselControls"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </div>
    </div>
  );
};

export default Carousel;
