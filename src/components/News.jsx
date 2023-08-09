import { NewsItem } from "./NewsItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
import { useRef } from "react";

export function News(props) {
  const { country, category } = props;

  // Set document title based on selected category
  document.title = `FastNews - ${
    props.category.charAt(0).toUpperCase() + props.category.slice(1)
  }`;

  // Function to fetch news articles for a given page
  const fetchNewsArticles = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9080c2e52b9440e4950be63abc91c41a&pageSize=16&page=${pageParam}`
    );
    const data = await response.json();
    return data;
  };

  // Fetch news articles using useInfiniteQuery hook
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["topHeadlines", country, category], // Unique query key
    fetchNewsArticles, // Fetch function
    {
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1; // Calculate next page based on fetched pages
        const totalPages = Math.ceil(lastPage.totalResults / 16); // Calculate total number of pages
        return nextPage <= totalPages ? nextPage : undefined;
      },
    }
  );

  // Create a ref for the Intersection Observer target
  const bottomBoundaryRef = useRef(null);

  // Create Intersection Observer to trigger fetching more data on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage(); // Fetch next page when boundary is visible
      }
    },
    {
      root: null, // Use viewport as root
      rootMargin: "20px", // Trigger threshold
      threshold: 1.0,
    }
  );

  // Observe the bottom boundary when it is available
  if (bottomBoundaryRef.current) {
    observer.observe(bottomBoundaryRef.current);
  }

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        {/* ... (rest of your code) */}
      </div>

      <div id="data" className="flex flex-wrap">
        {data
          ? data.pages.map((page) =>
              page.articles.map((element) => (
                <div className="card my-12 mx-auto" key={element.url}>
                  {/* Render NewsItem component for each article */}
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

      {/* Display spinner while loading next page */}
      {isFetchingNextPage && (
        <div className="flex justify-center mt-6">
          <Spinner />
        </div>
      )}

      {/* Bottom boundary for Intersection Observer */}
      <div ref={bottomBoundaryRef}></div>
    </div>
  );
}

// Set default props and PropTypes for News component
News.defaultProps = {
  country: "in",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};
