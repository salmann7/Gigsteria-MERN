import axios from "axios";
import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";

function CreateReview({addReview}) {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try{
        let data = {id, star: rating, desc: comment};
        const res = await axios.post(`https://gigsteria-api.onrender.com/api/reviews`, data , { withCredentials: true});
        console.log(res.data);
        const newReview = res.data;
        setComment('');
        setRating(0);
        addReview(newReview);
        setIsLoading(false);
    }catch(e){
        console.log(e);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <>
    <div className="w-full rounded-lg overflow-hidden shadow-md p-2">
        <form onSubmit={handleSubmit} className="flex flex-row  items-center">
            <input type="text" id='desc' placeholder="Write a Review" value={comment} onChange={handleCommentChange} disabled={isLoading} className="w-2/4 p-2  focus:outline-none" />
            <div className="flex flex-row gap-1 w-1/4 border-x-2 p-2 justify-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <BsFillStarFill
                  key={value}
                  size={18}
                  className={`text-${value <= rating ? "neutral-500" : "gray"}-300 hover:text-neutral-800 cursor-pointer`}
                  onClick={() => handleRatingChange(value)}
                />
               ))}
            </div>
            <button type="submit" className="bg-neutral-100 w-1/4 hover:bg-neutral-200 transition text-neutral-800 font-bold p-2">Create</button>
        </form>
    </div>
    </>
  );
}

export default CreateReview;