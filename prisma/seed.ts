import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type movieToAdd = {
  title: string;
  releaseYear: number;
  director: string;
  genre: string;
  rtScore: number;
  sortTitle: string;
  movieId: number;
  addedDate: Date;
}

const main = async () => {

  // const toAdd: movieToAdd[] = [
  //   {
  //     title: "Smile",
  //     releaseYear: 2022,
  //     director: "Parker Finn",
  //     genre: "Horror",
  //     rtScore: 79,
  //     sortTitle: "Smile",
  //     movieId: 882598,
  //     addedDate: new Date('11/06/2022'),
  //   },
  //   {
  //     title: 'It Comes at Night',
  //     releaseYear: 2013,
  //     director: 'Trey Edward Shults',
  //     genre: 'Thriller',
  //     rtScore: 88,
  //     sortTitle: 'It Comes at Night',
  //     movieId: 418078,
  //     addedDate: new Date('11/06/2022'),
  //   },
  // ];
  const movies = [
    {
      title: 'Jingle All the Way',
      releaseYear: 1996,
      director: 214,
      genre: 2,
      
      rtScore: 15,
      sortTitle: 'Jingle All the Way',
      movieId: 9279,
      addedDate: new Date('2022-12-08'),
    },
    {
      title: 'John Wick',
      releaseYear: 2014,
      director: 215,
      genre: 4,
      
      rtScore: 86,
      sortTitle: 'John Wick',
      movieId: 245891,
      addedDate: new Date('2020-05-20'),
    },
    {
      title: 'John Wick Chapter 2',
      releaseYear: 2017,
      director: 215,
      genre: 4,
      
      rtScore: 89,
      sortTitle: 'John Wick Chapter 2',
      movieId: 324552,
      addedDate: new Date('2020-05-20'),
    },
    {
      title: 'John Wick Chapter 3: Parabellum',
      releaseYear: 2019,
      director: 215,
      genre: 4,
      
      rtScore: 90,
      sortTitle: 'John Wick Chapter 3: Parabellum',
      movieId: 458156,
      addedDate: new Date('2021-06-26'),
    },
    {
      title: 'Jojo Rabbit',
      releaseYear: 2019,
      director: 216,
      genre: 6,
      
      rtScore: 79,
      sortTitle: 'Jojo Rabbit',
      movieId: 515001,
      addedDate: new Date('2020-02-15'),
    },
    {
      title: 'Joker',
      releaseYear: 2019,
      director: 217,
      genre: 15,
      
      rtScore: 68,
      sortTitle: 'Joker',
      movieId: 475557,
      addedDate: new Date('2019-12-30'),
    },
    {
      title: 'Julie & Julia',
      releaseYear: 2009,
      director: 218,
      genre: 11,
      
      rtScore: 78,
      sortTitle: 'Julie & Julia',
      movieId: 24803,
      addedDate: new Date('2021-06-25'),
    },
    {
      title: 'Jumanji',
      releaseYear: 1995,
      director: 80,
      genre: 2,
      
      rtScore: 55,
      sortTitle: 'Jumanji',
      movieId: 8844,
      addedDate: new Date('2020-12-11'),
    },
    {
      title: 'Juno',
      releaseYear: 2007,
      director: 220,
      genre: 15,
      
      rtScore: 94,
      sortTitle: 'Juno',
      movieId: 7326,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Jupiter Ascending',
      releaseYear: 2015,
      director: 92,
      genre: 3,
      
      rtScore: 27,
      sortTitle: 'Jupiter Ascending',
      movieId: 76757,
      addedDate: new Date('2019-07-30'),
    },
    {
      title: 'Jurassic Park',
      releaseYear: 1993,
      director: 221,
      genre: 3,
      
      rtScore: 91,
      sortTitle: 'Jurassic Park',
      movieId: 329,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Jurassic World',
      releaseYear: 2015,
      director: 222,
      genre: 3,
      
      rtScore: 72,
      sortTitle: 'Jurassic World',
      movieId: 135397,
      addedDate: new Date('2020-02-16'),
    },
    {
      title: 'Jurassic World: Fallen Kingdom',
      releaseYear: 2018,
      director: 223,
      genre: 3,
      
      rtScore: 48,
      sortTitle: 'Jurassic World: Fallen Kingdom',
      movieId: 351286,
      addedDate: new Date('2020-02-16'),
    },
    {
      title: 'Keanu',
      releaseYear: 2016,
      director: 224,
      genre: 6,
      
      rtScore: 77,
      sortTitle: 'Keanu',
      movieId: 342521,
      addedDate: new Date('2020-09-28'),
    },
    {
      title: "Kiki's Delivery Service",
      releaseYear: 1989,
      director: 197,
      genre: 7,
      collection: 18,
      rtScore: 97,
      sortTitle: "Kiki's Delivery Service",
      movieId: 16859,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Kill Bill Vol. 1',
      releaseYear: 2003,
      director: 117,
      genre: 4,
      
      rtScore: 84,
      sortTitle: 'Kill Bill Vol. 1',
      movieId: 24,
      addedDate: new Date('07-02-2021'),
    },
    {
      title: 'Kill Bill Vol. 2',
      releaseYear: 2004,
      director: 117,
      genre: 4,
      
      rtScore: 84,
      sortTitle: 'Kill Bill Vol. 2',
      movieId: 393,
      addedDate: new Date('07-03-2021'),
    },
    {
      title: 'Kingsman: The Golden Circle',
      releaseYear: 2017,
      director: 226,
      genre: 4,
      
      rtScore: 51,
      sortTitle: 'Kingsman: The Golden Circle',
      movieId: 343668,
      addedDate: new Date('2020-10-05'),
    },
    {
      title: 'Kingsman: The Secret Service',
      releaseYear: 2014,
      director: 226,
      genre: 4,
      
      rtScore: 74,
      sortTitle: 'Kingsman: The Secret Service',
      movieId: 207703,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Kiss Kiss Bang Bang',
      releaseYear: 2005,
      director: 227,
      genre: 13,
      
      rtScore: 85,
      sortTitle: 'Kiss Kiss Bang Bang',
      movieId: 5236,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Knives Out',
      releaseYear: 2019,
      director: 228,
      genre: 13,
      
      rtScore: 97,
      sortTitle: 'Knives Out',
      movieId: 546554,
      addedDate: new Date('2020-02-16'),
    },
    {
      title: 'Knowing',
      releaseYear: 2009,
      director: 201,
      genre: 4,
      
      rtScore: 34,
      sortTitle: 'Knowing',
      movieId: 13811,
      addedDate: new Date('2021-01-05'),
    },
    {
      title: 'Kramer vs Kramer',
      releaseYear: 1979,
      director: 229,
      genre: 15,
      
      rtScore: 89,
      sortTitle: 'Kramer vs Kramer',
      movieId: 12102,
      addedDate: new Date('2021-06-25'),
    },
    {
      title: 'Kubo and the Two Strings',
      releaseYear: 2016,
      director: 230,
      genre: 2,
      
      rtScore: 97,
      sortTitle: 'Kubo and the Two Strings',
      movieId: 313297,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Kung Pow: Enter the Fist',
      releaseYear: 2002,
      director: 231,
      genre: 6,
      
      rtScore: 13,
      sortTitle: 'Kung Pow: Enter the Fist',
      movieId: 11891,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'La La Land',
      releaseYear: 2016,
      director: 232,
      genre: 15,
      
      rtScore: 91,
      sortTitle: 'La La Land',
      movieId: 313369,
      addedDate: new Date('2020-02-16'),
    },
    {
      title: 'Lady in the Water',
      releaseYear: 2006,
      director: 183,
      genre: 5,
      
      rtScore: 25,
      sortTitle: 'Lady in the Water',
      movieId: 9697,
      addedDate: new Date('2021-01-19'),
    },
    {
      title: 'Legally Blonde',
      releaseYear: 2001,
      director: 235,
      genre: 6,
      
      rtScore: 69,
      sortTitle: 'Legally Blonde',
      movieId: 8835,
      addedDate: new Date('2019-07-26'),
    },
    {
      title: 'Let Them All Talk',
      releaseYear: 2020,
      director: 97,
      genre: 6,
      
      rtScore: 89,
      sortTitle: 'Let Them All Talk',
      movieId: 623856,
      addedDate: new Date('2020-12-25'),
    },
    {
      title: 'Liar Liar',
      releaseYear: 1997,
      director: 76,
      genre: 6,
      
      rtScore: 81,
      sortTitle: 'Liar Liar',
      movieId: 1624,
      addedDate: new Date('2020-02-09'),
    },
    {
      title: 'Life of Brian',
      releaseYear: 1979,
      director: 237,
      genre: 6,
      collection: 3,
      rtScore: 95,
      sortTitle: 'Life of Brian',
      movieId: 583,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Lilo & Stitch',
      releaseYear: 2002,
      director: 196,
      genre: 2,
      
      rtScore: 86,
      sortTitle: 'Lilo & Stitch',
      movieId: 11544,
      addedDate: new Date('2020-02-18'),
    },
    {
      title: 'Little Miss Sunshine',
      releaseYear: 2006,
      director: 241,
      genre: 6,
      
      rtScore: 91,
      sortTitle: 'Little Miss Sunshine',
      movieId: 773,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Little Shop of Horrors',
      releaseYear: 1986,
      director: 242,
      genre: 8,
      
      rtScore: 90,
      sortTitle: 'Little Shop of Horrors',
      movieId: 10776,
      addedDate: new Date('2020-09-22'),
    },
    {
      title: 'Little Women',
      releaseYear: 2019,
      director: 243,
      genre: 15,
      
      rtScore: 95,
      sortTitle: 'Little Women',
      movieId: 331482,
      addedDate: new Date('2020-04-13'),
    },
    {
      title: 'Live and Let Die',
      releaseYear: 1973,
      director: 114,
      genre: 4,
      collection: 10,
      rtScore: 67,
      sortTitle: 'Live and Let Die',
      movieId: 253,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Love, Simon',
      releaseYear: 2018,
      director: 245,
      genre: 15,
      
      rtScore: 92,
      sortTitle: 'Love, Simon',
      movieId: 449176,
      addedDate: new Date('2020-02-16'),
    },
    {
      title: 'Luca',
      releaseYear: 2021,
      director: 246,
      genre: 2,
      
      rtScore: 91,
      sortTitle: 'Luca',
      movieId: 508943,
      addedDate: new Date('2021-07-08'),
    },
    {
      title: 'Lucy',
      releaseYear: 2014,
      director: 149,
      genre: 3,
      
      rtScore: 67,
      sortTitle: 'Lucy',
      movieId: 240832,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Ma & Pa Kettle',
      releaseYear: 1949,
      director: 247,
      genre: 6,
      
      rtScore: 73,
      sortTitle: 'Ma & Pa Kettle',
      movieId: 64620,
      addedDate: new Date('2020-09-03'),
    },
    {
      title: 'Mad Max: Fury Road',
      releaseYear: 2015,
      director: 248,
      genre: 3,
      
      rtScore: 97,
      sortTitle: 'Mad Max: Fury Road',
      movieId: 76341,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Mamma Mia',
      releaseYear: 2008,
      director: 249,
      genre: 8,
      
      rtScore: 55,
      sortTitle: 'Mamma Mia',
      movieId: 11631,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Man of Steel',
      releaseYear: 2013,
      director: 6,
      genre: 9,
      collection: 22,
      rtScore: 56,
      sortTitle: 'Man of Steel',
      movieId: 49521,
      addedDate: new Date('2021-07-01'),
    },
    {
      title: 'The Man with the Golden Gun',
      releaseYear: 1974,
      director: 114,
      genre: 4,
      collection: 10,
      rtScore: 44,
      sortTitle: 'Man with the Golden Gun',
      movieId: 682,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Mars Attacks',
      releaseYear: 1996,
      director: 14,
      genre: 3,
      
      rtScore: 53,
      sortTitle: 'Mars Attacks',
      movieId: 75,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: "Marvel's The Avengers",
      releaseYear: 2012,
      director: 36,
      genre: 9,
      collection: 6,
      rtScore: 92,
      sortTitle: "Marvel's The Avengers",
      movieId: 24428,
      addedDate: new Date('2019-07-24'),
    },
    {
      title: 'Mary Poppins',
      releaseYear: 1964,
      director: 251,
      genre: 2,
      
      rtScore: 100,
      sortTitle: 'Mary Poppins',
      movieId: 433,
      addedDate: new Date('2019-12-30'),
    },
    {
      title: 'Matilda',
      releaseYear: 1996,
      director: 252,
      genre: 2,
      
      rtScore: 90,
      sortTitle: 'Matilda',
      movieId: 10830,
      addedDate: new Date('2020-05-20'),
    },
    {
      title: 'A Matter of Loaf and Death',
      releaseYear: 2008,
      director: 87,
      genre: 2,
      collection: 11,
      rtScore: 77,
      sortTitle: 'Matter of Loaf and Death',
      movieId: 14447,
      addedDate: new Date('07/24/2019'),
    },
  ];
  
  

  const newMovies = await prisma.movies.createMany({
    data: movies,
  });

  if (newMovies) {
    console.log("New Movies Added!");
  }
  // let addedMovies: any[] = [];
  // for(const movie of toAdd) {
  //   // if(movie) {
  //     const newMovie = await prisma.movies.create({
  //       data: {
  //         title: movie.title,
  //         releaseYear: movie.releaseYear,
  //         Directors: {
  //           connectOrCreate: {
  //             create: {
  //               name: movie.director,
  //             },
  //             where: {
  //               name: movie.director,
  //             }
  //           }
  //         },
  //         Genres: {
  //           connectOrCreate: {
  //             create: {
  //               name: movie.genre,
  //             },
  //             where: {
  //               name: movie.genre,
  //             }
  //           }
  //         },
  //         rtScore: movie.rtScore,
  //         sortTitle: movie.sortTitle,
  //         movieId: movie.movieId,
  //         addedDate: movie.addedDate,
  //       }
  //     })

  //     if(newMovie) {
  //       addedMovies.push(newMovie);
  //     }
  // }

  // console.log(`${addedMovies.length} of ${toAdd.length} movies added`)
  
};

main().then(async () => {
  await prisma.$disconnect;
});

export {};
