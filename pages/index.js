import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import tags from '../public/tags.json';
import events from '../public/events.json';
import { Chip } from '@mui/material';
import React from 'react';

export default function Home() {
  const [tagState, setTagState] = React.useState(Array(tags.length).fill("outlined"));
  const [myEvents, setMyEvents] = React.useState(events);

  let handleChipClick = (i) => {
    const newStates = tagState.map((c,j) => {
      if (j === i) {
        return c === "filled" ? "outlined" : "filled";
      } else {
        return c;
      }
    });
    setTagState(newStates);
    parseEvents(newStates);
  };

  let parseEvents = (states) => {
    if(states.includes("filled") === false) {
      setMyEvents(events);
      return;
    }
    const newEvents = [];
    for(let i = 0; i < states.length; i++) {
      if(states[i] === "filled") {
        for(let j = 0; j < events.length; j++) {
          if(events[j].tags.includes(tags[i])) {
            newEvents.push(events[j]);
          }
        }
      }
    }
    setMyEvents(newEvents);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Timisoara Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Events
        </h1>
        <div className={styles.description}>
          Select tags of interest
        </div>
        <div className={styles.chipContainer}>
          {
            tags.map((tag, i) => {
              return (
                <Chip
                  variant={tagState[i]}
                  onClick={() => handleChipClick(i)}
                  label={tags[i]}></Chip>
              )
            })
          }
        </div>
        <div className={styles.grid}>
        {myEvents.map((event, i) => {
          return (
            <a href={event.URL} className={styles.card}>
              <h3>{event.title} &rarr;</h3>
              <p className={styles.pdate}>{event.startDate} &rarr; {event.endDate}</p>
              <div className={styles.chipContainer}>
              {
                event.tags.map((tag, i) => {
                  return (
                    <Chip
                      label={tag}></Chip>
                  )
                })
              }
              </div>
              <p>{event.description}</p>
            </a>  
          )
        })}
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
