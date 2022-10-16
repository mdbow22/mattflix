import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    const movies = await prisma.movies.createMany({
        data: [
            {
                title: '10 Cloverfield Lane',
                releaseYear: 2016,
                director: 'Dan Trachtenberg',
                genre: 'Thriller',
                rtScore: 90,
                sortTitle: '10 Cloverfield Land',
                movieId: 'tt1179933',
                addedDate: new Date(),
            },
            {
                title: '101 Dalmatians',
                releaseYear: 1961,
                director: 'Clyde Geronimi',
                genre: 'Family',
                rtScore: 98,
                sortTitle: '101 Dalmatians',
                movieId: 'tt0055254',
                addedDate: new Date(),
            },
            {
                title: '12 Monkeys',
                releaseYear: 1995,
                director: 'Terry Gilliam',
                genre: 'Sci-fi',
                rtScore: 89,
                sortTitle: '12 Monkeys',
                movieId: 'tt0114746',
                addedDate: new Date(),
            },
            {
                title: '2 Fast 2 Furious',
                releaseYear: 2003,
                director: 'John Singleton',
                genre: 'Action',
                rtScore: 36,
                collection: 'Fast & Furious',
                sortTitle: '2 Fast 2 Furious',
                movieId: 'tt0322259',
                addedDate: new Date()
            },
            {
                title: '28 Days Later',
                releaseYear: 2002,
                director: 'Danny Boyle',
                genre: 'Horror',
                rtScore: 86,
                sortTitle: '28 Days Later',
                movieId: 'tt0289043',
                addedDate: new Date()
            },
            {
                title: '300',
                releaseYear: 2007,
                director: 'Zack Snyder',
                genre: 'Action',
                rtScore: 60,
                sortTitle: '300',
                movieId: 'tt0416449',
                addedDate: new Date()
            },
            {
                title: '300: Rise of an Empire',
                releaseYear: 2014,
                director: 'Noam Murro',
                genre: 'Action',
                rtScore: 44,
                sortTitle: '300: Rise of an Empire',
                movieId: 'tt1253863',
                addedDate: new Date()
            },
        ]
    })

    if(movies.count) {
        console.log('movies added!');
    }

    const requests = await prisma.requests.createMany({
        data: [
            {
                title: 'Bones and All',
                year: 2022,
                comments: 'Comes out in November',
                addedDate: new Date(),
                movieId: 'tt10168670',
            },
            {
                title: 'Freaky Friday',
                addedDate: new Date('2022-10-01'),
                movieId: 'tt0322330',
            },
            {
                title: 'Troy',
                addedDate: new Date('2022-10-13'),
                movieId: 'tt0332452',
            }
        ]
    })

    if(requests.count) {
        console.log('requests added!');
    }
}

main().then(async () => {
    await prisma.$disconnect
})

export {}