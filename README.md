# MelonJS Composable Sprite
A plugin for MelonJS, allowing sprites to be composed of multiple sprite sheets without having to alter existing sprite configurations.

You can see an example of this library being utilized in an RPG project [here](https://github.com/Vandise/game-elements). Specifically look at the [Main Player](https://github.com/Vandise/game-elements/tree/master/src/client/entities/mainplayer) directory for use-case and composition render priority.

## How to use this repository
Upon release, all a version of this plugin will be saved in the `dist/` directory. There will be a minified version of the plugin for production use, and an expanded file, containing source-maps and debug information. Utilize whichever source file best suits your needs.

## What this repository does
This repository contains extended implementations of MelonJS's Sprite and Entity objects, allowing you to have your sprites composed of multiple spritesheets with minimal code changes.

![](https://media.giphy.com/media/3oxHQz3sqShUqY5cRy/giphy.gif) 

## How can I use this in my game?

Include one of the javasscript files in the `dist/` directory that suits your needs. This has be to after you've included MelonJS, but before you include your game. This project also has an interface for MelonJS's plugin implementation.

In its most rudimentary form, all you have to do is extend from `me.ComposableSpritePlugin.ComposableSprite` instead of `me.Entity`.

For example:

```javascript

var player = me.ComposableSpritePlugin.ComposableSprite.extend({
	///...
});

// ES6

class Player extends me.ComposableSpritePlugin.ComposableSprite {
	//...
}

```

This will bind all animations, shapes, positioning, anchors, velocities, and scaling. More will come as this matures.

After you specify all your animations and configure your base sprite: you can add composition items to it:

```
player.addCompositionItem({
      "name":  "ravenHair",
      "image": "raven_hair",
      "width": 64,
      "height": 64
    });
```

This will configure the object to all the settings specified in your `player` object.

Next you need to tell your update method to utilize the parent update method as well. This is only if you need to add some rendering effects (ie flipX or flipY).

```
update(time)
{
	return super.update(time) || (some other condition);
	//this.parent.update(time)
}
```

Otherwise you can rely strictly on the draw method provided with this plugin:

```
update(time)
{
	return (this._super(me.Entity, 'update', [time]);
}
```

That's it! You're done. No additional changes to animations, anchors, scales, etc.

### Z-Index

The order in which you compose your sprite will affect its appearance. Z-Index increases by one as you add a new item; so be weary about what will overlay what.

Generally this isn't an issue, you can sort the renderable composition array `this.renderable.composition` to the order in which you want them to be displayed. 

For example you can represent the items with various scores as a heap, then sort them if there was a change to the composition:

```
update(time)
{
	if (this.composition != this.renderable.composition)
	{
		this.renderable.composition = heapSort();
	}
}
```

### Configurations
You can override some default behaviors by passing in the following information inside your object in `addCompositionItem`.

#### animations (object)
Example to override an animation inherited from the parent entity:

```
const item = {
	// other item fields
	animations: {
		walk_up: {
			frames: [1,2,3,4], // required
			speed: 100         // required
		}
	}
};
```

#### flipX, flipY
Requires the use of the parent update loop.

Flips the sprite for specific animations:

```
const item = {
	// other item fields
	flipX: ['walk_up', 'walk_down'],
	flipY: ['walk_right']
};
```

## Contributing
If there's a feature you would like to see in this plugin, send a pull or issue request on GitHub. Be sure to tag @Vandise in it.

## License
MIT 


