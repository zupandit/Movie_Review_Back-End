import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  //static so we don't need an instance to use this
  static async apiPostReview(req, res, next) {
    try {
      //destructuring the json we recieve
      const movieId = parseInt(req.body.movieId);
      const review = req.body.review;
      const user = req.body.user;

      //adding to reviewsDAO which will add to database
      const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);

      // reply with success
      res.json({ status: "success" });
    } catch (e) {
      //reply with error
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      // get id from the url parameter. How does it know which part is id tho?? Maybe how we set up
      // the routes?
      let id = req.params.id || {};
      //get the review for requested id from database
      let review = await ReviewsDAO.getReview(id);
      //if no review then send 404
      if (!review) {
        res.status(404).json({ error: "Not Found" });
        return;
      }
      //else if review exists then send it
      res.json(review);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      //id from param
      let reviewId = req.params.id;

      // destructure req json
      let review = req.body.review;
      let user = req.body.user;
      //update to reviewsDAO which will update to database
      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review,
      );

      //need to understand this better
      var { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      //if no modificated happened
      if (reviewResponse.modifiedCount === 0) {
        throw new Error("Unable to update review");
      }

      //if no errors send success
      res.status(500).json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReviews(req, res, next) {
    try {
      const id = req.params.id || {};
      let reviews = await ReviewsDAO.getReviewsByMovieId(id);

      if (!reviews) {
        res.status(404).json({ error: "Not Found" });
        return;
      }
      res.json(reviews);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
