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
    page: number;
	results: TMDBSearchMovie[];
	total_pages: number;
	total_results: number;
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

export interface TMDBSearchTV {
    popularity: number; // 54.566,
    poster_path: string | null; // "/4MpN4kIEqUjW8OPtOQJXlTdHiJV.jpg",
    id: number;
    backdrop_path: string | null; // "/ew5FcYiRhTYNJAkxoVPMNlCOdVn.jpg",
    vote_average: number; // 7.7,
    overview: string;
    first_air_date: string; // "2011-04-17"
    genre_ids: number[];
    origin_country: string[];
    original_language: string; // "en",
    vote_count: number;
    name: string;
    original_name: string;
    inCatalogue?: boolean;
    requested?: boolean;
}

export interface TVSearch {
    page: number;
	results: TMDBSearchTV[];
	total_pages: number;
	total_results: number;
}

export interface Cast {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface Crew {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
}

export interface Credits {
    id: number;
    cast: Cast[];
    crew: Crew[];
}