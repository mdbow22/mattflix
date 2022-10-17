import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    const movies = await prisma.movies.createMany({
        data: [
            {
                title: 'The Eyes of Tammy Faye',
                releaseYear: 2021,
                director: 'Michael Showalter',
                genre: 'Biopic',
                rtScore: 68,
                sortTitle: 'Eyes of Tammy Faye',
                movieId: 'tt9115530',
                addedDate: new Date('2022-03-29'),
            },
            {
                title: 'CODA',
                releaseYear: 2021,
                director: 'Sian Heder',
                genre: 'Drama',
                rtScore: 94,
                sortTitle: 'CODA',
                movieId: 'tt10366460',
                addedDate: new Date('2022-03-29'),
            },
            {
                title: 'Where the Crawdads Sing',
                releaseYear: 2022,
                director: 'Olivia Newman',
                genre: 'Mystery',
                rtScore: 33,
                sortTitle: 'Where the Crawdads Sing',
                movieId: 'tt9411972',
                addedDate: new Date('2022-10-05'),
            },
            {
                title: 'Taken',
                releaseYear: 2008,
                director: 'Pierre Morel',
                genre: 'Action',
                rtScore: 59,
                sortTitle: 'Taken',
                movieId: 'tt0936501',
                addedDate: new Date('2022-10-05')
            },
            {
                title: 'Taken 2',
                releaseYear: 2012,
                director: 'Olivier Megaton',
                genre: 'Action',
                rtScore: 22,
                sortTitle: 'Taken 2',
                movieId: 'tt1397280',
                addedDate: new Date('2022-10-05')
            },
            {
                title: 'Taken 3',
                releaseYear: 2015,
                director: 'Olivier Megaton',
                genre: 'Action',
                rtScore: 13,
                sortTitle: 'Taken 3',
                movieId: 'tt2446042',
                addedDate: new Date('2022-10-05')
            },
            {
                title: 'Morbius',
                releaseYear: 2022,
                director: 'Daniel Espinosa',
                genre: 'Superhero',
                rtScore: 15,
                sortTitle: 'Morbius',
                movieId: 'tt5108870',
                addedDate: new Date('2022-10-05')
            },
            {
                title: 'Spider-Man: No Way Home',
                releaseYear: 2021,
                director: 'Jon Watts',
                genre: 'Superhero',
                rtScore: 93,
                collection: 'MCU',
                sortTitle: 'Spider-Man: No Way Home',
                movieId: 'tt10872600',
                addedDate: new Date('2022-10-05')
            },
            {
                title: 'Venom',
                releaseYear: 2018,
                director: 'Ruben Fleischer',
                genre: 'Superhero',
                rtScore: 30,
                sortTitle: 'Venom',
                movieId: 'tt1270797',
                addedDate: new Date('2022-10-03')
            },
            {
                title: 'The Social Network',
                releaseYear: 2010,
                director: 'David Fincher',
                genre: 'Biopic',
                rtScore: 96,
                sortTitle: 'Social Network',
                movieId: 'tt1285016',
                addedDate: new Date('2022-10-03')
            },
            {
                title: 'Thor: Love and Thunder',
                releaseYear: 2022,
                director: 'Taika Waititi',
                genre: 'Superhero',
                rtScore: 64,
                collection: 'MCU',
                sortTitle: 'Thor: Love and Thunder',
                movieId: 'tt10648342',
                addedDate: new Date('2022-10-03')
            },
            {
                title: 'Promising Young Woman',
                releaseYear: 2020,
                director: 'Emerald Fennell',
                genre: 'Thriller',
                rtScore: 90,
                sortTitle: 'Promising Young Woman',
                movieId: 'tt9620292',
                addedDate: new Date('2022-10-03')
            },
            {
                title: 'Prey',
                releaseYear: 2022,
                director: 'Dan Trachtenberg',
                genre: 'Sci-fi',
                collection: 'Predator',
                rtScore: 93,
                sortTitle: 'Prey',
                movieId: 'tt11866324',
                addedDate: new Date('2022-10-03')
            },
            {
                title: 'Nope',
                releaseYear: 2022,
                director: 'Jordan Peele',
                genre: 'Horror',
                rtScore: 82,
                sortTitle: 'Nope',
                movieId: 'tt10954984',
                addedDate: new Date('2022-10-03')
            },
        ]
    })

    if(movies.count) {
        console.log('movies added!');
    }

    // const requests = await prisma.requests.createMany({
    //     data: [
    //         {
    //             title: 'Bones and All',
    //             year: 2022,
    //             comments: 'Comes out in November',
    //             addedDate: new Date(),
    //             movieId: 'tt10168670',
    //         },
    //         {
    //             title: 'Freaky Friday',
    //             addedDate: new Date('2022-10-01'),
    //             movieId: 'tt0322330',
    //         },
    //         {
    //             title: 'Troy',
    //             addedDate: new Date('2022-10-13'),
    //             movieId: 'tt0332452',
    //         }
    //     ]
    // })

    // if(requests.count) {
    //     console.log('requests added!');
    // }
}

main().then(async () => {
    await prisma.$disconnect
})

export {}