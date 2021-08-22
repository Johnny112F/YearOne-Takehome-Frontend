import './style.css'
/**
 * NavBar displays a link back to the homepage/search page.
 */
 function NavBar() {
  return (
    <div className="NavBar">
     <a href="/">
     <span>YearOne</span>
     <span id="blue">MovieRatings</span>
     </a>
    </div>
  );
}

export default NavBar;