export interface TMDBSearchMovie {
    adult: boolean;
    backdrop_path: string | null; // "/ew5FcYiRhTYNJAkxoVPMNlCOdVn.jpg",
    genre_ids: number[];
    id: number;
    original_language: string; // "en",
    original_title: string;
    overview: string;
    popularity: number; // 54.566,
    poster_path: string | null; // "/4MpN4kIEqUjW8OPtOQJXlTdHiJV.jpg",
    release_date: string; // "2005-06-10",
    title: string;
    video: boolean;
    vote_average: number; // 7.7,
    vote_count: number;
    inCatalogue?: boolean;
    requested?: boolean;
}

export interface TMDBSearch {
    page: 1,
	results: TMDBSearchMovie[],
	total_pages: 1,
	total_results: 2
}

export interface TMDBMovieDetails {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: any;
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null; // "/4MpN4kIEqUjW8OPtOQJXlTdHiJV.jpg",
    production_companies: {
        name: string;
        id: number;
        logo_path: string | null;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string; // "2005-06-10",
    revenue: number;
    runtime: number | null;
    spoken_languages: {
        iso_639_1: string;
        name: string;
    }[];
    status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface JustWatchProviderType {
    logo_path: string;
    display_priority: number;
    provider_id: number;
    provider_name: string;
}

export interface MovieProvidersType {
    id: number;
    results: {
        [x: string]: {
            link: string;
            flatrate: JustWatchProviderType[];
            rent: JustWatchProviderType[];
            buy: JustWatchProviderType[];
        };
    }
}