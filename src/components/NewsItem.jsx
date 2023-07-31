import {Card,CardHeader,CardBody,CardFooter,Typography,Button} from "@material-tailwind/react";
import PropTypes from 'prop-types'

   
  export function NewsItem(props) {

    return (
      <Card className="mt-8 mx-4 lg:w-96 w-[22rem]">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src=""
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.title}
          </Typography>
          <Typography>
            {props.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>Read More</Button>
        </CardFooter>
      </Card>
    );
  }

  NewsItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
  }