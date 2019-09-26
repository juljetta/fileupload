# Steps for installing

create a .env file in your root directory with the following variable

MONGO_URI=yourconnectionstring

# Excerise allow users to make a photo ablum.

This is gonna be a relational database

# Step one

Create a route where we a user can upload a photo.

```
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="name">
    <input type="file" name="photo">
    <input type="submit" value="Save">
</form>
```

# Step two

Create a picture model. The schema should look a bit like so.

```
const pictureSchema = new Schema({
  name: String,
  path: String,
  originalName: String,
  authour: { type: Schema.Types.ObjectId, ref: "User" }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
```

# Step three

Update the user model so the user has a relation to the picture. This will be a one-to-many relation.

# Step four

Now the database structure is set up you can start defining the appropriate routes.

1. There should be a route to post a new photo to. This route should store the photo in the public directory. Inject a new document in de picture collection and update the user.
2. There should be a route where everyone can see all photo's.
3. There should be a route where a user see his/her own photo's.

# Step five (optional)

Make a route where users can see other user's profile and pictures.
