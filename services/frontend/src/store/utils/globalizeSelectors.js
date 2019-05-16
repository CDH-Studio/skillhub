/*  This globalizeSelectors helper is probably one of the most important things
 *  for helping write modular, independent redux store states. The idea for this
 *  helper was liberally taken from Randy Coulman's series of Modular Redux articles:
 *
 *      http://randycoulman.com/blog/2016/09/13/encapsulating-the-redux-state-tree/
 *      http://randycoulman.com/blog/2016/09/20/redux-reducer-selector-asymmetry/
 *      http://randycoulman.com/blog/2016/09/27/modular-reducers-and-selectors/
 *      http://randycoulman.com/blog/2016/11/29/globalizing-redux-selectors/
 *      http://randycoulman.com/blog/2016/12/27/globalizing-curried-selectors/
 *      ^ Particularly the last two
 *
 *  In a nutshell, the reason this helper exists is to be able to make Redux store
 *  states as modular as possible (in particular with regards to selectors). Normally,
 *  a store's selector is a function that takes in state and returns a particular
 *  part (or parts) of that state. However, the state it takes in is the local state
 *  for that particular section of the redux store; it has no knowledge of the entire
 *  state tree.
 *
 *  Therefore, for the selectors to work against the whole state tree and
 *  make them easier to invoke in connected components, the selectors can be 'globalized'
 *  so that they take in the whole state tree and know how to get to the section of state
 *  that they care about. And they know how to get to that state based on the mountpoint
 *  path that is provided to the globalizeSelectors function.
 */

/** ala lodash.get(): https://lodash.com/docs/#get
 *  Obviously, I didn't want lodash to have to be a requirement
 *  for this helper.
 */
function getValue(object, path) {
    return path
        .replace(/\[/g, ".")
        .replace(/\]/g, "")
        .split(".")
        .reduce((o, k) => (o || {})[k], object);
}

/** Performs the actual 'globalization' of a selector, by turning it into
 *  a partially applied function.
 */
function fromRoot(path, selector) {
    return (state, ...args) => selector(getValue(state, path), ...args);
}

/** Takes in the whole map of selectors that are to be globalized along with the path string
 *  to tell the selectors where the state that they care about is found in the root state.
 */
const globalizeSelectors = (selectors, path) => (
    Object.keys(selectors).reduce((acc, key) => {
        acc[key] = fromRoot(path, selectors[key]);
        return acc;
    }, {})
);

export default globalizeSelectors;
