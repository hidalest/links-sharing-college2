# Link-sharing app

![Design preview for the Link-sharing app coding challenge](./preview.jpg)

## Welcome! 👋

The project is about creating a link-sharing app and get it looking as close to the design as possible.

Your users should be able to:

---- Done ----

- Create, read, update, delete links and see previews in the mobile mockup ✅
- Receive validations if the links form is submitted without a URL or with the wrong URL pattern for the platform ✅
- Drag and drop links to reorder them ✅
- Add profile details like profile picture, first name, last name, and email ✅
- Receive validations if the profile details form is saved with no first or last name ✅
- Preview their devlinks profile and copy the link to their clipboard
- View the optimal layout for the interface depending on their device's screen size ✅
- See hover and focus states for all interactive elements on the page ✅

---- Currently on development ----

- Save details to a database (build the project as a full-stack app)👨‍💻
- Create an account and log in (add user authentication to the full-stack app)🧑‍💻

### Expected behaviour

- Links
  - Clicking "Add new link" will add a new repeater where the user can select the platform to add a link for and add the URL.
  - Adding a new link should immediately show the platform's link inn the mobile mockup illustration even before the form is saved.
  - When the user clicks "Save", the form should validate for the presence of a URL and ensure the URL pattern is correct for the platform (e.g. "https://www.frontendmentor.io/profile/:username" for the Frontend Mentor link).
  - The user should be able to drag and drop by clicking and holding the two-line hamburger icon in the top left of each link repeater.
  - The mobile mockup illustration isn't shown on tablet and mobile layouts. The user would need to click through to the preview page to see their profile. Feel free to play around with this UX if you want to include the mobile mockup illustration for mobile and tablet.
- Profile Details
  - First name and last name are the only required fields. If no profile picture or email address are present, remove the necessary parts of the mobile mockup or use the person's initials inside the circle where the profile picture would be.
  - You can use Web APIs like FileReader to handle the image upload. You can do this completely client-side if you're just building the front-end. If you're building full-stack, this is a nice opportunity to integrate with a media hosting service like Cloudinary and practice using their API. Remember to keep your API credentials secret if you choose this route!
- Preview
  - Clicking "Share Link" should copy the current URL to the user's clipboard and show the relevant toast message shown in the design.
  - If you're building the project as a full-stack app, ensure only the current user can only see the header with the "Back to Editor" and "Share Link" call-to-actions if they are the same user as the one in the profile. If they're not, the header should disappear and they shouldn't be able to access the admin area.
