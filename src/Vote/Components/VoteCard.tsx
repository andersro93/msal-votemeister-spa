import React, { useState } from 'react';

import Candidate from '../../_shared/Models/Candidate';
import Vote from '../../_shared/Models/Vote';

import votemeisterHttpClient from '../../_shared/HttpClients/VotemeisterHttpClient';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import HowToVoteIcon from '@material-ui/icons/HowToVote';

import { makeStyles } from '@material-ui/core/styles';

export interface VoteCardProps {
  candidate: Candidate;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    minHeight: theme.spacing(32),
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
  },
  title: {
    fontSize: '24px',
  },
  button: {
    marginTop: 'auto',
    height: theme.spacing(4)
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const VoteCard: React.FC<VoteCardProps> = ({ candidate }) => {
  const [voteHasBeenCasted, setVoteHasBeenCasted] = useState<boolean>(false);
  const [voteIsBeingCasted, setVoteIsBeingCasted] = useState<boolean>(false);
  const classes = useStyles();

  const handleOnVoteButtonClick = async () => {
    setVoteIsBeingCasted(true);
    await votemeisterHttpClient.post<Vote>('/api/votes', { Candidate: candidate.name });
    setVoteHasBeenCasted(true);
    setVoteIsBeingCasted(false);
  };

  return (
    <Paper square className={classes.paper}>
      <Typography variant="h2" className={classes.title}>
        {candidate.name}
      </Typography>
      <Typography variant="body1">{candidate.description}</Typography>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={handleOnVoteButtonClick}
        disabled={voteHasBeenCasted || voteIsBeingCasted}
      >
        {!voteIsBeingCasted && (
          <>
            <HowToVoteIcon className={classes.icon} />
            Vote
          </>
        )}
        {voteIsBeingCasted && (
          <CircularProgress size={24} />
        )}
      </Button>
    </Paper>
  );
};

VoteCard.displayName = "VoteCard";
export default VoteCard;