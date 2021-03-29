export enum MaterialsIds {
  Tomato = "tomato",
  Onion = "onion",
  Steak = "steak",
  Lettuce = "lettuce",
  Cucumber = "cucumber",
  Mushroom = "mushroom",
}

export interface Material {
  id: MaterialsIds;
  name: string;
  count: number;
}
