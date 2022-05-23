import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {
  Link as RouterLink
} from 'react-router-dom';

export default function ActionAreaCard(props) {
  return (
    <Card>
      <CardActionArea button component={RouterLink} to={props.to}>
        <CardMedia
          component="img"
          height="140"
          image={props.image}
          alt="some code"
        />
        <CardContent sx={{}}>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}