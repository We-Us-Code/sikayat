const sampleResponse = {
  status: "success",
  results: 7,
  data: {
    posts: [
      {
        upvotersId: ["2", "3", "4"],
        downvotersId: ["1"],
        upvoteCount: 3,
        downvoteCount: 1,
        images: ["post-1-1.jpg", "post-1-2.jpg"],
        createdAt: "2022-03-31T16:40:22.336Z",
        tags: ["electricity", "mechanic", "repair"],
        _id: "6245d976f563fc554c2b3dd1",
        heading: "A-230, Fan not Working",
        body: "Fan makes too much noise. It's shaft is shaking too much. Stops in the middle of night. Chances of Falling.",
        userId: "5",
        id: "6245d976f563fc554c2b3dd1",
      },
      {
        upvotersId: ["2", "3"],
        downvotersId: ["5", "4"],
        upvoteCount: 2,
        downvoteCount: 2,
        images: ["post-2-1.jpg", "post-2-2.jpg"],
        createdAt: "2022-03-31T16:40:22.336Z",
        tags: ["plumber", "mechanic", "repair"],
        _id: "6245d976f563fc554c2b3dd2",
        heading: "B-231, Flush not Working",
        body: "Water Leakage all day from flush",
        userId: "1",
        id: "6245d976f563fc554c2b3dd2",
      }
    ],
  },
};

export default sampleResponse
