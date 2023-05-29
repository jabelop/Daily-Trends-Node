
export interface CheerioConfig {
    url: string;
    titleSelector: string;
    contentSelector: string;
    imageSelector: string;
}

export interface ScraperConfig {
    mundo: CheerioConfig;
    pais: CheerioConfig;
}

export const NewsScraperConfig: ScraperConfig = {
    mundo: {
        url: "https://www.elmundo.es",
        titleSelector: '.ue-c-cover-content__kicker',
        contentSelector: '.ue-c-cover-content__headline',
        imageSelector: '.ue-c-cover-content__image'
    },
    pais: {
        url: 'https://elpais.com/',
        titleSelector: 'h2.c_t > a',
        contentSelector: '.c_d',
        imageSelector: 'a.c_m_c'
    }
};