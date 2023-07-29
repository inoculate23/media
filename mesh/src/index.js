import WorldTemplate from "./World";

function main() {
  const container = document.getElementById("app");
  let world = new WorldTemplate(container);
  world.start();
}
main();
