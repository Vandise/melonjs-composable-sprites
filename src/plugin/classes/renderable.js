export default class Renderable extends me.Sprite
{

  constructor(x, y, settings)
  {

    super(0, 0, settings);

    this.scaled = { x: 1, y: 1 };
    this.composition = [];
    this.children = {};

    this.GUID = settings.GUID;
    this.isEntity = true;
    this.name = settings.name ? settings.name : this.GUID.toString();

  }

  scale(x, y)
  {
    this.scaled = { x, y };
    super.scale(x, y);
    if (this.composition)
    {
      this.composition.forEach((n) => {
        if (n != this.name)
        {
          this.children[n].renderable.scale(x, y);
        }
      });
    }
  }

  addAnimation(name, frames, speed = 100)
  {
    super.addAnimation(name, frames, speed);
    if (this.composition)
    {
      this.composition.forEach((n) => {
        if (n != this.name)
        {
          this.children[n].renderable.addAnimation(name, frames, speed);
        }
      });
    }
  }

  setCurrentAnimation(name)
  {
    super.setCurrentAnimation(name);
    if (this.composition)
    {
      this.composition.forEach((n) => {
        if (n != this.name)
        {
          this.children[n].renderable.setCurrentAnimation(name);
        }
      });
    }
  }

}