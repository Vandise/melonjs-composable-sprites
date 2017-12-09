import Renderable from './renderable';
import Item from './item';

export default class ComposableSprite extends me.Entity
{

  constructor(x, y, settings)
  {
    settings.GUID = me.utils.createGUID();
    super(x, y, settings);
    this.GUID = settings.GUID;
    this.isEntity = true;
    this.name = settings.name ? settings.name : this.GUID.toString();

    this.renderable = new Renderable(x, y, settings);

    this.addCompositionItem(settings); // add the base sprite

  }

  addCompositionItem(item)
  {
    if (item.name === this.name)
    {
      this.renderable.composition.push(item.name);
      return;
    }

    [ "name", "image", "width", "height" ].forEach((key) => {
      if (!item.hasOwnProperty(key)) {
        throw "Composition setting error. MISSING KEY `" + key + "`: " + JSON.stringify(item);
      }
    });

    const image = (typeof(item.image) === "string" ? me.loader.getImage(item.image) : item.image);
    this.renderable.children[item.name] = new Item(this.pos.x, this.pos.y, {
      image,
      width: item.width,
      height: item.height
    }, this);

    this.renderable.composition.push(item.name);
  }

  _update(time)
  {
    const results = [];

    if (this.renderable.composition)
    {
      this.renderable.composition.forEach((name) => {
        if (name != this.name)
        {
          results.push(this.renderable.children[name].update(time));
        }
      });
    }

    return results.some((result) => {
      return result;
    });
  }

  draw(context)
  {
    if (!this.renderable.composition) {
      super.draw(context);
      //this.renderable.draw(context);
      return;
    }

    this.renderable.composition.forEach((name) => {
      if (name === this.name)
      {
        super.draw(context);
        //this.renderable.draw(context);
      }
      else
      {
        this.renderable.children[name].draw(context);
      }
    });
  }

}