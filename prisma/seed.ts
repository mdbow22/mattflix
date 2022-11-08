import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const movies = [
    {
      title: "The Cabin in the Woods",
      releaseYear: 2011,
      director: 78,
      genre: 5,
      
      rtScore: 91,
      sortTitle: "Cabin in the Woods",
      movieId: 22970,
      addedDate: new Date("08/03/2019"),
    },
    {
      title: "The Chronicles of Riddick",
      releaseYear: 2004,
      director: 89,
      genre: 3,
      
      rtScore: 29,
      sortTitle: "Chronicles of Riddick",
      movieId: 2789,
      addedDate: new Date("08/01/2019"),
    },
    {
      title: "The Conjuring",
      releaseYear: 2013,
      director: 29,
      genre: 5,
      
      rtScore: 86,
      sortTitle: "Conjuring",
      movieId: 138843,
      addedDate: new Date("04/20/2021"),
    },
    {
      title: "The Conjuring 2",
      releaseYear: 2016,
      director: 29,
      genre: 5,
      
      rtScore: 80,
      sortTitle: "Conjuring 2",
      movieId: 259693,
      addedDate: new Date("04/22/2021"),
    },
    {
      title: "The Covenant",
      releaseYear: 2006,
      director: 99,
      genre: 10,
      
      rtScore: 4,
      sortTitle: "Covenant",
      movieId: 9954,
      addedDate: new Date("07/24/2019"),
    },
    {
      title: "The Curse of La Llorona",
      releaseYear: 2019,
      director: 103,
      genre: 5,
      
      rtScore: 28,
      sortTitle: "Curse of La Llorona",
      movieId: 480414,
      addedDate: new Date("06/27/2021"),
    },
    {
      title: "The Da Vinci Code",
      releaseYear: 2006,
      director: 23,
      genre: 1,
      
      rtScore: 26,
      sortTitle: "Da Vinci Code",
      movieId: 591,
      addedDate: new Date("01/05/2021"),
    },
    {
      title: "The Dark Knight",
      releaseYear: 2008,
      director: 42,
      genre: 9,
      collection: 7,
      rtScore: 94,
      sortTitle: "Dark Knight",
      movieId: 155,
      addedDate: new Date("07/24/2019"),
    },
    {
      title: "The Dark Knight Rises",
      releaseYear: 2012,
      director: 42,
      genre: 9,
      collection: 7,
      rtScore: 87,
      sortTitle: "Dark Knight Rises",
      movieId: 49026,
      addedDate: new Date("07/24/2019"),
    },
    {
      title: "The Death of Stalin",
      releaseYear: 2018,
      director: 108,
      genre: 6,
      
      rtScore: 95,
      sortTitle: "Death of Stalin",
      movieId: 402897,
      addedDate: new Date("09/22/2020"),
    },
    {
      title: "Deer Hunter",
      releaseYear: 1979,
      director: 109,
      genre: 15,
      
      rtScore: 88,
      sortTitle: "Deer Hunter",
      movieId: 11778,
      addedDate: new Date("06/28/2021"),
    },
    {
      title: "The Departed",
      releaseYear: 2006,
      director: 110,
      genre: 15,
      
      rtScore: 91,
      sortTitle: "Departed",
      movieId: 1422,
      addedDate: new Date("09/01/2020"),
    },
    {
      title: "The Devil Wears Prada",
      releaseYear: 2006,
      director: 113,
      genre: 6,
      
      rtScore: 75,
      sortTitle: "Devil Wears Prada",
      movieId: 350,
      addedDate: new Date("12/17/2019"),
    },
    {
      title: "The Egg and I",
      releaseYear: 1947,
      director: 126,
      genre: 6,
      
      rtScore: 76,
      sortTitle: "Egg and I",
      movieId: 42342,
      addedDate: new Date("09/03/2020"),
    },
    {
      title: "The Emperor's New Groove",
      releaseYear: 2000,
      director: 128,
      genre: 2,
      
      rtScore: 85,
      sortTitle: "Emperor's New Groove",
      movieId: 11688,
      addedDate: new Date("07/24/2019"),
    },
    {
      title: "The Empire Strikes Back",
      releaseYear: 1980,
      director: 34,
      genre: 3,
      collection: 5,
      rtScore: 95,
      sortTitle: "Empire Strikes Back",
      movieId: 1891,
      addedDate: new Date("07/24/2019"),
    },
    {
      title: "The Exorcist",
      releaseYear: 1973,
      director: 134,
      genre: 5,
      
      rtScore: 84,
      sortTitle: "Exorcist",
      movieId: 9552,
      addedDate: new Date("10/17/2021"),
    },
    {
      title: "The Eyes of Tammy Faye",
      releaseYear: 2021,
      director: 135,
      genre: 11,
      
      rtScore: 68,
      sortTitle: "Eyes of Tammy Faye",
      movieId: 601470,
      addedDate: new Date("03/29/2022"),
    },
    {
      title: "The Fall",
      releaseYear: 2008,
      director: 136,
      genre: 15,
      
      rtScore: 61,
      sortTitle: "Fall",
      movieId: 14784,
      addedDate: new Date("07/31/2019"),
    },
    {
      title: "The Farewell",
      releaseYear: 2019,
      director: 141,
      genre: 15,
      
      rtScore: 98,
      sortTitle: "Farewell",
      movieId: 565310,
      addedDate: new Date("12/19/2019"),
    },
    {
      title: "The Fast and the Furious",
      releaseYear: 2001,
      director: 144,
      genre: 4,
      collection: 1,
      rtScore: 53,
      sortTitle: "Fast and the Furious",
      movieId: 9799,
      addedDate: new Date("08/28/2020"),
    },
    {
      title: "The Fast and The Furious: Tokyo Drift",
      releaseYear: 2006,
      director: 143,
      genre: 4,
      collection: 1,
      rtScore: 37,
      sortTitle: "Fast and The Furious: Tokyo Drift",
      movieId: 9615,
      addedDate: new Date("08/29/2020"),
    },
    {
      title: "The Fate of the Furious",
      releaseYear: 2017,
      director: 145,
      genre: 4,
      collection: 1,
      rtScore: 67,
      sortTitle: "Fate of the Furious",
      movieId: 337339,
      addedDate: new Date("08/29/2020"),
    },
    {
      title: "The Favourite",
      releaseYear: 2018,
      director: 146,
      genre: 15,
      
      rtScore: 93,
      sortTitle: "Favourite",
      movieId: 375262,
      addedDate: new Date("09/21/2019"),
    },
    {
      title: "The Fifth Element",
      releaseYear: 1997,
      director: 149,
      genre: 3,
      
      rtScore: 71,
      sortTitle: "Fifth Element",
      movieId: 18,
      addedDate: new Date("07/24/2019"),
    },
    {
      title: "The Final Destination",
      releaseYear: 2009,
      director: 151,
      genre: 5,
      
      rtScore: 27,
      sortTitle: "Final Destination",
      movieId: 19912,
      addedDate: new Date("08/26/2021"),
    },
    {
      title: "The First Purge",
      releaseYear: 2018,
      director: 154,
      genre: 5,
      collection: 15,
      rtScore: 56,
      sortTitle: "First Purge",
      movieId: 442249,
      addedDate: new Date("04/07/2021"),
    },
    {
      title: "The Fox and the Hound",
      releaseYear: 1981,
      director: 161,
      genre: 2,
      
      rtScore: 70,
      sortTitle: "Fox and the Hound",
      movieId: 10948,
      addedDate: new Date("11/19/2020"),
    },
    {
      title: "The Fox and the Hound 2",
      releaseYear: 2006,
      director: 162,
      genre: 2,
      
      rtScore: 20,
      sortTitle: "Fox and the Hound 2",
      movieId: 9948,
      addedDate: new Date("11/19/2020"),
    },
    {
      title: "The French Lieutenant's Woman",
      releaseYear: 1981,
      director: 164,
      genre: 15,
      
      rtScore: 82,
      sortTitle: "French Lieutenant's Woman",
      movieId: 12537,
      addedDate: new Date("06/29/2021"),
    },
    {
      title: "The Good Dinosaur",
      releaseYear: 2015,
      director: 173,
      genre: 2,
      collection: 9,
      rtScore: 76,
      sortTitle: "Good Dinosaur",
      movieId: 105864,
      addedDate: new Date("09/01/2020"),
    },
    {
      title: "The Grand Budapest Hotel",
      releaseYear: 2014,
      director: 140,
      genre: 6,
      
      rtScore: 92,
      sortTitle: "Grand Budapest Hotel",
      movieId: 120467,
      addedDate: new Date("04/16/2021"),
    },
    {
      title: "The Great Gatsby",
      releaseYear: 2013,
      director: 177,
      genre: 15,
      
      rtScore: 48,
      sortTitle: "Great Gatsby",
      movieId: 64682,
      addedDate: new Date("09/15/2019"),
    },
    {
      title: "The Green Knight",
      releaseYear: 2021,
      director: 178,
      genre: 10,
      
      rtScore: 89,
      sortTitle: "Green Knight",
      movieId: 559907,
      addedDate: new Date("10/17/2021"),
    },
    {
      title: "The Green Mile",
      releaseYear: 1999,
      director: 179,
      genre: 15,
      
      rtScore: 79,
      sortTitle: "Green Mile",
      movieId: 497,
      addedDate: new Date("07/24/2019"),
    },
    {
      title: "The Guest",
      releaseYear: 2014,
      director: 181,
      genre: 1,
      
      rtScore: 91,
      sortTitle: "Guest",
      movieId: 241848,
      addedDate: new Date("12/1/2020"),
    },
    {
      title: "The Happening",
      releaseYear: 2008,
      director: 183,
      genre: 1,
      
      rtScore: 17,
      sortTitle: "Happening",
      movieId: 8645,
      addedDate: new Date("01/11/2021"),
    },
    {
      title: "The Hateful Eight",
      releaseYear: 2016,
      director: 117,
      genre: 15,
      
      rtScore: 74,
      sortTitle: "Hateful Eight",
      movieId: 273248,
      addedDate: new Date("08/03/2019"),
    },
    {
      title: "The Illusionist",
      releaseYear: 2006,
      director: 205,
      genre: 15,
      rtScore: 73,
      sortTitle: "Illusionist",
      movieId: 1491,
      addedDate: new Date("07/24/2019"),
    },
  ];

  const newMovies = await prisma.movies.createMany({
    data: movies,
  });

  if (newMovies) {
    console.log("New Movies Added!");
  }
};

main().then(async () => {
  await prisma.$disconnect;
});

export {};
