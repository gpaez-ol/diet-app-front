import DietCategory from "../../browse/types/DietCategory";

export default interface Diet {
    id: string,
    name: string,
    description: string,
    categories: DietCategory[],
    meals: {
        "id": string,
        "name": string,
        "kilocalories": number,
    }[],
    imageRef: string,
}