import {Navigate, Route, Routes} from 'react-router';

import {MainPage} from '../../pages/main/Main';
import {PlayersPage} from '../../pages/players';
import {RatingPage} from '../../pages/rating';
import {TeamsPage} from '../../pages/teams';
import {TeamCardPage} from '../../pages/teams/teamCard';
import {TournamentInfoPage} from '../../pages/tournamentInfo';
import {TournamentsPage} from '../../pages/tournaments';

export const AppLayout = () => {
  return (
    <Routes>
      <Route index element={<MainPage/>}/>
      <Route path="/main" element={<MainPage/>}/>
      <Route path="/teams" element={<TeamsPage/>}/>
      <Route path="/teams/:id" element={<TeamCardPage/>}/>
      <Route path="/tournaments" element={<TournamentsPage/>}/>
      <Route path="/tournaments/:id" element={<TournamentInfoPage/>}/>
      <Route path="/players" element={<PlayersPage/>}/>
      <Route path="/rating" element={<RatingPage/>}/>
      <Route path="/" element={<Navigate to="/main"/>}/>
    </Routes>
  );
};
