import React, { useEffect, useRef, useState } from "react";
import type { CatImage } from "../lib/catStorage";
import { loadFavouriteCats, toggleFavourite } from "../lib/catStorage";
import CatCard from "../components/CatCard";

const API_BASE = "https://api.thecatapi.com/v1/images/search";
const PER_PAGE = 10;

const Main: React.FC = () => {
    const [cats, setCats] = useState<CatImage[]>([]);
    const [favourites, setFavourites] = useState<CatImage[]>(loadFavouriteCats);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetchCats(page);
    }, [page]);

    useEffect(() => {
        if (!loaderRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !loading && hasMore) {
                    setPage((current) => current + 1);
                }
            },
            {
                root: null,
                rootMargin: "300px",
                threshold: 0.1,
            },
        );

        observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [loading, hasMore]);

    const fetchCats = async (pageToLoad = 0) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE}?limit=${PER_PAGE}&page=${pageToLoad}&order=DESC`,
            );
            if (!response.ok) {
                throw new Error("Не удалось загрузить котиков");
            }
            const data = (await response.json()) as CatImage[];
            setCats((current) =>
                pageToLoad === 0 ? data : [...current, ...data],
            );
            setHasMore(data.length === PER_PAGE);
        } catch {
            setError("Ошибка загрузки. Попробуйте обновить страницу.");
        } finally {
            setLoading(false);
        }
    };

    const handleFavourite = (cat: CatImage) => {
        const next = toggleFavourite(cat);
        setFavourites(next);
    };

    const isFavourite = (catId: string) =>
        favourites.some((item) => item.id === catId);

    return (
        <section className="page-card">
            {error ? <div className="page-error">{error}</div> : null}

            <div className="cat-grid">
                {cats.map((cat) => (
                    <CatCard
                        key={cat.id}
                        cat={cat}
                        isFavourite={isFavourite(cat.id)}
                        buttonClassName={
                            isFavourite(cat.id)
                                ? "button button--primary"
                                : "button button--ghost"
                        }
                        onAction={handleFavourite}
                    />
                ))}
            </div>

            <div ref={loaderRef} className="page-loader">
                {loading
                    ? "Загрузка котиков..."
                    : hasMore
                      ? "Прокрутите вниз для подгрузки"
                      : "Больше котиков нет"}
            </div>
        </section>
    );
};

export default Main;
