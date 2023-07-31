import { NewsItem } from "./NewsItem";

export function News() {
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
        <div className="my-12 mx-auto">
          <NewsItem title="my title" description="my desc" />
        </div>
        <div className="my-12 mx-auto">
          <NewsItem title="my title" description="my desc" />
        </div>
        <div className="my-12 mx-auto">
          <NewsItem title="my title" description="my desc" />
        </div>
        <div className="my-12 mx-auto">
          <NewsItem title="my title" description="my desc" />
        </div>
        <div className="my-12 mx-auto">
          <NewsItem title="my title" description="my desc" />
        </div>
        <div className="my-12 mx-auto">
          <NewsItem title="my title" description="my desc" />
        </div>
        <div className="my-12 mx-auto">
          <NewsItem title="my title" description="my desc" />
        </div>
        <div className="my-12 mx-auto">
          <NewsItem title="my title" description="my desc" />
        </div>
      </div>
    </div>
  );
}
