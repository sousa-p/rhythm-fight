import { addButton } from "../utils/btn.js";

let volume = JSON.parse(localStorage.getItem("volume")) || 50;

scene("configs", () => {
  onUpdate(() => setCursor("default"));
  add([
    text("Configurations", {
      size: 48
    }),
    anchor("center"),
    pos(vec2(center().x, center().y-260))
  ]);

  add([
    text("Volume"),
    anchor("center"),
    color(119, 74, 217),
    pos(vec2(center().x, center().y-130))
  ])

  const outlineVolume = add([
    rect(304, 30),
    color(BLACK),
    outline(4, WHITE),
    anchor("center"),
    pos(vec2(center().x, center().y-50))
  ]);

  let volumeBar = outlineVolume.add([
    rect(volume*3, 26),
    color(29, 182, 242),
    pos(-150,-13)
  ]);

  function updateVolume() {
    volumeBar.destroy();
    volumeBar = outlineVolume.add([
      rect(volume*3, 26),
      color(29, 182, 242),
      pos(-150,-13)
    ]);
  }


  const addVolume = add([
    circle(25),
    area(),
    anchor("center"),
    color(242, 53, 211),
    pos(vec2(center().x+50, center().y+25))
  ]);

  addVolume.add([
    text('+', {
      font: 'Arial',
      size: 50
    }),
    color(BLACK),
    anchor("center"),
  ]);

  addVolume.onHoverUpdate(() => {
		setCursor("pointer");
	})

  addVolume.onClick(() => {
    if (volume < 100) volume += 5;
    updateVolume();
  });

  const oddVolume = add([
    circle(25),
    area(),
    anchor("center"),
    color(242, 53, 211),
    pos(vec2(center().x-50, center().y+25))
  ]);

  oddVolume.onHoverUpdate(() => {
		setCursor("pointer");
	})

  oddVolume.add([
    text('-', {
      font: 'Arial',
      size: 50
    }),
    color(BLACK),
    anchor("center"),
  ]);

  oddVolume.onClick(() => {
    if (volume > 0) volume -= 5;
    updateVolume();
  });

  addButton("Return", vec2(center().x, center().y + 200), () => {
    localStorage.setItem('volume', JSON.stringify(volume));
    go("menu");
  });
});