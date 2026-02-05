"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

const ReviewsPreview = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data.reviews || []))
      .catch(() => setReviews([]));
  }, []);

  return (
    <section className="container mx-auto py-16" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="mb-2 text-center text-3xl font-semibold text-primary">
        What Patients Say
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
        Real stories from people who chose a gentler approach to dental care.
      </p>

      <Carousel>
        <CarouselContent className="-ml-5 pb-5">
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="pl-5 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full border-none shadow-lg">
                <CardHeader>
                  <div className="flex gap-4 items-center">
                    <div className="w-[50px] h-[50px] bg-gray-200 rounded-full overflow-hidden">
                      <Image 
                        src={review.profile_photo_url} 
                        alt={review.author_name}
                        width={50}
                        height={50}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#0B131E] font-bold">{review.author_name}</p>
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} />
                        <span className="text-xs text-muted-foreground">
                          {review.relative_time_description}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground line-clamp-6">
                    "{review.text}"
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ReviewsPreview;
