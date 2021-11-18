export default interface Diet {
    id: string,
    name: string,
    description: string,
    categories: string[],
    meals: {
        "id": string,
        "name": string,
        "kilocalories": number,
    }[],
    imageRef: string,
}