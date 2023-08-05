import { NewsItem } from "./NewsItem";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export function News(props) {
  const { country, category } = props;
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0)
  document.title = `FastNews - ${
    props.category.charAt(0).toUpperCase() + props.category.slice(1)
  }`;
  const HeadlinesQuery = useQuery({
    queryKey: ["topHeadlines", {page}, { country, category }],
    queryFn: async () => {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9080c2e52b9440e4950be63abc91c41a&pageSize=16&page=${page}`
      );
      const data = await response.json();
      setArticles(data.articles)
      setTotalResults(data.totalResults)
      console.log(data);
      return data.articles
    },
  });

  const hasMoreData = HeadlinesQuery.data
  ? HeadlinesQuery.data.length < totalResults
  : true;

  const FetchData = async () => {
    setPage(page + 1);
  
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9080c2e52b9440e4950be63abc91c41a&pageSize=16&page=${page}`
    );
    const data = await response.json();
  
    setArticles((prevArticles) => prevArticles.concat(data.articles));
    setTotalResults(data.totalResults);
  };

  

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
          <span className="my-2 py-6 inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 ...">
            Top Headlines based on -{" "}
            {props.category.charAt(0).toUpperCase() + props.category.slice(1)}
          </span>
        </h1>
        {/* <div>{HeadlinesQuery.isLoading ? <Spinner /> : null}</div> */}
      </div>
      <InfiniteScroll className="text-center items-center"
        dataLength={articles.length}
        next={FetchData}
        hasMore={hasMoreData} // Replace with a condition based on your data source
        loader={<Spinner/>}
      >

        <div className="flex flex-wrap ">
          {HeadlinesQuery.data?.map((element) => {
            return (
              <div className="my-12 mx-auto" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  urlToImage={element.urlToImage}
                  newsUrl={element.url}
                  publishedAt={element.publishedAt}
                  author={element.author}
                  source={element.source.name}
                  />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

News.defaultProps = {
  country: "in",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};
