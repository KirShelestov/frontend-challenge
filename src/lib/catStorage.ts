export interface CatImage {
    id: string
    url: string
    width: number
    height: number
    breeds: Array<unknown>
}

const STORAGE_KEY = 'cat-favourites'

export function loadFavouriteCats(): CatImage[] {
    if (typeof window === 'undefined') return []

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        return stored ? (JSON.parse(stored) as CatImage[]) : []
    } catch {
        return []
    }
}

export function saveFavouriteCats(cats: CatImage[]) {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cats))
}

export function isFavourite(catId: string): boolean {
    return loadFavouriteCats().some((item) => item.id === catId)
}

export function toggleFavourite(cat: CatImage): CatImage[] {
    const favourites = loadFavouriteCats()
    const exists = favourites.some((item) => item.id === cat.id)

    const next = exists
        ? favourites.filter((item) => item.id !== cat.id)
        : [...favourites, cat]

    saveFavouriteCats(next)
    return next
}
