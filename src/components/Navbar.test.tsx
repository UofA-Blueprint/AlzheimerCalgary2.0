/**
 * @jest-environment jsdom
 */

import renderer from 'react-test-renderer';
import Navbar from './Navbar';
import { BrowserRouter as Router, Link } from 'react-router-dom';

describe('Navbar', () => {
  it('renders correctly with the correct link paths', () => {
  const waffles = '/path/to/waffles';
  const tree = renderer.create(
    <Router>
      <Navbar links={["/", "/firebase-connection"]} titles={["Home", "Firebase"]} />
    </Router>
  );
  const aTags = tree.root.findAllByType(Link);
  expect(aTags.length).toBe(2);
  expect(aTags[0].props.to).toBe("/");
  expect(aTags[0].props.children).toBe("Home");
  expect(aTags[1].props.to).toBe("/firebase-connection");
  expect(aTags[1].props.children).toBe("Firebase");
});
});
