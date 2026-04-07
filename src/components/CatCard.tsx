import React from "react";
import type { CatImage } from "../lib/catStorage";

interface CatCardProps {
    cat: CatImage;
    isFavourite: boolean;
    buttonClassName: string;
    onAction: (cat: CatImage) => void;
    imageAlt?: string;
}

const CatCard: React.FC<CatCardProps> = ({
    cat,
    isFavourite,
    buttonClassName,
    onAction,
    imageAlt = "Котик",
}) => {
    return (
        <article className="cat-card">
            <div className="cat-card__image-wrapper">
                <img className="cat-card__image" src={cat.url} alt={imageAlt} />
                <button
                    className={`cat-card__favourite-button ${buttonClassName}`}
                    onClick={() => onAction(cat)}
                    type="button"
                    title={
                        isFavourite
                            ? "Убрать из избранного"
                            : "Добавить в избранное"
                    }
                >
                    {isFavourite ? "♥" : "♡"}
                </button>
            </div>
        </article>
    );
};

export default CatCard;
