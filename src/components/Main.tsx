import { useEffect, useState } from 'react';

import { SideBar } from './SideBar';
import { Content } from './Content';
import { IGenreResponseProps, IMovieProps } from '../types';

import { api } from '../services/api';

import '../styles/global.scss';

export function Main() {
    const [selectedGenreId, setSelectedGenreId] = useState(1);
  
    const [genres, setGenres] = useState<IGenreResponseProps[]>([]);
  
    const [movies, setMovies] = useState<IMovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<IGenreResponseProps>({} as IGenreResponseProps);
  
    useEffect(() => {
      api.get<IGenreResponseProps[]>('genres').then(response => {
        setGenres(response.data);
      });
    }, []);
  
    useEffect(() => {
      api
        .get<IMovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
          setMovies(response.data);
        });
  
      api
        .get<IGenreResponseProps>(`genres/${selectedGenreId}`).then((response) => {
          setSelectedGenre(response.data);
        });
    }, [selectedGenreId]);
  
    function handleClickButton(id: number) {
      setSelectedGenreId(id);
    }
  
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar
          genres={genres}
          handleClick={handleClickButton}
          selectedGenreId={selectedGenreId}
        />
  
        <Content movies={movies} selectedGenre={selectedGenre} />
      </div>
    );
  }