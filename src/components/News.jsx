import { NewsItem } from "./NewsItem";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";

export function News(props) {
  const { country, category } = props;
  const HeadlinesQuery = useQuery({
    queryKey: ["topHeadlines", {country, category} ],
    queryFn: async () => {
      // setloading(true);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9080c2e52b9440e4950be63abc91c41a&pageSize=20`
      );
      const data = await response.json();
      console.log(data);
      return data.articles;
    },
  });

  if (HeadlinesQuery.error) {
    return <div>Error: {HeadlinesQuery.error.message}</div>;
  }

  return (
    <div className="">
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
        <div>{HeadlinesQuery.isLoading ? <Spinner /> : null}</div>
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


News.defaultProps = {
  country:'in',
  category:"general",
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};
