import { PLUGIN_VERSION, PLUGIN_NAME } from '../settings';
import ComposableSprite from './classes/composableSprite';

export default class ComposableSpritePlugin extends me.plugin.Base
{

  constructor()
  {
    super();
    this.pluginName = PLUGIN_NAME;
    this.version    = PLUGIN_VERSION;
    this.ComposableSprite = null;
    this.init();
  }

  init()
  {
    this.ComposableSprite = ComposableSprite;
  }

}