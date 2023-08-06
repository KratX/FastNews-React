import { NewsItem } from "./NewsItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";

export function News(props) {
  const { country, category } = props;
  document.title = `FastNews - ${
    props.category.charAt(0).toUpperCase() + props.category.slice(1)
  }`;

  const fetchNewsArticles = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9080c2e52b9440e4950be63abc91c41a&pageSize=16&page=${pageParam}`
    );
    const data = await response.json();
    console.log("data:", data);
      console.log("error:", error);
      console.log("isLoading:", isLoading);
      console.log("hasNextPage:", hasNextPage);
      console.log("isFetchingNextPage:", isFetchingNextPage);
    return data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(["topHeadlines", country, category], fetchNewsArticles, {
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1; // Calculate the next page based on the number of fetched pages
      const totalPages = Math.ceil(lastPage.totalResults / 16); // A default PageSize of 16 is hard-coded in the API
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
  
  

  if (error) {
    return <div>Error: {error.message}</div>;
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
        <div>{isLoading ? <Spinner /> : null}</div>
      </div>

      <div className="flex flex-wrap">
        {data
          ? data.pages.map((page) =>
              page.articles.map((element) => (
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
              ))
            )
          : null}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
          {/* Temporary text to check visibility */}
          <p>Next page available</p>
        </div>
      )}
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
