import { heros } from "../data/heros";

export const findHeroById = (id: number) => {
    return heros.find((hero) => hero.id === id);
};
