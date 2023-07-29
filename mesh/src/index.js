import WorldTemplate from "./World.js";

function main() {
  const container = document.getElementById("app");
  let world = new WorldTemplate(container);
  world.start();
}
main();
