import * as React from 'react';

import Grid from '@mui/material/Grid';
import Card from '../components/Card';
import someCode from '../images/some-code.png';
import someDiagram from '../images/some-diagram.png';


export default function Home(props) {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12} md={6}>
        <Card handleClick={props.handleClick} image={someDiagram} to="/architect" title="Solutions Architect" description="Solutions Architect with over 10 years of leadership experience in designing innovative business solutions for clients. Skilled in cloud computing, information management, CI/CD Pipeline development, and virtualization. Demonstrated mastery in evaluating requirements for business application integration and service activation." />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card handleClick={props.handleClick} image={someCode} to="/developer" title="Software Developer" description="Software developer with 5 years experience in object oriented programming, prototyping, and tool creation. Modified existing algorithms to create procedural level generation for a Unity Game. Crafted a custom animation state machine to handle transitions between running, walking, crouching, standing, and prone." />
      </Grid>
    </Grid>
  );
}
