import React, { useState } from "react";
import type { CatImage } from "../lib/catStorage";
import { loadFavouriteCats, saveFavouriteCats } from "../lib/catStorage";
import CatCard from "../components/CatCard";

const Favourites: React.FC = () => {
    const [favourites, setFavourites] = useState<CatImage[]>(loadFavouriteCats);

    const handleRemove = (id: string) => {
        const next = favourites.filter((cat) => cat.id !== id);
        setFavourites(next);
        saveFavouriteCats(next);
    };

    return (
        <section className="page-card">
            {favourites.length === 0 ? (
                <div className="page-empty">
                    Пока нет избранных котиков. Добавьте их на главной странице.
                </div>
            ) : (
                <div className="cat-grid">
                    {favourites.map((cat) => (
                        <CatCard
                            key={cat.id}
                            cat={cat}
                            isFavourite={true}
                            buttonClassName="button button--danger"
                            onAction={() => handleRemove(cat.id)}
                            imageAlt="Избранный котик"
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Favourites;
