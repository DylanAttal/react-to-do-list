# React-To-Do-List

<p align="center">
<img src="src/giphy-react-to-do-list.gif">
</p>

### See it live

https://react-to-do-list-dylanattal.surge.sh/

### Summary

This was a project focused on practicing API calls from the API https://one-list-api.herokuapp.com/. I used GET, POST, PUT, and DELETE requests through the Axios library to display, add, update, and delete list items.

One feature I'm especially proud of is editing an item. I first had to access the `id` of the item in the API through the `input` field using the `data-` DOM attribute. Then I changed the `state` of the component to reflect that that specific item was being edited. Utilizing string interpolation in the URL of the API call, I used a POST request to edit the text of the selected item. Finally, I reset the `state` to reflect that an item was no longer being edited.

### Project Goals

- [x] Create a to-do list app
- [x] Use GET requests to display list items
- [x] Use POST requests to create new list items
- [x] Use PUT requests to update list items
- [x] Use DELETE requests to delete list items

### Technologies Used

HTML, CSS, Javascript, React, Axios
