# MelonJS Composable Sprite
A plugin for MelonJS, allowing sprites to be composed of multiple sprite sheets without having to alter existing sprite configurations. 

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

That's it! You're done. No additional changes to the update loop, animations, etc.

### Z-Index

The order in which you compose your sprite will affect its appearance. Z-Index increases by one as you add a new item; so be weary about what will overlay what. A default z-index layout will be defined in the future.

## Contributing
If there's a feature you would like to see in this plugin, send a pull or issue request on GitHub. Be sure to tag @Vandise in it.

## License
MIT 


