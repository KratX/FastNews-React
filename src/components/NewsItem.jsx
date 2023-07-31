import {Card,CardHeader,CardBody,CardFooter,Typography} from "@material-tailwind/react";
import PropTypes from 'prop-types'

   
  export function NewsItem(props) {

    return (
      <Card className="mt-8 mx-4 lg:w-96 w-[22rem]">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={props.urlToImage}
            alt="card-image"
          />
        </CardHeader>
        <CardBody className="h-64">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.title}
          </Typography>
          <Typography>
            {props.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
        <a size="sm" href={props.newsUrl} rel="noreferrer" target="_blank"  className="flex items-center gap-2 font-bold text-light-blue-800">
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </CardFooter>
      </Card>
    );
  }

  NewsItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    urlToImage: PropTypes.string,
    newsUrl: PropTypes.string,
  }