/**
 * Asynchronously loads the component for Mainpage
 */
import loadable from 'loadable-components';

export default loadable(() => import('./index'));
