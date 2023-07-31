import { NewsItem } from "./NewsItem";
import { useQuery } from "@tanstack/react-query";

export function News() {


  const HeadlinesQuery = useQuery({
    queryKey: ["topHeadlines"], // unique identifier for this query
    queryFn: async () => {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=9080c2e52b9440e4950be63abc91c41a`
      );
      const data = await response.json();
      console.log(data);
      return data.articles;
    },
  });

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
    </div>
  );
}
