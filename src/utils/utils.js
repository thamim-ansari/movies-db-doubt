const formatDate = dateString => {
  const date = new Date(dateString)
  const options = {month: 'short', day: '2-digit', year: 'numeric'}
  return date.toLocaleDateString('en-US', options)
}

const toHoursAndMinutes = totalMinutes => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
}

export const getFormattedMovieDetails = movie => ({
  title: movie.title,
  tagline: movie.tagline,
  posterImg: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  backdropImage: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
  genres: movie.genres,
  rating: movie.vote_average.toFixed(1),
  overview: movie.overview,
  status: movie.status,
  releaseDate: formatDate(movie.release_date),
  runtime: toHoursAndMinutes(movie.runtime),
  movieTrailer: movie.videos.results.find(
    eachItem => eachItem.type === 'Trailer',
  ),
})

export const getFormattedMovieListData = data => ({
  id: data.id,
  posterImage: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
  backdropImage: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
  title: data.title,
  rating: data.vote_average.toFixed(1),
  releaseDate: formatDate(data.release_date),
})

export const getFormattedCastDetails = cast => ({
  cast: cast.cast.map(eachItem => ({
    castId: eachItem.cast_id,
    castImage: `https://image.tmdb.org/t/p/w500${eachItem.profile_path}`,
    name: eachItem.name,
    character: eachItem.character,
  })),
  director: cast.crew.filter(eachCrew => eachCrew.job === 'Director'),
  writers:
    cast.crew.filter(eachCrew => eachCrew.job === 'Writer').length > 0
      ? cast.crew.filter(eachCrew => eachCrew.job === 'Writer')
      : cast.crew.filter(eachCrew => eachCrew.department === 'Writing'),
})
