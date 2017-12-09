import { PLUGIN_NAME } from './settings';
import ComposableSpritePlugin from './plugin/composableSpritePlugin';

//
// ES6 endpoint
//
export default ComposableSpritePlugin;

//
// global JS endpoint
//
(($) => {

  $[PLUGIN_NAME] = ComposableSpritePlugin;

  const me = window.me || {};
  me[PLUGIN_NAME] = new ComposableSpritePlugin();

})(window);