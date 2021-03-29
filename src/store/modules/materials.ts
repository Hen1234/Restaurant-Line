import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { Material } from "@/types/Material";
@Module({ namespaced: true, name: "test" })
// @Module({ namespaced: true})
export default class Materials extends VuexModule {
  materialsList: Material[];
  constructor() {
    //todo: check super
    super(Materials);
    this.materialsList = [
      { name: "tomato", count: 50 },
      { name: "onion", count: 100 },
      { name: "steak", count: 30 },
      { name: "lettuce", count: 20 },
      { name: "cucumber", count: 50 },
      { name: "mushroom", count: 20 },
    ];
  }
  get getMaterialsList(): Material[] {
    return this.materialsList;
  }
  @Mutation //todo return type Material
  getMaterial(name: string) {
    console.log("fdgs");
    // return this.materialsList.find(
    //   (materialsList) => materialsList.name === name
    // );
  }
  @Action
  cloud(name: string): void {
    console.log("fdgs")
    // this.context.commit("getMaterial", name);
  }
}
