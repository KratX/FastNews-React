import { useState } from "react";
import { NewsItem } from "./NewsItem";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@material-tailwind/react";

export function News() {
  const [page, setPage] = useState(1);

  const HeadlinesQuery = useQuery({
    queryKey: ["topHeadlines", { page }],
    queryFn: async () => {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=9080c2e52b9440e4950be63abc91c41a&pageSize=20&page=${page}`
      );
      const data = await response.json();
      console.log(data);
      return data.articles;
    },
  });

  if (HeadlinesQuery.isLoading) return <h1>Loading....</h1>;
  if (HeadlinesQuery.error) {
    return <div>Error: {HeadlinesQuery.error.message}</div>;
  }

  const totalPages = Math.ceil(HeadlinesQuery.data.totalResults / 20);

  return (
    <div className="bg-gray-500">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <h1
          className="inline-block
            font-black text-4xl
            md:text-6xl
            lg:text-7xl"
        >
          <span className="mt-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
            Top Headlines based on
          </span>
        </h1>
      </div>
      <div className="flex flex-wrap">
        {HeadlinesQuery.data?.map((element) => {
          return (
            <div className="my-12 mx-auto" key={element.url}>
              <NewsItem
                title={element.title}
                description={element.description}
                urlToImage={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          );
        })}
      </div>
      <div>
        <Button
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => setPage((page) => page + 1)}
          disabled={page === totalPages}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}
