const {
  keys
} = Object;

/*
 * Return an object with each of the
 * listed keys removed.
 *
 * @method without
 *
 * @param {Object} original
 *   The original object.
 *
 * @param {Rest} args
 *   A list of keys to remove from the original object.
 */
export default function without(original, ...args) {
  const originalKeys = keys(original);
  const newObject = {};

  originalKeys.forEach(function(key) {
    if (args.indexOf(key) === -1) {
      newObject[key] = original[key];
    }
  });

  return newObject;
}
