import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // shadcn button
import { Star } from "lucide-react"; // using lucide-react icons (shadcn recommends this)

const Home = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 animate-fadeIn">
        Welcome To Our Feedback Portal
      </h1>

      {/* Rating Stars */}
      <div className="flex space-x-2 mb-6">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={index}
              size={40}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              className={`cursor-pointer transition-colors ${
                (hover || rating) >= starValue ? "text-yellow-400" : "text-gray-400"
              }`}
            />
          );
        })}
      </div>

      {/* Feedback Textarea */}
      <textarea
        className="w-full max-w-2xl h-48 p-4 rounded-2xl border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md resize-none text-lg"
        placeholder="Write your feedback here..."
      />

      {/* Submit Button */}
      <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg">
        Submit Feedback
      </Button>
    </div>
  );
};

export default Home;

